import { StrictMode } from 'react'
import { GlobalStyle } from './styles/globalStyle.ts'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/index.ts'
import { AppThemeProvider } from './contexts/AppThemeContext.tsx'

//Para aplicar os temas globalmente
//Para que o Redux funcione em toda a aplicação, precisamos envolver nosso componente principal com o Provider do Redux.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <GlobalStyle />
        <App />
      </AppThemeProvider>
    </Provider>
  </StrictMode>
)
