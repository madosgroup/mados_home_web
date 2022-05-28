import {useContext, useEffect, useState} from 'react';
import { Grid,Box, Avatar, Divider } from '@mui/material';
import Theme from '../../constants/theme';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListIcon from '@mui/icons-material/List';
import { useRouter } from 'next/router';


const Content=()=>{
    const router= useRouter()
	return (
		<Grid xs={3} sx={{backgroundColor: "#EFEFEF", height: "100%"}}>
			<Box
				sx={{
					py: 2,
				}}
			>
				<p>&nbsp;</p>
			</Box>
			<Divider />
			<Box
				sx={{
					py: 2.5,
					...styles.menuItem,
				}}
				onClick={() => {
					router.push("/account");
				}}
			>
				<PersonIcon sx={styles.menuIcons} />
				<p style={styles.menuTitle}>Profile</p>
			</Box>
			<Divider />
			<Box
				sx={{
					py: 2.5,
					...styles.menuItem,
				}}
				onClick={() => {
					router.push("/account/publish");
				}}
			>
				<EditIcon sx={styles.menuIcons} />
				<p style={styles.menuTitle}>Publish</p>
			</Box>
			<Divider />
			<Box
				sx={{
					py: 2.5,
					...styles.menuItem,
				}}
				onClick={() => {
					router.push("/account/publications");
				}}
			>
				<ListIcon sx={styles.menuIcons} />
				<p style={styles.menuTitle}>Publications</p>
			</Box>
			<Divider />
			<Box
				sx={{
					py: 2.5,
					...styles.menuItem,
				}}
				onClick={() => {
					router.push("/account/favorites");
				}}
			>
				<p style={styles.menuTitle}>Favorites</p>
			</Box>
            <Divider />
			<Box
				sx={{
					py: 2.5,
					...styles.menuItem,
				}}
				onClick={() => {
					router.push("/account/booked");
				}}
			>
				<p style={styles.menuTitle}>Tourism</p>
			</Box>
			<Divider />
			<Box
				sx={{
					py: 2.5,
					...styles.menuItem,
				}}
				onClick={() => {
					router.push("/account/security");
				}}
			>
				<VpnKeyIcon sx={styles.menuIcons} />
				<p style={styles.menuTitle}>Security</p>
			</Box>
			<Divider />
		</Grid>
	);
};

export default Content;

const styles={
	
	menuItem:{
		pl:2,
        display:'flex',
        justifyContent:'left',
        alignItems:'center',
        cursor:'pointer',
        '&:hover':{
			backgroundColor:'#C9CCD5'
        }
    },
    menuIcons:{
		fontSize:'1.5rem',
        marginRight:'0.5em',
        color:'#323232'
    },
    menuTitle:{
		fontSize:'1rem'
    },
}
