
import { Box, Container, Grid } from "@mui/material";
import { BannerImage, FormComponent, Logo, StyledH1, Styledp } from "@/components";
import { pxToRem } from "@/utils";

function Login() {


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
             
             <FormComponent input={[
              {type: 'email' , placeholder: 'Email', disabled: true},
              {type: 'password' , placeholder: 'Senha'},
             ]} 
             
             buttons={[
              {className: 'primary' , type: 'submit' , children: 'Login', disabled: true},
             ]}
             
             message={{
              msg: 'Sucesso !',
              type: 'success' ,
             }}/>
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