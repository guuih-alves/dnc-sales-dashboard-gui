import { StrictMode } from 'react'
import { GlobalStyle } from './styles/globalStyle.ts'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppThemeProvider } from './contexts/AppThemeContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/index.ts'


//Para aplicar os temas globalmente

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <AppThemeProvider>
       <GlobalStyle/>
       <App />
       </AppThemeProvider>
    </Provider>
  </StrictMode>
)
