
import {useState,useEffect,useRef,useContext} from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link';
import {Box, Grid, Typography, Button, IconButton,Menu,MenuItem,Divider,TextField,Avatar, Tooltip,ListItemIcon, ListItemText} from "@mui/material";
import {Logo} from "../icons/logo";
import theme from '../constants/theme';
import MenuIcon from '@mui/icons-material/Menu';
import useWindowDimensions  from '../hooks/screen-hook';
import CloseIcon from '@mui/icons-material/Close';
import TourIcon from '@mui/icons-material/Tour';
import AuthPopup from '../components/authentication/AuthPopup';
import {Context as AuthContext} from '../context/AuthContext';
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {useCookies} from 'react-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { TrendingUpOutlined } from '@mui/icons-material';

const navigation = [
	{
		title: "Hotels",
		link: "/",
	},
	{
		title: "Apartement",
		link: "/",
	},
	{
		title: "About",
		link: "/",
	},
	{
		title: "Features",
		link: "/",
	},
	
];


const Content=()=>{

	const router=useRouter();
	const { height, width } = useWindowDimensions();
	const [screen,setScreen] = useState("");
	const anchorRefUserInfo = useRef(null);
	const anchorRefProperties = useRef(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openMenu_, setOpenMenu_] = useState(false);
	const [isToggle, setIsToggle]= useState(false);
	const [showAuthForm,setShowAuthForm]=useState(false);
	const {state,logout,setUser}=useContext(AuthContext);
	const [cookies,setCookie,removeCookie]=useCookies();
	const [isAuthenticated,setIsAuthenticated]=useState(false);
	const [categories,setCategories]=useState([])

	useEffect(()=>{

		if(width<600){
			setScreen('xs')
		}
		else if(width<600){
			setScreen('sm')
		}
		else if(width<1200){
			setScreen('md')
			setIsToggle(false)
		}else if(width<1536){
			setScreen('lg')
		}
		
	},[height,width]);


	const handleMenuOpen = () => {
		setOpenMenu(true);
	};

	const handleMenuClose = () => {
		setOpenMenu(false);
	};
	const handleMenuClose_ = () => {
		setOpenMenu_(false);
	};
	const handleMenuOpen_ = () => {
		setOpenMenu_(true);
	};

	const handleHideForm = () => {
		setShowAuthForm(false);
	};

	const handleLogout = () => {
		removeCookie("user");
		setUser(null);
		setIsAuthenticated(false);
	};

	const fetchCategories = async () => {
		await axios("http://34.229.97.210:5000/api/v1/category")
			.then((response) => {
				setCategories(response.data);
			})
			.catch((err) => {
				console.error(err.response);
			});
	};

	useEffect(() => {
		if (cookies.user && cookies.user != "undefined") {
			jwt.verify(
				cookies.user,
				`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
				function (err, decoded) {
					if (err) {
						console.error(err);
					} else {
						//Refetch user Info to update ----
						axios
							.get(
								`http://34.229.97.210:5000/api/v1/user/${decoded.username}`
							)
							.then(function (response) {
								const user_info = {
									...response.data[0],
								};
								//Set the token
								var token = jwt.sign(
									user_info,
									`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
									{noTimestamp: true}
								);
								setCookie("user", JSON.stringify(token), {
									path: "/",
									maxAge: 3600 * 24 * 30,
									sameSite: true,
								});

								jwt.verify(
									token,
									`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
									function (err, decoded) {
										if (err) {
											console.error(err);
										} else {
											setUser(decoded);
											setIsAuthenticated(true);
										}
									}
								);
							})
							.catch(function (error) {
								console.error(error.response);
							});
						setUser(decoded);
					}
				}
			);
		}
		//Fetch Categories
		fetchCategories();
	}, []);

	useEffect(()=>{
		if(state.user){
			setIsAuthenticated(true)
		}else{
			setIsAuthenticated(false)
		}
	},[state.user])

	const handleAuthenticate = async (obj) => {
		/* 	var token = jwt.sign(obj, `${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,{noTimestamp:true});
			setCookie('user',JSON.stringify(token),{
				path:'/',
				maxAge:3600*24*30,
				sameSite:true
			})

			jwt.verify(token,`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`, function(err, decoded) {
				if (err) {
					console.error(err);
				}
				else{
					console.log(decoded);
					setUser(decoded);
					setIsAuthenticated(true);
				}
		})
		return {ok:true} */
		const response = await axios
			.post(`http://34.229.97.210:5000/api/v1/login/`, {...obj})
			.then(async (response)=> {
				const resultTokens = response.data;
				await axios
					.get(
						`http://34.229.97.210:5000/api/v1/user/${obj.username}`
					)
					.then(function (response) {
						const user_info = {
							...resultTokens,
							...response.data[0],
						};
						//Set the token
						var token = jwt.sign(
							user_info,
							`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
							{noTimestamp: true}
						);
						setCookie("user", JSON.stringify(token), {
							path: "/",
							maxAge: 3600 * 24 * 30,
							sameSite: true,
						});

						jwt.verify(
							token,
							`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
							function (err, decoded) {
								if (err) {
									console.error(err);
								} else {
									setUser(decoded);
									setIsAuthenticated(true);
								}
							}
						);
					})
					.catch(function (error) {
						console.error(error.response.data.detail);
					});
				return {ok: true};
			})
			.catch(function (error) {
				let message;
				if (error.response) {
					message = error.response.data;
					console.error(error.message);
				}
				return {ok: false, message};
			});
		return response;
	};

    return (
		<Box sx={{backgroundColor: "white"}}>
			<Box
				px={[3, null, 10]}
				py={1}
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Box>
						<Box
							sx={{
								"&:hover": {
									cursor: "pointer",
								},
							}}
							onClick={()=>{router.push('/')}}
						>
							<Logo onClick={()=>{router.push('/')}} sx={{width: "45px", height: "50px"}} />
						</Box>
				</Box>
				{true ? (
					<Box>
						<Grid
							sx={{
								width: "65vw",
								display: "flex",
								flexDirection: "row",
								justifyContent: "right",
							}}
							container
						>
							
								<Typography
									onClick={handleMenuOpen_}
									ref={anchorRefProperties}
									sx={styles.links}
								>
									Properties
								</Typography>
							<Menu
								anchorEl={anchorRefProperties.current}
								id="properties-menu"
								open={openMenu_}
								onClose={handleMenuClose_}
								onClick={handleMenuClose_}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: "visible",
										filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
										mt: 1.5,
										width: "10em",
										"& .MuiAvatar-root": {
											width: 50,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										"&:before": {
											content: '""',
											display: "block",
											position: "absolute",
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: "background.paper",
											transform:
												"translateY(-50%) rotate(45deg)",
											zIndex: 0,
										},
									},
								}}
								transformOrigin={{
									horizontal: "right",
									vertical: "top",
								}}
								anchorOrigin={{
									horizontal: "right",
									vertical: "bottom",
								}}
							>
								{
									categories && categories.map((el,pos)=>
									{
										if(el.name!="Hotel") 
										return <MenuItem key={pos} onClick={()=>{router.push('/search_?pt='+el.name)}}>
											<p style={{fontSize	:'0.9em'}}>{el.name}</p>
										</MenuItem>
									})
								}
								
							</Menu>
							<Link
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								href="/hotels"
								item
							>
								<Typography sx={styles.links}>
									Hotels
								</Typography>
							</Link>
							<Link
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								href="/tourism"
								item
							>
								<Typography sx={styles.links}>
									Tourism
								</Typography>
							</Link>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								onClick={()=>{router.push('/contact')}}
								item
							>
								<Typography sx={styles.links}>
									Contact
								</Typography>
							</Box>
							<Link
								href="/about"
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								item
							>
								<Typography sx={styles.links}>About</Typography>
							</Link>

							{isAuthenticated && (
								<Button
									onClick={() => {
										router.push("/account/publish");
									}}
									sx={styles.btnOutlined}
								>
									Publish
								</Button>
							)}

							{!isAuthenticated ? (
								<Button
									size="medium"
									sx={styles.btnLogin}
									onClick={() => {
										setShowAuthForm(true);
									}}
								>
									SIGN IN
								</Button>
							) : (
								<>
										<Avatar
											size="medium"
											sx={styles.avatar}
											onClick={handleMenuOpen}
											ref={anchorRefUserInfo}
										>
											{state.user && state.user.username
												.slice(0, 2)
												.toUpperCase()}
										</Avatar>
									<Menu
										anchorEl={anchorRefUserInfo.current}
										id="account-menu"
										open={openMenu}
										onClose={handleMenuClose}
										PaperProps={{
											elevation: 0,
											sx: {
												overflow: "visible",
												filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
												mt: 1.5,
												"& .MuiAvatar-root": {
													width: 32,
													height: 32,
													ml: -0.5,
													mr: 1,
												},
												"&:before": {
													content: '""',
													display: "block",
													position: "absolute",
													top: 0,
													right: 14,
													width: 10,
													height: 10,
													bgcolor: "background.paper",
													transform:
														"translateY(-50%) rotate(45deg)",
													zIndex: 0,
												},
											},
										}}
										transformOrigin={{
											horizontal: "right",
											vertical: "top",
										}}
										anchorOrigin={{
											horizontal: "right",
											vertical: "bottom",
										}}
									>
										<MenuItem
											onClick={() => {
												router.push("/account");
											}}
										>
											<Avatar /> My account
										</MenuItem>
										<Divider />
										<MenuItem onClick={handleLogout}>
											<ListItemIcon>
												<Logout fontSize="small" />
											</ListItemIcon>
											Logout
										</MenuItem>
									</Menu>
								</>
							)}
							{showAuthForm && (
								<AuthPopup
									hideForm={handleHideForm}
									authenticate={handleAuthenticate}
								/>
							)}
						</Grid>
					</Box>
				) : (
					<Box>
						{screen != "lg" && (
							<IconButton
								onClick={() => {
									setIsToggle(true);
								}}
							>
								<MenuIcon sx={{fontSize: "2rem"}} />
							</IconButton>
						)}
					</Box>
				)}

				{isToggle && (
					<Box
						py={1.5}
						sx={{
							height: "100vh",
							width: "100vw",
							position: "absolute",
							top: 0,
							left: 0,
							zIndex: 1000000,
							backgroundColor: "white",
							alignText: "left",
						}}
					>
						<IconButton
							onClick={() => {
								setIsToggle(false);
							}}
							sx={{marginLeft: "80%"}}
						>
							<CloseIcon sx={{fontSize: "2rem"}} />
						</IconButton>
					</Box>
				)}
			</Box>
		</Box>
	);
}


const styles = {
	links: {
		display: "flex",
		alignItems: "center",
		mr: 5,
		cursor: "pointer",
		fontWeight: "500",
		fontSize: "1em",
		fontFamily: "Poppins",
		color:'#323232'
	},
	btnLogin: {
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
	avatar:{
		backgroundColor: theme.color.primary,
		fontSize:'1em',
		cursor:'pointer'
	},
	btnLoginPopup: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "medium",
		fontFamily: "Poppins",
        borderRadius:10,
		width: "100px",
		display:'block',
		"&:hover": {
			background: theme.color.primary_,
		},
	},
	btnOutlined: {
		backgroundColor: "white",
		border: `2px solid ${theme.color.primary}`,
		borderWidth: 1,
		mx:1,
		px:3,
		color: theme.color.primary,
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
	},
	center:{
		display:'flex',
		alignItem:'center',
		justifyContent:'space-between'
	}
};

export default Content;

