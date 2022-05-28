import '../styles/styles.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {Provider as AuthProvider} from '../context/AuthContext';
import {Provider as MainProvider} from '../context/MainContext';
import { CookiesProvider } from "react-cookie"

export default function App({ Component, pageProps }) {
   return (
      <CookiesProvider>
		<ThemeProvider theme={THEME}>
			<AuthProvider>
			   <MainProvider>
				<Component {...pageProps} />
			   </MainProvider>
			</AuthProvider>
		</ThemeProvider>
      </CookiesProvider>
   );
}


const THEME = createTheme({
   typography: {
    "fontFamily": "'poppins','sans-serif' !important",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
});