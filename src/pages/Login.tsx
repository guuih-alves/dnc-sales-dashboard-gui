
import { ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

//Componets 
import { Box, Container, Grid } from "@mui/material";
import { BannerImage, FormComponent, Logo, StyledH1, Styledp } from "@/components";

//Hooks
import { useFormValidation, usePost } from "@/hooks";

//Utils
import { pxToRem, jwtExpirationDateConverter } from "@/utils";

//Types
import { DecodeJWT, MessageProps, LoginData, LoginPostData } from "@/types";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

function Login() {

  const { email, message} = useSelector((state: RootState) => state.createProfile)
  const navigate =  useNavigate();
  const inputs = [
    { type: 'email', placeholder: 'Email'},
    { type: 'password', placeholder: 'Senha'},
  ]

  const { data, loading, error, postData} = usePost<LoginData, LoginPostData>('login')
  const { formValues, formValid, handleChange} = useFormValidation(inputs);

  const handleMessage = (): MessageProps => {
    if (!error) return {msg: message ?? '', type: 'success'}
    switch (error){
      case 401:
        return{
          msg: 'Email e/ou senha invalidos',
          type: 'error',
        }

        default:
          return{
            msg: 'Nao foi possivel realizer a operação',
            type: 'error',
          }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await postData({
    email: String(formValues[0]),
    password: String(formValues[1])
    })
    }

  useEffect(() => {
    if (data?.jwt_token){
      const decoded: DecodeJWT = jwtDecode(data?.jwt_token)
      Cookies.set('Authorization', data.jwt_token, { 
        expires: jwtExpirationDateConverter(decoded.exp),
        secure: true,
      }) 
    }
    if (Cookies.get('Authorization')) navigate('/home')
  }, [data, navigate])

  useEffect(() => {
    if(email) {
      handleChange(0, email)
    }
  }, [email])


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
              <StyledH1>Bem-Vindo</StyledH1>
              <Styledp>Digite sua senha para logar</Styledp>
              </Box>
             
             <FormComponent 
              inputs={inputs.map((input, index) => ({
              type: input.type,
              placeholder: input.placeholder,
              value: formValues[index] || '',
              onChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(index, (e.target as HTMLInputElement).value),
             }))}
             
             buttons={[
              {className: 'primary', disabled: !formValid || loading, type: 'submit' , onClick: handleSubmit, children: loading ? 'Aguarde...' : 'Login', },
             ]}
             
             message={handleMessage()}
             
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

  export default Login