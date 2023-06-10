import { createTheme } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'

const user = {
   primaryColor: '#4E60FF',
   darkColor: '#4E60dd',
}

export const LightTheme = createTheme({
   palette: {
      primary: {
         main: user.primaryColor,
         dark: user.darkColor,
         light: yellow[500],
         contrastText: '#ffffff',
      },
      secondary: {
         main: cyan[500],
         dark: cyan[400],
         light: cyan[300],
         contrastText: '#ffffff',
      },
      background: {
         paper: '#ffffff',
         default: '#f7f6f3',
      },
   },
})
