import {useState, useEffect, useContext} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import {Image as ImageR} from "semantic-ui-react";
import Head from "next/head";
import {
	Box,
	Grid,
	Typography,
	Button,
	InputAdornment,
	Input,
	Card,
	Avatar,
	Skeleton,
	List,
	ListItemButton,
	ListItemText,
	IconButton,
	InputBase,
	Paper,
	Divider
} from "@mui/material";
import {Logo} from "../icons/logo";
import Navbar from "../components/navbar";
import theme from "../constants/theme";
//To refactor inputs
import SearchIcon from "@mui/icons-material/Search";
import ImageCarousel from "../components/imageCarousel";
//
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {houses} from "../constants/data";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Context as AuthContext} from "../context/AuthContext";
import {Context as MainContext} from "../context/MainContext";
import AuthPopup from "../components/authentication/AuthPopup";
import axios from "axios";
import {useCookies} from "react-cookie";
import jwt from "jsonwebtoken";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";

const h1 = [0, 0, 0, 0];
const h2 = [0, 0, 0, 0, 0, 0, 0, 0];

const libraries = ["places"];

function HomePage(props) {
	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
		libraries,
	});
	const {housesFetched} = props;
	const urlImage = "estate1.jpg";
	const router = useRouter();
	const [isMobile, setisMobile] = useState(false);
	const [showAuthForm, setShowAuthForm] = useState(false);
	const contextMain = useContext(MainContext);
	const {state, addToFavorites, removeFromFavorites,setUser} =useContext(AuthContext);
	const [cookies, setCookie, removeCookie] = useCookies();

	const checkLiked=(id)=>{
	try{	if (state.user) {
			if (
				state.favorites.includes(id) ||
				state.user.like.includes(id)
			) {
				return true
			}
		}
		return false;}catch(err){
			console.error(err);
		}
	}
	const handleLike = async (id) => {
		/* if (cookies.user && cookies.user != "undefined") {
			if (!state.favorites.includes(id)) {
				addToFavorites(id);
			} else {
				removeFromFavorites(id);
			}
		} else {
			setShowAuthForm(true);
		} */
		try{const tmp = "";
		jwt.verify(
			cookies.user,
			`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
			function (err, decoded) {
				if (err) {
					console.error(err);
				} else {
					tmp = decoded;
				}
			}
		);
		await axios
			.post(`http://34.229.97.210:5000/api/v1/like/${id}/`, {
				username: tmp.username,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.error(err.response);
			});

		if (cookies.user && cookies.user != "undefined") {
			if (!state.favorites.includes(id)) {
				addToFavorites(id);
			} else {
				removeFromFavorites(id);
			}
		} else {
			setShowAuthForm(true);
		}}catch(err){
			console.error(err);
		}
	};
	//Check the user device
	useEffect(() => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			// some code..
			setisMobile(true);
		}
		setTimeout(() => {
			contextMain.setHouses(housesFetched);
		}, 2000);
		/* initializeUserInfo() */
	}, []);

	/* const initializeUserInfo=async () =>{
		if (cookies.user && cookies.user != "undefined") {
			const tmp=""
			jwt.verify(
				cookies.user,
				`${process.env.NEXT_PUBLIC_JWT_PRIVATE}`,
				function (err, decoded) {
					if (err) {
						console.error(err);
					} else {
						tmp = decoded;
					}
				}
			);
			await axios
			.post(`http://34.229.97.210:5000/api/v1/like/${id}/`, {
				username: tmp.username,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.error(err.response);
			});
		}
	} */
	const handleAuthenticate = async (obj) => {
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
			<Box
				sx={{
					pb: 10,
				}}
			>
				<Navbar showAuthForm={showAuthForm} />
				<video className='videoTag' style={{minWidth: '100%',maxWidth: '100%', minHeight: "420px;"}} autoPlay loop muted>
    <source src="http://192.168.1.107:8000/media/v.mp4" type='video/mp4' />
</video>
				<Grid
					sx={{
						mx: [0, 2, 8],
						mt: [2, 6],
						display: "flex",
						py: [16, 12],
						flexDirection: "column",
						alignItems: "center",
						fontFamily: "poppins",
						justifyContent: "center",
						// background: `url(http://192.168.1.107:8000/media/picstagram/index.jpeg)`,
						// backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
					}}
				>
					<Grid
						sx={{
							display: "flex",
							color: "white",
							mb: 3,
						}}
					>
						<Typography
							sx={{
								fontSize: ["1.8rem", "2.8rem"],
								fontWeight: "700",
								color: "white",
							}}
						>
							Find Your Perfect Place
						</Typography>
					</Grid>
					<Grid sx={{display: "flex", mb: 4}}>
						<Paper
							elevation={0}
							sx={{
								borderRadius: 8,
								p: "2px 4px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								height: [35, 45],
								backgroundColor: "#EFEFEF",
							}}
						>
							{/* <InputBase
								sx={{ml: 1, flex: 1, width: "40vw"}}
								placeholder="Search for a location"
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
							/> */}
							{isLoaded && <Search />}
						</Paper>
					</Grid>
					<Grid
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Button
							onClick={() => {
								router.push("/search_");
							}}
							sx={styles.btnFilter}
						>
							Rentals
						</Button>
						<Divider />
						<Button
							onClick={() => {
								router.push("/search_");
							}}
							sx={styles.btnMap}
						>
							Sales
						</Button>
					</Grid>
				</Grid>
			</Box>

			{/* <Box sx={{textAlign: "center"}}>
				<Image
					src={HeaderBanner}
					width={870}
					height={400}
					placeholder="blur"
					priority
				/>
			</Box> */}

			<h2
				style={{marginTop: "100", textAlign: "center", fontWeight: 600}}
			>
				Properties for sale
			</h2>
			<Box mt={3} px={[2, 4, 10]} mb={5}>
				<Grid container spacing={4}>
					{contextMain.state.houses
						? contextMain.state.houses.map((el, pos) => {
								if (pos < 4)
									return (
										<Grid
											key={pos}
											item
											xs={12}
											sm={6}
											md={4}
											lg={3}
											sx={{cursor: "pointer"}}
										>
											<Box
												sx={{
													backgroundColor: "#f6f6f6",
													overflow: "hidden",
													marginBottom: 1,
													paddingBottom: 2,
													borderWidth: "1px",
													boxShadow:
														"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
												}}
											>
												<ImageCarousel
													width="100%"
													height="14em"
													images={el.image_url[1]}
													label={false}
												/>
												<Box px={0.8}>
													<Box
														sx={{
															display: "flex",
															justifyContent:
																"space-between",
														}}
													>
														<p
															style={{
																marginTop:
																	"10px",
																fontWeight: 200,
																marginBottom:
																	"10px",
																fontSize:
																	"1.1em",
															}}
															onClick={() => {
																router.push(
																	`/houses/${el.id}`
																);
															}}
														>
															{el.name}
														</p>
														<Avatar
															sx={{
																my: 1,
																fontSize:
																	"0.8rem",
																widht: "1em",
																zIndex: 10000,
																backgroundColor:
																	"#e2e2e2",
															}}
															onClick={() => {
																handleLike(
																	el.id
																);
															}}
														>
															{checkLiked(el.id) ? (
																<FavoriteIcon
																	sx={{
																		color: "#FF4646",
																	}}
																/>
															) : (
																<FavoriteBorderOutlinedIcon
																	sx={{
																		color: "gray",
																	}}
																/>
															)}
														</Avatar>
													</Box>
													<Box
														mt={1}
														p={0}
														onClick={() => {
															router.push(
																`/houses/${el.id}`
															);
														}}
													>
														<p
															style={{
																fontWeight:
																	"500",
																fontSize: "1em",
																margin: "0px",
															}}
														>
															{el.price +
																" " +
																el.currency}
															/mo&nbsp;&nbsp;
														</p>
														<p
															style={{
																fontWeight:
																	"300",
																fontSize:
																	"0.9em",
																margin: "0px",
															}}
														>
															Location:&nbsp;
															{el.city}
														</p>
														<p
															style={{
																fontWeight:
																	"300",
																fontSize:
																	"0.9em",
																margin: "0px",
															}}
														>
															Posted:&nbsp;
															{el.date}
														</p>
													</Box>
												</Box>
												<Divider sx={{my: 2}} />
												<Box
													display="flex"
													sx={{
														justifyContent:
															"space-around",
													}}
													onClick={() => {
														router.push(
															`/houses/${el.id}`
														);
													}}
												>
													<Box
														sx={{
															display: "flex",
															alignItems:
																"center",
															justifyContent:
																"center",
															r: 2,
														}}
													>
														<HotelIcon
															sx={{
																fontSize:
																	"1.2em",
																mb: 0.5,
																mr: 0.8,
																color: "#323232",
															}}
														/>
														<p
															style={{
																fontSize:
																	"0.9em",
															}}
														>
															{el.bedrooms} Beds
														</p>
													</Box>
													<Box
														sx={{
															display: "flex",
															alignItems:
																"center",
															justifyContent:
																"center",
															r: 2,
														}}
													>
														<BathtubIcon
															sx={{
																fontSize:
																	"1.2em",
																mb: 0.5,
																mr: 0.8,
																color: "#323232",
															}}
														/>
														<p
															style={{
																fontSize:
																	"0.9em",
															}}
														>
															{el.baths} Bath
														</p>
													</Box>
												</Box>
											</Box>
										</Grid>
									);
						  })
						: h1.map((el, pos) => (
								<Grid key={pos} item xs={12} md={3}>
									<Box
										sx={{
											backgroundColor: "#f6f6f6",
											overflow: "hidden",
											marginBottom: 1,
											paddingBottom: 2,
											borderWidth: "1px",
											"&:hover": {
												cursor: "pointer",
											},
										}}
									>
										<Skeleton
											variant="rectangular"
											width="100%"
											height="14em"
										/>
										<Box px={0.8} mt={2}>
											<Box
												sx={{
													display: "flex",
													justifyContent:
														"space-between",
													alignItems: "center",
												}}
											>
												<Skeleton
													width="80%"
													height={30}
													variant="text"
												/>
												<Skeleton
													variant="circular"
													width={40}
													height={40}
												/>
											</Box>
										</Box>
									</Box>
								</Grid>
						  ))}
				</Grid>
			</Box>

			<h2
				style={{marginTop: "100", textAlign: "center", fontWeight: 600}}
			>
				Properties for rent
			</h2>
			<Box mt={3} px={[2, 4, 10]} mb={8}>
				<Grid container spacing={4}>
					{contextMain.state.houses
						? contextMain.state.houses.map((el, pos) => {
								if (pos >= 4 && pos < 12)
									return (
										<Grid
											key={pos}
											item
											xs={12}
											sm={6}
											md={4}
											lg={3}
											sx={{cursor: "pointer"}}
										>
											<Box
												sx={{
													backgroundColor: "#f6f6f6",
													overflow: "hidden",
													marginBottom: 1,
													paddingBottom: 2,
													borderWidth: "1px",
													boxShadow:
														"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
												}}
											>
												<ImageCarousel
													width="100%"
													height="14em"
													images={el.image_url[1]}
													label={false}
												/>
												<Box px={0.8}>
													<Box
														sx={{
															display: "flex",
															justifyContent:
																"space-between",
														}}
													>
														<p
															style={{
																marginTop:
																	"10px",
																fontWeight: 200,
																marginBottom:
																	"10px",
																fontSize:
																	"1.1em",
															}}
															onClick={() => {
																router.push(
																	`/houses/${el.id}`
																);
															}}
														>
															{el.name}
														</p>
														<Avatar
															sx={{
																my: 1,
																fontSize:
																	"0.8rem",
																widht: "1em",
																zIndex: 10000,
																backgroundColor:
																	"#e2e2e2",
															}}
															onClick={() => {
																handleLike(
																	el.id
																);
															}}
														>
															{checkLiked(el.id) ? (
																<FavoriteIcon
																	sx={{
																		color: "#FF4646",
																	}}
																/>
															) : (
																<FavoriteBorderOutlinedIcon
																	sx={{
																		color: "gray",
																	}}
																/>
															)}
														</Avatar>
													</Box>
													<Box
														mt={1}
														p={0}
														onClick={() => {
															router.push(
																`/houses/${el.id}`
															);
														}}
													>
														<p
															style={{
																fontWeight:
																	"500",
																fontSize: "1em",
																margin: "0px",
															}}
														>
															{el.price +
																" " +
																el.currency}
															/mo&nbsp;&nbsp;
														</p>
														<p
															style={{
																fontWeight:
																	"300",
																fontSize:
																	"0.9em",
																margin: "0px",
															}}
														>
															Location:&nbsp;
															{el.city}
														</p>
														<p
															style={{
																fontWeight:
																	"300",
																fontSize:
																	"0.9em",
																margin: "0px",
															}}
														>
															Posted:&nbsp;
															{el.date}
														</p>
													</Box>
												</Box>
												<Divider sx={{my: 2}} />
												<Box
													display="flex"
													sx={{
														justifyContent:
															"space-around",
													}}
													onClick={() => {
														router.push(
															`/houses/${el.id}`
														);
													}}
												>
													<Box
														sx={{
															display: "flex",
															alignItems:
																"center",
															justifyContent:
																"center",
															r: 2,
														}}
													>
														<HotelIcon
															sx={{
																fontSize:
																	"1.2em",
																mb: 0.5,
																mr: 0.8,
																color: "#323232",
															}}
														/>
														<p
															style={{
																fontSize:
																	"0.9em",
															}}
														>
															{el.bedrooms} Beds
														</p>
													</Box>
													<Box
														sx={{
															display: "flex",
															alignItems:
																"center",
															justifyContent:
																"center",
															r: 2,
														}}
													>
														<BathtubIcon
															sx={{
																fontSize:
																	"1.2em",
																mb: 0.5,
																mr: 0.8,
																color: "#323232",
															}}
														/>
														<p
															style={{
																fontSize:
																	"0.9em",
															}}
														>
															{el.baths} Bath
														</p>
													</Box>
												</Box>
											</Box>
										</Grid>
									);
						  })
						: h1.map((el, pos) => (
								<Grid key={pos} item xs={12} md={3}>
									<Box
										sx={{
											backgroundColor: "#f6f6f6",
											overflow: "hidden",
											marginBottom: 1,
											paddingBottom: 2,
											borderWidth: "1px",
											"&:hover": {
												cursor: "pointer",
											},
										}}
									>
										<Skeleton
											variant="rectangular"
											width="100%"
											height="14em"
										/>
										<Box px={0.8} mt={2}>
											<Box
												sx={{
													display: "flex",
													justifyContent:
														"space-between",
													alignItems: "center",
												}}
											>
												<Skeleton
													width="80%"
													height={30}
													variant="text"
												/>
												<Skeleton
													variant="circular"
													width={40}
													height={40}
												/>
											</Box>
										</Box>
									</Box>
								</Grid>
						  ))}
				</Grid>
			</Box>
			{showAuthForm && (
				<AuthPopup
					hideForm={() => {
						setShowAuthForm(false);
					}}
					authenticate={handleAuthenticate}
				/>
			)}
		</>
	);
}

