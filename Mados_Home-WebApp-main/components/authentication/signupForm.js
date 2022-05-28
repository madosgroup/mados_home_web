import {useState} from "react";
import {useRouter} from "next/router";
import {
	createStyles,
	Theme,
	withStyles,
	makeStyles,
} from "@material-ui/core/styles";
import * as Yup from "yup";
import {useFormik} from "formik";
import {
	Alert,
	Box,
	Grid,
	Divider,
	FormHelperText,
	TextField,
	Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import theme from "../../constants/theme";
import axios from 'axios';
import { SettingsCellSharp } from "@mui/icons-material";

const CssTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: "#323232",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "black",
		},
		"& .MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: "black",
				borderWidth: 1,
			},
		},
	},
})(TextField);

export const SignupForm = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [firstName,setFirstName] = useState('')
	const [lastName,setLastName] = useState('')
	const [username,setUsername] = useState('')
	const [password,setPassword] = useState('')
	const [confirmPassword,setConfirmPassword] = useState('')
	const [email,setEmail] = useState('')
	const [passwordMatch,setPasswordMatch]=useState(true)

	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			email: "ntore2000@gmail.com",
			password: "123123",
			submit: null,
		},
		validationSchema: Yup.object({
			lastName: Yup.string()
				.required("Last Name is required"),
			firstName: Yup.string()
				.required("First Name is required"),
			email: Yup.string()
				.email("Must be a valid email")
				.max(255)
				.required("Email is required"),
			password: Yup.string().max(255).required("Password is required"),
			confirmPassword: Yup.string()
				.required("Required *")
				.oneOf([Yup.ref("password"), null], "Password doesn't match"),
		}),
		onSubmit: async (values, helpers) => {
			try {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						// Success function
						position=>{console.log(position)}, 
						// Error function
						null, 
						// Options. See MDN for details.
						{
						   enableHighAccuracy: true,
						   timeout: 5000,
						   maximumAge: 0
						});
				} 
			} catch (err) {
				if (isMounted()) {
					helpers.setStatus({success: false});
					helpers.setErrors({submit: err.message});
					helpers.setSubmitting(false);
				}
			}
		},
	});
	const handleSubmit = async() => {
		try {
			setIsLoading(true)
			const userInfo = {
				first_name: firstName,
				last_name:lastName,
				email,
				password,
				password2:password,
				/* location, */
				username
			};
			await axios.post("http://34.229.97.210:5000:4000/api/v1/register/", {
				...userInfo
			  },{
				  "content-type":"application/json"
			  })
			  .then(function (response) {
				console.log(response.data)
			  })
			  .catch(function (error) {
				const response=error.response.data;
				const errorMessage=()=>{
					if(response.username){return "Username is already taken"}
					else if(response.email){return "Account using this email already exists"}	
					else if(response.password){return response.password}
					else{
						return "Can't process the registration"
					}
				}
			  });
			  setIsLoading(false)
		} catch (err) {
			console.error(err.response.data.detail);
		}
	};

	const checkPassword=(val)=>{
		if (password === val) {
			setPasswordMatch(true);
		} else {
			setPasswordMatch(false)
		}
		setConfirmPassword(val)

	}

	return (
		<div {...props}>
			<form noValidate onSubmit={formik.handleSubmit}>
				<Grid container spacing={3} sx={{mt: 3}}>
					<Grid item xs={6}>
						<CssTextField
							fullWidth
							label="First name"
							onChange={(evt) => {
								setFirstName(evt.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<CssTextField
							fullWidth
							label="Last name"
							onChange={(evt) => {
								setLastName(evt.target.value);
							}}
						/>
					</Grid>
				</Grid>
				<Box sx={{mt: 3}}>
					<CssTextField
						fullWidth
						label="username"
						onChange={(evt) => {
							setUsername(evt.target.value);
						}}
					/>
				</Box>
				<Box sx={{mt: 3}}>
					<CssTextField
						fullWidth
						label="Email"
						onChange={(evt) => {
							setEmail(evt.target.value);
						}}
					/>
				</Box>

				<Box sx={{mt: 3}}>
					<CssTextField
						fullWidth
						label="Password"
						type="password"
						onChange={(evt) => {
							setPassword(evt.target.value);
						}}
					/>
				</Box>

				<Box sx={{mt: 3}}>
					<CssTextField
						fullWidth
						label="Confirm password"
						type="password"
						onChange={(evt) => {
							checkPassword(evt.target.value);
						}}
					/>
					{!passwordMatch && (
						<p style={{fontSize: "0.8em", color: "red"}}>
							Password is not matching
						</p>
					)}
				</Box>

				{formik.errors.submit && (
					<Box sx={{mt: 3}}>
						<FormHelperText error>
							{formik.errors.submit}
						</FormHelperText>
					</Box>
				)}
				<Box sx={{mt: 2}}>
					<LoadingButton
						loading={isLoading}
						fullWidth
						sx={{
							backgroundColor: theme.color.primary,
							"&:hover": {backgroundColor: theme.color.primary_},
						}}
						size="large"
						type="submit"
						variant="contained"
						onClick={handleSubmit}
					>
						Sign Up
					</LoadingButton>
				</Box>
				{/* <Box sx={{ mt: 2 }}>
          <Alert severity="info">
            <div>
              You can use
              {' '}
              <b>demo@devias.io</b>
              {' '}
              and password
              {' '}
              <b>Password123!</b>
            </div>
          </Alert>
        </Box> */}
			</form>
		</div>
	);
};
