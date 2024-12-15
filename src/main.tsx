import { StrictMode } from 'react'
import { GlobalStyle } from './styles/globalStyle.ts'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppThemeProvider } from './contexts/AppThemeContext.tsx'


//Para aplicar os temas globalmente

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
    <GlobalStyle/>
    <App />

    </AppThemeProvider>
   
  </StrictMode>
)
