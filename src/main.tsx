import { StrictMode } from 'react'
import { ThemeProvider } from 'styled-components'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DarkTheme, GlobalStyle, lighTheme } from './styles/'


//Para aplicar os temas globalmente

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={DarkTheme}>
    <GlobalStyle/>
    <App />

    </ThemeProvider>
   
  </StrictMode>
)