function Search({panTo}) {
	const router = useRouter();
	const {
		ready,
		value,
		suggestions: {status, data},
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: {lat: () => 43.6532, lng: () => -79.3832},
			radius: 100 * 1000,
		},
	});

	const handleInput = (e) => {
		setValue(e.target.value);
		console.log(data);
	};

	const handleSelect = async (address) => {
		console.log(address);
		setValue(address, false);
		clearSuggestions();

		try {
			const results = await getGeocode({address});
			const {lat, lng} = await getLatLng(results[0]);
			router.push({
				pathname: "/mapview",
				query: {lng, lat},
			});
		} catch (error) {
			console.log("😱 Error: ", error);
		}
	};

	return (
		<Grid sm={12} sx={{display: "flex", flexDirection: "column"}}>
			<Grid>
				<InputBase
					sx={{ml: 1, width: "40vw"}}
					placeholder="Search for a location"
					value={value}
					onChange={handleInput}
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					}
					endAdornment={
						<InputAdornment position="start">
							<IconButton onClick={()=>{router.push('/mapview')}}>
								<LocationOnIcon/>
							</IconButton>
						</InputAdornment>
					}
				/>
			</Grid>
			<Grid>
				{data.length != 0 && (
					<List
						sx={{
							position: "absolute",
							marginLeft: 3,
							mt: 1,
							width: "32em",
							bgcolor: "background.paper",
							zIndex: 100,
						}}
					>
						{data.map(({id, description}, pos) => {
							if (pos < 3) {
								return (
									<ListItemButton
										onClick={() => {
											handleSelect(description);
										}}
									>
										<ListItemText primary={description} />
									</ListItemButton>
								);
							}
						})}
					</List>
				)}
			</Grid>
		</Grid>
	);
}
export async function getServerSideProps(context) {
	let houses = null;
	const fetchInitial = async () => {
		try {
			await axios
				.get("http://34.229.97.210:5000/api/v1/rooms/")
				.then(function (response) {
					houses = response.data;
				})
				.catch(function (error) {
					let message;
					if (error.response) {
						message = error.response.data.detail;
						console.error(error.message);
					}
					return {ok: false, message};
				});
		} catch (error) {
			console.error(error.message);
		}
	};

	await fetchInitial();
	return {
		props: {
			housesFetched: houses,
		}, // will be passed to the page component as props
	};
}
export default HomePage;

const styles = {
	btnSearch: {
		backgroundColor: "gray",
		color: "white",
		fontWeight: "medium",
		borderRadius: "0px",
		borderTopRightRadius: "8px",
		borderBottomRightRadius: "8px",
		fontFamily: "Poppins",
		width: "150px",
		"&:hover": {
			background: "#323232",
		},
	},
	btnFilter: {
		backgroundColor: "#EFEFEF",
		color: "#323232",
		fontWeight: "medium",
		borderRadius: "0px",
		borderTopLeftRadius: "8px",
		borderBottomLeftRadius: "8px",
		fontFamily: "Poppins",
		width: "150px",
		"&:hover": {
			background: "#323232",
			color: "#EFEFEF",
		},
	},
	btnMap: {
		backgroundColor: "gray",
		color: "white",
		fontWeight: "medium",
		borderRadius: "0px",
		borderTopRightRadius: "8px",
		borderBottomRightRadius: "8px",
		fontFamily: "Poppins",
		width: "150px",
		"&:hover": {
			background: "#323232",
		},
	},
};
