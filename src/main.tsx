import { StrictMode } from 'react'
import { ThemeProvider } from 'styled-components'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { lighTheme, GlobalStyle } from './styles/'


//Para aplicar os temas globalmente

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lighTheme}>
    <GlobalStyle/>
    <App />

    </ThemeProvider>
   
  </StrictMode>
)
