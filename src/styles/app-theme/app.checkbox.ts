import { checkboxClasses } from '@mui/material/Checkbox'
import palette from './app.pallete'

export const checkbox = {
  styleOverrides: {
    root: {
      color: palette.basic.secondary,
      [`&.${checkboxClasses.checked}`]: {
        color: palette.basic.red
      },
      '& .MuiSvgIcon-root': { fontSize: 18 }
    }
  }
}
