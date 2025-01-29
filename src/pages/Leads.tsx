import {
  Header,
  CustomTable,
  FormComponent,
  CardComponent,
  StyledH2,
  StyledButton,
  Styledp,
  StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'

//Hooks
import { useFormValidation, useGet, useDelete, usePost } from '@/hooks'

//Types
import { InputProps, LeadsData, LeadsPostData, MessageProps } from '@/types'
import { ChangeEvent, useState, useEffect } from 'react'

function Leads() {
  //Hooks
  const {
    data: createLeadsData,
    loading: createLeadsLoading,
    error: createLeadsError,
    postData: createLeadsPostData,
  } = usePost<LeadsData, LeadsPostData>('leads/create', true)

  //Para obter a lista de leads,
  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
    getData: getLeads,
  } = useGet<LeadsData[]>('leads')

  //Para a funcionalidade de exclusão,
  const { deleteData: leadsDeleteData, loading: leadsDeleteLoading } =
    useDelete('leads/delete')

  //FORMS

  const inputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'email', required: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createLeadsPostData({
      name: String(formValues[0]),
      email: String(formValues[1]),
      phone: String(formValues[2]),
    })
  }

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir ?')) {
      try {
        await leadsDeleteData({ params: { id: id } })
        alert('Lead deletado com sucesso!')
        getLeads()
      } catch (e) {
        alert('Nao foi possivel realizar operaçao')
      }
    }
  }

  // estado para gerenciar mensagens de feedback:
  const [createMessage, setCreateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })

  const clearMessage = () => {
    setTimeout(() => {
      setCreateMessage({
        type: 'success',
        msg: '',
      })
    }, 3000)
  }

  // para atualizar a lista de leads e exibir mensagens de feedback:
  useEffect(() => {
    if (createLeadsData?.id) {
      setCreateMessage({
        msg: 'Lead criado com sucesso',
        type: 'success',
      })
      getLeads()
      clearMessage()
    } else if (createLeadsError) {
      setCreateMessage({
        msg: 'Nao foi possivel realizar operação',
        type: 'error',
      })
    } else {
      clearMessage()
    }
  }, [createLeadsData, createLeadsError])

  return (
    <>
      <Header></Header>
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={7}>
            <CardComponent
              className={
                leadsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
              }
            >
              {!leadsError && !leadsLoading && (
                <>
                  <StyledH2 className="mb-1" id="leads-title">
                    Meus Leads
                  </StyledH2>
                  {leadsData?.length ? (
                    <CustomTable
                      headers={['Nome', 'Email', 'Telefone', '']}
                      rows={leadsData.map((lead) => [
                        <Styledp>{lead.name}</Styledp>,
                        <Styledp>{lead.email}</Styledp>,
                        <Styledp>{lead.phone}</Styledp>,
                        <StyledButton
                          className="bordeless-alert"
                          onClick={() => handleDelete(lead.id)}
                          disabled={leadsDeleteLoading}
                        >
                          Excluir
                        </StyledButton>,
                      ])}
                    />
                  ) : (
                    <StyledSpan>Sem Leads cadastrados</StyledSpan>
                  )}
                </>
              )}
            </CardComponent>
          </Grid>
          <Grid item xs={12} sm={5}>
            <CardComponent>
              <StyledH2 className="mb-1">Cadastrar Leads</StyledH2>
              <FormComponent
                inputs={inputs.map((input, index) => ({
                  ...input,
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index] || '',
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, (e.target as HTMLInputElement).value),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled:
                      !formValid || createLeadsLoading || leadsDeleteLoading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: 'Cadastrar Lead',
                  },
                ]}
                message={createMessage}
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Leads
