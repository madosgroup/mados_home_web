import { useState,useEffect,useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {Context as AuthContext} from '../../context/AuthContext';
import theme from '../../constants/theme';

const Content = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {state}=useContext(AuthContext);

  const handleEdit = () => {
		setIsEditing(!isEditing);
    
  };

  useEffect(()=>{
    
  },[])
  return (
		<>
			<Card sx={{mt: 4}}>
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={12}>
							<Typography variant="h6">
								Change password
							</Typography>
						</Grid>
						<Grid item md={7} sm={12} xs={12}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									my: 2,
								}}
							>
								<TextField
									label="Old Password"
									type="password"
									size="small"
                  sx={styles.passwordInput}
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									my: 2,
								}}
							>
								<TextField
									label="New Password"
									type="password"
									size="small"
                  sx={styles.passwordInput}
								/>
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									my: 2,
								}}
							>
								<TextField
									label="Confirm Password"
									type="password"
									size="small"
									sx={styles.passwordInput}
								/>
							</Box>
							<Button sx={styles.btnContained}>Save</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<Card sx={{mt: 4}}>
				<CardContent>
					<Typography variant="h6">Login history</Typography>
					<Typography
						color="textSecondary"
						sx={{mt: 1}}
						variant="body2"
					>
						Your recent login activity:
					</Typography>
				</CardContent>
				<>
					<Table sx={{minWidth: 500}}>
						<TableHead>
							<TableRow>
								<TableCell>Login type</TableCell>
								<TableCell>IP Address</TableCell>
								<TableCell>Client</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<Typography variant="subtitle2">
										Credentials login
									</Typography>
									<Typography variant="body2" color="body2">
										on 10:40 AM 2021/09/01
									</Typography>
								</TableCell>
								<TableCell>95.130.17.84</TableCell>
								<TableCell>Chrome, Mac OS 10.15.7</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Typography variant="subtitle2">
										Credentials login
									</Typography>
									<Typography color="body2" variant="body2">
										on 10:40 AM 2021/09/01
									</Typography>
								</TableCell>
								<TableCell>95.130.17.84</TableCell>
								<TableCell>Chrome, Mac OS 10.15.7</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</>
			</Card>
		</>
  );
};



const styles={
  btnContained: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "medium",
		fontFamily: "Poppins",
        borderRadius:10,
		width: "100px",
		"&:hover": {
			background: theme.color.primary_,
		},
	},
  passwordInput:{
    flexGrow: 1,
    "& .MuiOutlinedInput-notchedOutline": {
      borderStyle: "line",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
        borderWidth: 1,
      },
    },
    "& label.Mui-focused": {
      color: "#323232",
    }
  }
}

export default Content;

