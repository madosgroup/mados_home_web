import {useContext, useEffect, useState} from 'react';
import {Context as AuthContext} from '../../context/AuthContext';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import jwt from 'jsonwebtoken';

const Content = (props) => {
  const {user_info}=props
  const [user,setUser]=useState(null)

  useEffect(()=>{
	 jwt.verify(user_info,`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`, function(err, decoded) {
		if (err) {
			console.error(err);
		}
		else{
			console.log(decoded);
			setUser(decoded)
		}
})
  },[])
  return (
	  <>
		{user && 
		<Box sx={{mt: 4}} {...props}>
			<Card>
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={12}>
							<Typography variant="h6">Basic details</Typography>
						</Grid>
						<Grid item md={8} xs={12}>
							<Box
								sx={{
									alignItems: "center",
									display: "flex",
								}}
							>
								<Avatar
									src="https://uploads-ssl.webflow.com/5ee8ad43cc806482b6268d59/5f0866626672d1001b6ba1f4_StockProfile%20male.jpg"
									sx={{
										height: 64,
										mr: 2,
										width: 64,
									}}
								/>
								<Button>Change</Button>
							</Box>
							<Box
								sx={{
									display: "flex",
									mt: 3,
									alignItems: "center",
								}}
							>
								<TextField
									defaultValue={user.first_name+" "+user.last_name}
									label="Full Name"
									size="small"
									sx={{
										flexGrow: 1,
										mr: 3,
									}}
								/>
								<Button>Save</Button>
							</Box>
							<Box
								sx={{
									display: "flex",
									mt: 3,
									alignItems: "center",
								}}
							>
								<TextField
									defaultValue={user.email}
									disabled
									label="Email Address"
									required
									size="small"
									sx={{
										flexGrow: 1,
										mr: 3,
										"& .MuiOutlinedInput-notchedOutline": {
											borderStyle: "dashed",
										},
									}}
								/>
								<Button>Edit</Button>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Card sx={{mt: 4}}>
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={12}>
							<Typography variant="h6">Public profile</Typography>
						</Grid>
						<Grid item md={8} sm={12} xs={12}>
							<Box
								sx={{
									alignItems: "center",
									display: "flex",
									justifyContent: "space-between",
									mb: 3,
								}}
							>
								<div>
									<Typography variant="subtitle1">
										Make Contact Info Public
									</Typography>
									<Typography
										color="textSecondary"
										sx={{mt: 1}}
										variant="body2"
									>
										Means that anyone viewing your profile
										will be able to see your contacts
										details.
									</Typography>
								</div>
								<Switch />
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Card sx={{mt: 4}}>
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={12}>
							<Typography variant="h6">Delete Account</Typography>
						</Grid>
						<Grid item md={8} xs={12}>
							<Typography sx={{mb: 3}} variant="subtitle1">
								Delete your account and all of your source data.
								This is irreversible.
							</Typography>
							<Button color="error" variant="outlined">
								Delete account
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
		}
	</>
  );
};




export default Content;