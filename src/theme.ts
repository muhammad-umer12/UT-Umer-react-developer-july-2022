import { createMuiTheme } from '@material-ui/core';
import { CommonColors } from '@material-ui/core/styles/createPalette';

// APP COLOR THEME
interface CustomColors extends CommonColors {
  blue: string;
  orange: string;
}

const appBlue = '#0B72B9';
const appOrange = '#FFBA60';

// CREATE THEME INSTANCE
const theme = createMuiTheme({
  // props: {
  // 	MuiButtonBase: {
  // 		disableRipple: true,
  // 	},
  // },
  palette: {
    common: {
      blue: appBlue,
      orange: appOrange,
    } as CustomColors,
    primary: {
      main: appBlue,
    },
    secondary: {
      main: appOrange,
    },
  },
  typography: {},
  // typography:{
  //   tab: {
  //     fontFamily: 'Raleway',
  //     textTransform: 'none',
  //     fontWeight: 700,
  //     fontSize: '1rem',
  //   },
  //   estimate: {
  //     fontFamily: 'Pacifico',
  //     fontSize: '1rem',
  //     textTransform: 'none',
  //     color: 'white',
  //   },
  //   h2: {
  //     fontFamily: 'Raleway',
  //     fontWeight: 700,
  //     fontSize: '2.5rem',
  //     color: arcBlue,
  //     lineHeight: 1.5,
  //   },
  // }
});

export default theme;
