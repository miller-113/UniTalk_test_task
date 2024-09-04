import { ThemeProvider } from '@mui/material/styles'
import { theme } from '~/styles/app-theme/custom-mui.styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  )
}

export default App
