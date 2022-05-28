import {useState,useContext} from "react";
import {
	Box,
	Grid,
	Typography,
	Button,
	IconButton,
	Menu,
	TextField,
} from "@mui/material";
import {Logo} from "../../icons/logo";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import theme from "../../constants/theme";
import {Context as AuthContext} from '../../context/AuthContext'
import { LoadingButton } from "@mui/lab";
import jwt from 'jsonwebtoken';
import { useCookies } from "react-cookie"
import {useRouter} from "next/router";

const Content = (props) => {

	const {hideForm, authenticate} = props;
	const router=useRouter();
	const {login} = useContext(AuthContext);
	const {index, setIndex} = useState(0);
	const [username, setUsername] = useState("anotheruser");
	const [password, setPassword] = useState("supersecret");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [cookie, setCookie] = useCookies();

	//Method handled in Navbar component
	const handleLogin = async () => {
		setIsLoading(true);
		const res = await authenticate({username, password});
		console.log(res);
		if (res.ok) {
			setIsLoading(false);
			hideForm();
		} else {
			setIsLoading(false);
			setError("Wrong username or Password!");
		}
	};
    
	return (
		<Box
			sx={{
				position: "fixed",
				width: "100vw",
				height: "100vh",
				top: 0,
				left: 0,
				zIndex: 100000000,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					px: 6,
					py: 3,
					height: "80vh",
					width: ['70vw','null','40vw'],
					backgroundColor: "white",
					boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;",
					overflowY:'scroll',

				}}
			>
				<Box sx={{...styles.center}}> 
					<Logo
						sx={{
							width: "45px",
							height: "50px",
							mt: 1,
						}}
					/>
					<IconButton
						sx={{
							position: "relative",
							display: "block",
							top: 0,
							left: 0,
						}}
						onClick={hideForm}
					>
						<CloseIcon sx={{color: "black"}} />
					</IconButton>
				</Box>
				<p
					style={{
						fontSize: "1.5rem",
						fontWeight: 600,
						marginTop: "1em",
					}}
				>
					Join to unlock the best 
				</p>
				<p style={{
						fontSize: "1.5rem",
						fontWeight: 600,
					}}>
					of Mados
				</p>
				<p
					style={{
						fontSize: ".8rem",
						fontWeight: 600,
						marginTop: "1em",
						marginBottom: "0.2em",
					}}
				>
					Username
				</p>
				<TextField
					size="small"
					fullWidth
					placeholder="Username"
					value={username}
                    onChange={evt=>{setUsername(evt.target.value)}}
				/>
				<p
					style={{
						fontSize: ".8rem",
						fontWeight: 600,
						marginTop: "1.5em",
						marginBottom: "0.2em",
					}}
				>
					Password
				</p>
				<TextField
					size="small"
					value={password}
					placeholder="Password"
					fullWidth
                    onChange={evt=>{setPassword(evt.target.value)}}
                    type="password"
				/>
				<Link href="/authentication/forgot-password">
					<p
						style={{
							fontSize: "0.8em",
							margin: "1.5em 0 2em 0",
							cursor: "pointer",
						}}
					>
						Forgot password?
					</p>
				</Link>
				<p style={{color:'red',fontSize:'0.9em',textAlign:'center',marginBottom:'0.2em'}}>{error}</p>
				<LoadingButton
                    loading={isLoading}
                    disabled={username&&password?false:true}
					sx={{
						...styles.btnLoginPopup,
						width:'100%'
					}}
                    onClick={handleLogin}
				>
					Sign In
				</LoadingButton>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<p
						style={{
							fontSize: "0.8em",
							margin: "1.5em auto 0 auto",
						}}
					>
						Don't have an account?
					</p>
					<p
						style={{
							fontSize: "0.8em",
							margin: "0.1em auto 0 auto",
							color: theme.color.primary,
							cursor: "pointer",
						}}
						onClick={() => {
							router.push("/authentication/signup");
						}}
					>
						Sign Up
					</p>
				</Box>
			</Box>
		</Box>
	);
};

export default Content;

const styles = {
	links: {
		display: "flex",
		alignItems: "center",
		mr: 10,
		cursor: "pointer",
		fontWeight: "500",
		fontSize: "15px",
		fontFamily: "Poppins",
		color: "#323232",
	},
	btnLogin: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
		width: "100px",
		"&:hover": {
			background: theme.color.primary_,
		},
	},
	btnLoginPopup: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
		width: "100px",
		display: "block",
		"&:hover": {
			background: theme.color.primary_,
		},
	},
	center: {
		display: "flex",
		alignItem: "center",
		justifyContent: "space-between",
	},
};
