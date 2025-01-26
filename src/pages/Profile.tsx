import { Header, FormComponent, CardComponent, StyledH2, StyledButton } from '@/components'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AppThemeContext } from '@/contexts/AppThemeContext'
import Cookies from 'js-cookie'


import { Container, Grid } from '@mui/material'

//Services
import { logout } from '@/services'

//Types
import { InputProps, ProfileData, ProfileEditableData, MessageProps } from '@/types'

//Hooks
import { useFormValidation, useGet, useDelete, usePut } from '@/hooks'




function Profile() {

    const themeContext = useContext(AppThemeContext)

    //Hooks
    //hook useGet para buscar os dados do perfil do usuário:
     const { data: profileData, loading: profileLoading, error: profileError } = useGet<ProfileData>('profile');

     const { data: profileUpdateData,  putData: profilePutData, loading: profileUpdateLoading, error: profileUpdateError } = usePut<ProfileEditableData>('profile/update');

     const { deleteData: profileDeleteData, loading: profileDeleteLoading} = useDelete('profile/delete');

     const [updateMessage, setUpdateMessage] =  useState<MessageProps>({
      type: 'success',
      msg: '',
     })
                //CLEAR MSg limpa a msg apos 3s
     const clearMessage = () => {
      setTimeout(() => {
        setUpdateMessage({
        type: 'success',
        msg: '',
      })
     }, 3000)
    }


      //useEffect é utilizado para atualizar os campos do formulário quando os dados do perfil são carregados:
     useEffect(() => {
      if(profileData) {
        handleChange(0, profileData.name)
        handleChange(1, profileData.email)
        handleChange(2, profileData.phone)
      }
     }, [profileData])

    //Form
    const inputs: InputProps[] = [
      {name: 'name', type: 'text', placeholder: 'Nome', required: true},
      {name: 'email', type: 'email' , placeholder: 'email', disabled: true},
      {name: 'phone', type: 'tel', placeholder: 'Telefone', required: true},
    ]

//Funções assíncronas são criadas para lidar com a submissão do formulário e a exclusão da conta:
    const { formValues, formValid, handleChange} = useFormValidation(inputs)
    const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault()
      await profilePutData(
        {
          name: String(formValues[0]),
          phone: String(formValues[2])
        }
      )
    }
    const handleDelete = async () => {
      if(confirm('Tem certeza que deseja excluir ?')) {
        try {
          await profileDeleteData()
          alert('Perfil deletado com sucesso!')
          Cookies.remove('Authorization')
          window.location.href = '/'
        } catch (e) {
          alert('Nao foi possivel realizar operaçao')
        }
      }
    }

    useEffect(() => {
      if(profileUpdateData !== null){
        setUpdateMessage({
          msg: 'Perfil atualizado com sucesso',
          type: 'success'
        })


      } else if (profileUpdateError) {
        setUpdateMessage({
          msg: 'Nao foi possivel realizer a operação',
          type: 'error'
      })

    } 
      clearMessage() 
    }, [profileUpdateData, profileUpdateError])

    return (
      <>
      <Header />
        <Container className='mb-2' maxWidth='lg'>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {
                !profileError && (
                  <CardComponent className={profileLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''}> 
                  {
                    !profileLoading && profileData && (
                      <>
                          <StyledH2 className='mb-1'>Seus dados</StyledH2>
                  <FormComponent 
                    inputs={inputs.map((input, index) => ({
                                   ...input, 
                                  type: input.type,
                                  placeholder: input.placeholder,
                                  value: formValues[index] || '',
                                  onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(index, (e.target as HTMLInputElement).value),
                                 }))}
                    buttons={
                      [
                        {className: 'primary', id:"update-profile", disabled: !formValid || profileUpdateLoading, type: 'submit' , onClick: handleSubmit, children: profileUpdateLoading ? 'Aguarde...' : 'Atualizar meu perfil'},
                        {className: 'alert', id:"delete-profile", disabled: profileDeleteLoading, type: 'button' , onClick: handleDelete, children: profileDeleteLoading ? 'Aguarde...' : 'Excluir minha conta'},
                      ]
                    } message={updateMessage}
                                 
                      />   
                      </>
                    )
                  }
                  
                  </CardComponent>
                )
              }
             
            </Grid>

              <Grid item xs={12} sm={6}>
                <CardComponent>
                  <StyledH2 className='mb-1'> Definições de conta</StyledH2>
                <StyledButton id='theme-switch' className='primary mb-1' onClick={themeContext?.toggleTheme}>
                   Trocar para tema { themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
                </StyledButton>
                <StyledButton className='alert' id='logout' onClick={logout}>Logout</StyledButton>
                </CardComponent>
              </Grid>
            </Grid>
        </Container>
      </>
    )
  }

  export default Profile