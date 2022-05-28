import * as React from 'react';
import {Box, Grid, InputAdornment, Button,Paper,InputBase,Divider, Select, MenuItem} from "@mui/material";
import Navbar from "../components/navbar";
import Head from "next/head";
import {InputText} from "../components/input";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import theme from "../constants/theme";
import ImageCarousel from "../components/imageCarousel";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import MapView from "../components/map/map";
import { useRouter } from "next/router";
import {Map_} from './mapview/index'
import useWindowDimensions from '../hooks/screen-hook';
import {Context as MainContext} from '../context/MainContext';
import axios from "axios";

import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
  } from "@react-google-maps/api";


const Page = () => {
	///Map loading
	const libraries = ["places"];
	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: "AIzaSyCTDHQP-P0h6BPPv-ubbL-ybg8qezEQgjU",
		libraries,
	});
	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
	};
	
	//Load Houses
	const contextMain=React.useContext(MainContext);
	const [houses,setHouses]=React.useState(null);
	const [categories,setCategories]=React.useState([]);
	const [category,setCategory]=React.useState('none');

	const fetchHouses=async ()=>{
		const fetchInitial = async () => {
			try {
				await axios
					.get("http://34.229.97.210:5000/api/v1/rooms/")
					.then(function (response) {
						setHouses(response.data)
					})
					.catch(function (error) {
						let message;
						if (error.response) {
							message = error.response.data.detail;
							console.error(error.message);
						}
					});
				await axios
					.get("http://34.229.97.210:5000/api/v1/category/")
					.then(function (response) {
						/* setHouses(response.data) */
						setCategories(response.data)
					})
					.catch(function (error) {
						let message;
						if (error.response) {
							message = error.response.data.detail;
							console.error(error.message);
						}
					});
			} catch (error) {
				console.error(error.message);
			}
		};
		await fetchInitial();
	}

	const handleFilterCategory=async(e)=>{
		const tmp=e.target.value;
		console.log(tmp);
		if (tmp == "none") {
			await fetchHouses();
			return;
		}
		await axios('http://34.229.97.210:5000/api/v1/filtered_list/'+tmp)
		.then(response=>{
			setHouses(response.data)
		})
		.catch(err=>{
			console.error(err.response);
		})
	}
	
	React.useEffect(()=>{
		fetchHouses()
		if (!contextMain.state.houses) {
			
		}else{
	/* 	setHouse(contextMain.state.houses.find(el=>el.id==hid))
		setHousesFetched(contextMain.state.houses) */}
	},[])

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
			<Box sx={{height: "13vh"}}>
				<Navbar />
			</Box>
			<Box px={4} pt={1} sx={{minHeight: "82vh"}}>
				{/* 	<Grid display="flex" xs={5} mt={1} mb={3}>
					<Paper
						elevation={0}
						sx={{
							borderRadius: "10px",
							borderTopRightRadius: "0px",
							borderBottomRightRadius: "0px",
							p: "2px 4px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: 420,
							height: 45,
							backgroundColor: "#EFEFEF",
						}}
					>
						<InputBase
							sx={{ml: 1, flex: 1}}
							placeholder="Search for a location"
							startAdornment={
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							}
						/>
					</Paper>
					<Button sx={styles.btnSearch}>Search</Button>
				</Grid> */}
				<Grid sx={{display: "flex"}}>
					<Grid xs={7} mr={2}>
						<Grid
							display="flex"
							sx={{
								padding: 2,
								alignItem: "center",
								justifyContent: "space-between",
								backgroundColor: "#f6f6f6",
							}}
						>
							<span style={{display: "flex"}}>
								<p
									style={{
										fontSize: "1.1em",
										fontWeight: 500,
										color: "#323232",
									}}
								>
									Search by
								</p>
							</span>

							<div>
								<Select
									onChange={handleFilterCategory}
									autoWidth
									value={category}
									size='small'
								>
									<MenuItem value="none">
										<em style={{color:'grey'}}>Property Type</em>
									</MenuItem>
									{
										categories.map(el=>(
											<MenuItem value={el.name}>{el.name}</MenuItem>
										))
									}
								</Select>
							</div>
						</Grid>

						<Grid sx={{height: "75vh", overflowY: "scroll"}}>
							<p
								style={{
									fontSize: "0.9em",
									fontWeight: 500,
									color: "gray",
									marginTop: "10px",
								}}
							>
								{houses && 'Found '+ houses.length+' results'}
							</p>
							{houses &&
								houses.map((el, pos) => {
									return <div key={pos}>
										<CardProperty el={el} />
									</div>
								})}
						</Grid>
					</Grid>
					<Grid xs={5} sx={{maxWidth: "100%"}}>
						{isLoaded && <Map_ />}
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Page;

