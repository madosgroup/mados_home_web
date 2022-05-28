import {useState, useEffect,useContext} from "react";
import {useRouter} from "next/router";
import {Context as AuthContext} from '../../context/AuthContext';
import { useCookies } from "react-cookie";
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
	Tooltip
} from "@mui/material";
import {Logo} from "../../icons/logo";
import Navbar from "../../components/navbar";
import theme from "../../constants/theme";
//To refactor inputs
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {fontFamily} from "@mui/system";
import images from "../../constants/images";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import {Content_ as ImageCarousel} from "../../components/imageCarousel";
//
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import {tourism} from '../../constants/data';
import Footer from '../../components/Footer/Footer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import AuthPopup from "../../components/authentication/AuthPopup";
import axios from "axios";
import jwt from 'jsonwebtoken';

const imagesCut = [
	"https://www.sunlocation.com/img/articles/images/discoverawsomenessatthelouvre13.jpg",
	"https://www.tourmag.com/photo/art/grande/17438108-21931248.jpg?v=1507036517",
	"https://www.parissi.com/wp-content/uploads/2020/08/79c69dc989ade34801f5fb844f7efe84.jpe",
	"https://media.routard.com/image/55/8/reims-cathedrale.1493558.142.jpg",
];

const array=[0,0,0,0]
function HomePage() {
	const urlImage = "estate1.jpg";
	const router=useRouter();
	const {state,addToBooked,removeFromBooked}=useContext(AuthContext);
	const [cookies,setCookies]=useCookies()
	const [showAuthForm,setShowAuthForm]=useState(false);
	const [isMobile,setisMobile]=useState(false);

	const checkBooked=(id)=>{
		if (state.user) {
			if (
				state.booked.includes(id) 
			) {
				return true
			}
		}
		return false;
	}
	const handleBook = async (id) => {
		/* if (cookies.user && cookies.user != "undefined") {
			if (!state.favorites.includes(id)) {
				addToFavorites(id);
			} else {
				removeFromFavorites(id);
			}
		} else {
			setShowAuthForm(true);
		} */
		if (cookies.user && cookies.user != "undefined") {
			if (!state.booked.includes(id)) {
				addToBooked(id);
			} else {
				removeFromBooked(id);
			}
		} else {
			setShowAuthForm(true);
		}
	};

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
	useEffect(() => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			// some code..
			setisMobile(true)
		}
	}, []);

	const book=(id)=>{
			
	}
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
			<Navbar />
			{/* <Box sx={{textAlign: "center"}}>
				<Image
					src={HeaderBanner}
					width={870}
					height={400}
					placeholder="blur"
					priority
				/>
			</Box> */}
			<Grid mx={8}>
				<h1
					style={{
						marginTop: "100",
						textAlign: "left",
						fontWeight: 600,
						marginBottom: 1,
					}}
				>
					Tourism
				</h1>

				<Grid display="flex" mb={5} mt={3}>
					{tourism.map((el) => (
						<Grid
							key={el.id}
							xs={2.3}
							mr={3}
							sx={{
								backgroundImage: `url(${el.Photo})`,
								height: "40vh",
								backgroundSize: "cover",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								p: 1,
								"&:hover": {
									opacity: 0.8,
								},
							}}
						>
							<Grid
								sx={{display: "flex", justifyContent: "right"}}
							>
								<Tooltip title="Save for later">
									<Avatar
										sx={{
											my: 1,
											fontSize: "0.8rem",
											widht: "1em",
											zIndex: 10000,
											backgroundColor: "#EFEFEF",
											cursor: "pointer",
										}}
										onClick={() => {
											handleBook(el.id);
										}}
									>
										{checkBooked(el.id) ? (
											<BookmarkIcon
												sx={{
													color: theme.color.primary,
												}}
											/>
										) : (
											<BookmarkIcon
												sx={{color: "#323232"}}
											/>
										)}
									</Avatar>
								</Tooltip>
							</Grid>
							<p
								style={{
									fontSize: "1.5rem",
									color: "white",
									fontWeight: 700,
									cursor: "pointer",
								}}
								onClick={() => {
									router.push("/tourism/" + el.id);
								}}
							>
								{el.name}
							</p>
						</Grid>
					))}
				</Grid>
			</Grid>

			<Box mx={8} sx={{mt: 10}}>
				<h3
					style={{
						marginTop: "100",
						textAlign: "left",
						fontWeight: 500,
						marginBottom: "2vh",
						marginTop: 10,
						color: "#323232",
					}}
				>
					Best places
				</h3>
				<Grid container display="flex" mb={5} spacing={4}>
					{tourism.map((el, pos) => {
						return (
							<Grid key={pos} item xs={12} md={3}>
								<Box
									sx={{
										backgroundColor: "#f6f6f6",
										overflow: "hidden",
										marginBottom: 2,
										paddingBottom: 2,
										borderWidth: "1px",
										"&:hover": {
											cursor: "pointer",
										},
									}}
								>
									<Link href={"/tourism/" + el.id}>
										<ImageCarousel
											label={true}
											width="100%"
											height="35vh"
											image={el.Photo}
										/>
									</Link>

									<Box
										px={0}
									>
										<Box
											display="flex"
											mt={1}
											sx={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<Box
											onClick={() => {
											router.push("/tourism/" + el.id);
										}}>
												<p
													style={{
														fontWeight: "500",
														fontSize: "1em",
													}}
												>
													{el.name}
												</p>
												<p
													style={{
														fontWeight: "300",
														fontSize: "0.9em",
													}}
												>
													City,Country
												</p>
												<p>
													<StarIcon
														sx={{color: "#FFC300"}}
													/>
													<StarIcon
														sx={{color: "#FFC300"}}
													/>
													<StarIcon
														sx={{color: "#FFC300"}}
													/>
													<StarIcon
														sx={{color: "#FFC300"}}
													/>
												</p>
											</Box>
											<Avatar
												sx={{
													my: 1,
													fontSize: "0.8rem",
													widht: "1em",
													zIndex: 10000,
													backgroundColor: "#EFEFEF",
												}}
												onClick={() => {
													handleBook(el.id);
												}}
											>
												{checkBooked(el.id) ? (
													<BookmarkIcon
														sx={{
															color: theme.color
																.primary,
														}}
													/>
												) : (
													<BookmarkIcon
														sx={{color: "#323232"}}
													/>
												)}
											</Avatar>
										</Box>
									</Box>
								</Box>
							</Grid>
						);
					})}
				</Grid>
				{showAuthForm && (
					<AuthPopup
						hideForm={() => {
							setShowAuthForm(false);
						}}
						authenticate={handleAuthenticate}
					/>
				)}
			</Box>
		</>
	);
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
			background: '#323232',
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