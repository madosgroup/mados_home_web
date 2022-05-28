import {useContext, useEffect, useState} from 'react';
import Navbar from '../../components/navbar'
import Head from 'next/head'
import { Grid,Box, Avatar, Divider } from '@mui/material';
import Theme from '../../constants/theme';
import AccountFavorites from '../../components/account/account-favorites';
import Sidebar from '../../components/account/sidebar';
import {Context as AuthContext} from '../../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListIcon from '@mui/icons-material/List';
import { useRouter } from 'next/router';
import AuthGuard from '../../components/authentication/auth-guard';
import {useCookies} from 'react-cookie';
import {houses} from '../../constants/data';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const Page=()=>{
    const {state}=useContext(AuthContext);
	const [cookies,setCookie,removeCookie]=useCookies();
    const [currentSection,setCurrentSection]=useState("general");
    const [favorites,setFavorites]=useState(null)
    const router= useRouter()
	useEffect(()=>{
		if(!cookies.user || cookies.user==='undefined' ){
			router.push('/')
		}
		jwt.verify(
			cookies.user,
			`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
			function (err, decoded) {
				if (err) {
					console.error(err);
				} else {
					fetchHouses(decoded.like)
				}
			}
		);
       
	},[])

	const fetchHouses=async (ids)=>{
		const tmp=[]
		ids.map(async (id)=>{
			await axios.get(`http://34.229.97.210:5000/api/v1/rooms/${id}/`)
			.then(res=>{
				tmp.push(res.data)
				if (tmp.length===ids.length) {
					setFavorites(tmp)
				}
				/* if(!favorites){
					setFavorites([...res.data])
				}else{
					setFavorites([...favorites,...res.data])
				} */
			})
			.catch(err=>{
				console.log(err.response);
			})
		})
		
	}

    return (
	<AuthGuard>
		<>
			<Head>
				<title>Mados Home</title>
				<link rel="icon" href="/logo.svg" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</Head>
			<Navbar />
			<Box
				sx={{
					maxWidth: "100vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>

				<Grid
					container
					xs={10}
					sx={{display: "flex", justifyContent: "center"}}
				>
                		<Grid
						xs={12}
						sx={{
							mt: 4,
							borderTopLeftRadius: "1em",
							borderTopRightRadius: "1em",
							height: "15em",
							backgroundImage: `url(https://www.publicdomainpictures.net/pictures/60000/nahled/grey-gradient-background.jpg)`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							overflow: "visible",
						}}
					>
						<Avatar
                        src="https://uploads-ssl.webflow.com/5ee8ad43cc806482b6268d59/5f0866626672d1001b6ba1f4_StockProfile%20male.jpg"
							sx={{
								float: "right",
								marginRight: "1em",
								width: "2.5em",
								height: "2.5em",
								marginTop: "10.6em",
							}}
						/>
					</Grid>				
					<Grid sx={{display: "flex"}} xs={12}>
						<Sidebar/>
                        <Grid sx={{pt:1}} lg={9}>
							<p style={{marginLeft:'1.5em',fontSize:'1.2em',marginTop:'1em'}}>Your Favorites</p>
                            {favorites && <AccountFavorites favorites={favorites}/>}
                        </Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	</AuthGuard>
	);
}



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


export default Page;