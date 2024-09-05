import { ThemeProvider } from '@mui/material/styles'
import { theme } from '~/styles/app-theme/custom-mui.styles'
import Operators from '~/pages/operators/Operators'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Operators />
    </ThemeProvider>
  )
}

export default App
