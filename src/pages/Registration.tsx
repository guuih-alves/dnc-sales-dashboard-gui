import { ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import { BannerImage, FormComponent, Logo, StyledH1, Styledp, StyledUl } from "@/components";
import { pxToRem } from "@/utils";


//hOOKS
import { useFormValidation, usePost } from "@/hooks";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { setMessage, setProfileData } from "@/redux/slices/createProfile";

//types
import { CreateProfileData, InputProps } from "@/types";


function Registration() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { email} = useSelector((state: RootState) => state.createProfile)
     const { data, loading, error, postData} = usePost<string, CreateProfileData>('profile/create')

    //Form Step1

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

    const { formValues: step1FormValues, formValid: step1FormValid, handleChange: step1FormhandleChange} = useFormValidation(step1Inputs)

     //Form Step2

     const step2Inputs: InputProps[] = [
      {type: 'password', placeholder: 'Senha'}, ]
    const handleStep2 = async (e: React.FormEvent) => {
      e.preventDefault()
      await postData({
        name: String(step1FormValues[0]),
        email: String(step1FormValues[1]),
        phone: String(step1FormValues[2]),
        password: String(step2FormValues[0])
      })
    }

    const { formValues: step2FormValues, formValid: step2FormValid, handleChange: step2FormhandleChange} = useFormValidation(step2Inputs)

    // Se houver email renderiza o step2, contrario sera step1
    const handleStepInputs = email ? step2Inputs : step1Inputs

    useEffect(() => {
      if(data !== null){
        dispatch(setMessage('Usuario criado com sucesso'))
        navigate('/')
      } else if (error) {
        alert(`Nao foi possivel realizar operaçao. (${error})`)
      }
    }, [data, error, navigate])

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
              <StyledH1> {email ? 'Defina sua senha' : 'Faça seu cadastro'}</StyledH1>
              <Styledp>{' '} {email ? 'Sua senha deve ter: ' : 'Primeiro diga quem voce é'}</Styledp>
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
                placeholder:input.placeholder,
                value: email ? step2FormValues[index] || '' : step1FormValues[index] || '',
                onChange: (e: ChangeEvent<HTMLInputElement>) => email ? step2FormhandleChange(index, (e.target as HTMLInputElement).value) : 
                step1FormhandleChange(index, (e.target as HTMLInputElement).value)
            }))} 
             
             buttons={[
              {
                className: 'primary' , disabled: email ? !step2FormValid || loading : !step1FormValid, onClick: email ? handleStep2 : handleStep1,
                 type: 'submit' , children: email ? 'Enviar' : 'Proximo'},
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