export const CardProperty = (props) => {
	const router=useRouter()
	const {el} = props;
	return (
		<Grid display="flex"  my={2}>
		<ImageCarousel images={el.image_url[1]} height="22vh" width="22vw" />
			<Grid
				xs={12}
				sx={{
					display: "flex",
					flexDirection: "column",
					pt: 1,
					px: 2,
					justifyContent: "space-between",
					backgroundColor: "#f6f6f6",
				}}
			>
				<Box sx={{alignItems: "center"}}>
					<p
						style={{
							fontWeight: "500",
							fontSize: "1.1em",
							marginRight: "15px",
						}}
					>
						FBU&nbsp;{el.price}/mo
					</p>
					<p
						style={{
							fontSize: "0.8em",
							marginRight: "15px",
							color: "#323232",
						}}
					>
						Property type:&nbsp;{el.room_type.name}
					</p>
				</Box>
				<Box sx={{}}>
					<p
						style={{
							fontWeight: "500",
							fontSize: "0.8em",
							marginRight: "15px",
							marginBottom: "3px",
						}}
					>
						{el.name}
					</p>
					<Grid sx={{display: "flex"}}>
						<Box
							sx={{
								display: "flex",
								r: 2,
								color: "#323232",
							}}
						>
							<HotelIcon
								sx={{
									fontSize: "0.8em",
									mb: 0.5,
									mr: 0.8,
								}}
							/>
							<p
								style={{
									fontSize: "0.6em",
								}}
							>
								{el.bedrooms} Beds
							</p>
						</Box>
						<Box
							sx={{
								ml: 3,
								display: "flex",
								r: 2,
								color: "#323232",
							}}
						>
							<BathtubIcon
								sx={{
									fontSize: "0.8em",
									mb: 0.5,
									mr: 0.8,
								}}
							/>
							<p
								style={{
									fontSize: "0.6em",
								}}
							>
								{el.baths} Bathrooms
							</p>
						</Box>
					</Grid>
				</Box>
				<Grid
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<p
						style={{
							fontSize: "0.7em",
						}}
					>
						Added on : {el.date}
					</p>
					<Button onClick={()=>{router.push('/houses/'+el.id)}} size="small" sx={styles.btn}>
						View
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

/* export const CardPropertyMap = (props) => {
	const router=useRouter()
	const {el} = props;
	return (
		<Grid display="flex" >
			<ImageCarousel images={el.image_url[1]} height="160px" width="300px" />
			<Grid
				xs={9}
				sx={{
					display: "flex",
					flexDirection: "column",
					pt: 1,
					px: 2,
					justifyContent: "space-between",
					backgroundColor: "#f6f6f6",
					cursor: "pointer",
				}}
			>
				<Box sx={{alignItems: "center"}}>
					<p
						style={{
							fontWeight: "500",
							fontSize: "1.2em",
							marginRight: "15px",
						}}
					>
						FBU&nbsp;{el.price}/mo
					</p>
					<p
						style={{
							fontSize: "1em",
							marginRight: "15px",
							color: "#323232",
						}}
					>
						Property type:&nbsp;{el.type}
					</p>
				</Box>
				<Box sx={{}}>
					<p
						style={{
							fontWeight: "500",
							fontSize: "1.1em",
							marginRight: "15px",
							marginBottom: "3px",
						}}
					>
						{el.name}
					</p>
					<Grid sx={{display: "flex"}}>
						<Box
							sx={{
								display: "flex",
								r: 2,
								color: "#323232",
							}}
						>
							<HotelIcon
								sx={{
									fontSize: "1.1em",
									mb: 0.5,
									mr: 0.8,
								}}
							/>
							<p
								style={{
									fontSize: "0.9em",
								}}
							>
								{el.bedrooms} Beds
							</p>
						</Box>
						<Box
							sx={{
								ml: 3,
								display: "flex",
								r: 2,
								color: "#323232",
							}}
						>
							<BathtubIcon
								sx={{
									fontSize: "1em",
									mb: 0.5,
									mr: 0.8,
								}}
							/>
							<p
								style={{
									fontSize: "0.9em",
								}}
							>
								{el.baths} Bathrooms
							</p>
						</Box>
					</Grid>
				</Box>
				<Grid
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<p
						style={{
							fontSize: "0.9em",
						}}
					>
						Added on Monday 3th,Feb 2022
					</p>
					<Button onClick={()=>{router.push('/house')}} size="small" sx={styles.btn}>
						View
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
 */

const styles = {
	btn: {
		backgroundColor: "#323232",
		color: "white",
		mb:1,
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
		width: "20%",
		"&:hover": {
			background: "#323232",
		},
	},
    btnSearch: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "medium",
		borderRadius: "0px",
		borderTopRightRadius: "8px",
		borderBottomRightRadius: "8px",
		fontFamily: "Poppins",
		width: "150px",
		"&:hover": {
			background: theme.color.primary_,
		},
	},
	btnOutlined: {
		backgroundColor: "white",
		border: `2px solid #323232`,
		borderWidth: 1,
		color: "#323232",
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
		ml: "20px",
	},
};
