import { createTheme } from '@material-ui/core/styles';

const hamsBlue = "#0b72b9";
const hamsOrange = "#ffba60";

export default createTheme({
    // palette:{
    //     common:{
    //         blue: `${hamsBlue}`,
    //         hamsOrange: `${hamsOrange}`
    //     },
    //     primary:{
    //         main: `${hamsBlue}`
    //     },
    //     secondary:{
    //         main: `${hamsOrange}`
    //     }
        
    // }
    palette: {
        primary: {
          main: "#333996",
          light: '#3c44b126'
        },
        secondary: {
          main: "#f83245",
          light: '#f8324526'
        },
        background: {
          default: "#f4f5fd"
        },
      },
      overrides:{
        MuiAppBar:{
          root:{
            transform:'translateZ(0)'
          }
        }
      },
      props:{
        MuiIconButton:{
          disableRipple:true
        }
      }
});