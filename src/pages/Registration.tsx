
import { Box, Container, Grid } from "@mui/material";
import { BannerImage, FormComponent, Logo, StyledH1, Styledp, StyledUl } from "@/components";
import { pxToRem } from "@/utils";

//Hooks
import { useFormValidation, usePost } from "@/hooks";

//Redux  (Dispatch: dispara as informações e Selector pega informaçoes do Redux)
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { setMessage, setProfileData } from "@/redux/slices/createProfile";

//Types
import { CreateProfileData, InputProps } from "@/types";
import { ChangeEvent, useEffect, } from "react";
import { useNavigate } from "react-router-dom";



function Registration() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email } = useSelector((state: RootState) => state.createProfile)
  const { data, loading, error, postData} = usePost<string, CreateProfileData>('profile/create')

  //Form Step 1
  const step1Inputs: InputProps[] = [
        {name: 'name', type: 'text', placeholder: 'Nome', required: true},
        {name: 'email', type: 'email' , placeholder: 'email'},
        {name: 'phone', type: 'tel', placeholder: 'Telefone', required: true},
      ]

      const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(
          setProfileData({
          email: String(step1FormValues[1])
        })
      )
    }

        //Implementamos a validação de formulário usando um hook personalizado:
        const {
          formValues: step1FormValues,
          formValid: step1FormValid,
          handleChange: step1FormHandleChange,
          } = useFormValidation(step1Inputs);



    //Form Step 2

    const step2Inputs: InputProps[] = [
        { type: 'password', placeholder: 'Senha'},
      ]
        const handleStep2 = async (e: React.FormEvent) => {
        e.preventDefault();
        await postData({
          name: String(step1FormValues[0]),
          email: String(step1FormValues[1]),
          phone: String(step1FormValues[2]),
          password: String(step2FormValues[0]),
        })

        // Lógica para processar a senha será implementada aqui
        };

        const {
          formValues: step2FormValues,
          formValid: step2FormValid,
          handleChange: step2FormHandleChange
          } = useFormValidation(step2Inputs)

          const handleStepInputs = email ? step2Inputs : step1Inputs;
          //Se tiver email renderiza o Step2

          useEffect(() => {
            if( data !== null){
              dispatch(setMessage('Usuario criado com sucesso'))
              navigate('/')
            } else if(error){
              alert(`Nao foi possivel realizar operacao. (${error})`
              )
            }
          },[data, error, navigate])


    return (
      <>

      <Box>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{alignItems: 'center', display: 'flex' , height: '100vh'}}>
            <Container maxWidth="sm">

            <Box sx={{ marginBottom: pxToRem(24)}}>
            <Logo height={41} width={100}/>
              </Box>

           <Box sx={{ marginBottom: pxToRem(24)}}>
              <StyledH1>{email ? 'Defina sua senha' : 'Faça seu cadastro'}</StyledH1>
              <Styledp>{''}{email ? 'Sua senha deve ter:' : 'Primeiro, diga-nos quem você é'}</Styledp>
                { email && (
                  <StyledUl>
                  <li>Entre 8 e 16 caracteres</li>
                  <li>Pelo menos uma letra maisucula</li>
                  <li>Pelo menos um caracter especial</li>
                  <li>Pelo menos um numero</li>
                </StyledUl>
                )}
              
            </Box>
             
            <FormComponent inputs={handleStepInputs.map((input, index) => ({
              type: input.type,
              placeholder: input.placeholder,
              value: email ? step2FormValues[index] || '' : step1FormValues[index] || '',
              onChange: (e: ChangeEvent<HTMLInputElement>) => email ? step2FormHandleChange(index, (e.target as HTMLInputElement).value) :
              step1FormHandleChange(index, (e.target as HTMLInputElement).value)
                                                              
            }))} 
             
             buttons={[
              {
              className:"primary", type: 'submit',
              disabled: email ? !step2FormValid || loading : !step1FormValid,
              onClick: email ? handleStep2 : handleStep1,
              children: email ? 'Enviar' : 'Próximo'
             },
            ]}
             
             />
            </Container>
            </Grid>

            <Grid item sm={6} sx={{ display: { xs: 'none', sm: 'block'}}}>
            
            <BannerImage></BannerImage>
         
            </Grid>
          </Grid>
        </Box>
      </>
    )
  }

  export default Registration