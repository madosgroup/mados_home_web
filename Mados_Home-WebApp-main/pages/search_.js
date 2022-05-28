import * as React from 'react';
import {
	Box,
	Grid,
	InputAdornment,
	Button,
	Paper,
	InputBase,
	Divider,
	Select,
	MenuItem,
	List,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	IconButton,
	FormControlLabel,
	FormGroup,
	Checkbox,
	Avatar,
	CircularProgress
} from "@mui/material";
import Navbar from "../components/navbar";
import Head from "next/head";
import {InputText} from "../components/input";
import SearchIcon from "@mui/icons-material/Search";
import KingBedIcon from '@mui/icons-material/KingBed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import theme from "../constants/theme";
import ImageCarousel from "../components/imageCarousel";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CropFreeIcon from '@mui/icons-material/CropFree';
import StraightenIcon from '@mui/icons-material/Straighten';
import MapView from "../components/map/map";
import { useRouter } from "next/router";
import {Map_} from './mapview/index'
import useWindowDimensions from '../hooks/screen-hook';
import {Context as MainContext} from '../context/MainContext';
import AuthPopup from "../components/authentication/AuthPopup";
import axios from "axios";
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
import { SetMealRounded, SingleBed } from '@mui/icons-material';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Context as AuthContext} from "../context/AuthContext";
import {useCookies} from "react-cookie";
import jwt from "jsonwebtoken";

const pricing=[
	500000,
	1000000,
	2000000,
	5000000,
	10000000
]
const bedrooms=[
	1,
	2,
	3,
	5,
	10,
	15,
	20,
]

const bathrooms=[
	1,
	3,
	5,
	10
]

const garage=[
	1,
	2,
	3,
	4,
	5
]

const size=[
	100,
	150,
	200,
	250,
	300,
	350,
	400,
	450,
	500
]

const rentalTerm=[
	{item:"Daily",value:"daily"},
	{item:"Weekly",value:"weekly"},
	{item:"Monthly",value:"monthly"},
	{item:"Yearly",value:"yearly"},
]

var months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];


const getNextMonths=()=>{
	const d = new Date();
	let month = d.getMonth();
	
	const tmp=[{
		item:"Now",value:months[month]
	}]
	for(let i=1;i<4;i++){
		tmp.push({
			item:months[month+i],value:months[month+i]
		})
	}
	return tmp
}



const Page = () => {
	const router=useRouter();
	const {pt}=router.query;

	//To see more filters
	const [more,setMore]=React.useState(false)
	const [typeGet,setTypeGet]=React.useState("sale")
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
	const contextMain = React.useContext(MainContext);
	const [houses, setHouses] = React.useState(null);
	const [categories, setCategories] = React.useState([]);
	const [category, setCategory] = React.useState("");
	const [isLoading,setIsLoading]=React.useState(false);
	const [price,setPrice]=React.useState(false);

	const fetchHouses = async () => {
		setIsLoading(true)
		const fetchInitial = async () => {
			try {
				await axios
					.get("http://34.229.97.210:5000/api/v1/rooms/")
					.then(function (response) {
						setHouses(response.data);
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
						setCategories(response.data);
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
		setIsLoading(false)
	};

	const handleFilterCategory = async (e) => {
		setIsLoading(true)
		const tmp = e;
		if (tmp == "none") {
			await fetchHouses();
			return;
		}
		await axios("http://34.229.97.210:5000/api/v1/filtered_list/" + tmp)
			.then((response) => {
				setHouses(response.data);
			})
			.catch((err) => {
				console.error(err.response);
			});
		setIsLoading(false)

	};
	
	const fetchCategories=async()=>{
		await axios('http://34.229.97.210:5000/api/v1/category')
		.then(response=>{
			setCategories(response.data)
		})
		.catch(err=>{
			console.error(err.response);
		})
	}

	React.useEffect(() => {
		if (pt) {
			handleFilterCategory(pt)
		}else{
		fetchHouses();
		fetchCategories();
		if (!contextMain.state.houses) {
		} 
	}
	}, []);

	React.useEffect(()=>{
		if (pt) {
			handleFilterCategory(pt)
		}
	},[pt])

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
			<Grid
				container
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					px: 10,
					pt: 3,
					pb: 1,
					backgroundColor: "#F7F7F7",
				}}
			>
				<Grid
					item
					lg={8}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "left",
					}}
				>
					<Select
						autoWidth
						value={typeGet}
						size="small"
						onChange={(e) => {
							setTypeGet(e.target.value);
						}}
						sx={{
							mx: "0.2em",
							".MuiSelect-select": {
								py: "0.65em",
								borderRadius: "0px",
								mx: "0.1em",
							},
						}}
					>
						<MenuItem value={"rent"}>
							<p
								style={{
									color: "grey",
									fontSize: "0.9em",
								}}
							>
								For Rent
							</p>
						</MenuItem>
						<MenuItem value={"sale"}>
							<p
								style={{
									color: "grey",
									fontSize: "0.9em",
								}}
							>
								For Sale
							</p>
						</MenuItem>
					</Select>
					<Grid>
						<Paper
							elevation={0}
							sx={{
								p: "0px 4px",
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
							<Search />
						</Paper>
					</Grid>
					<Button
						sx={{
							mx: "0em",
							backgroundColor: theme.color.primary,
							py: "0.7em",
							borderRadius: 0,
							boxShadow: 0,
							"&:hover": {
								backgroundColor: theme.color.primary_,
							},
						}}
						variant="contained"
					>
						Search
					</Button>
				</Grid>
				<Grid
					item
					lg={8}
					sx={{
						mt: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "left",
					}}
				>
					<Grid>
						<p style={{fontSize: "0.8em", color: "#323232"}}>
							Property Type
						</p>
						<Select
							autoWidth
							value={"none"}
							size="small"
							onChange={(el) => {
								if (el.target.value != "none") {
									handleFilterCategory(el.target.value);
								} else {
									fetchHouses();
								}
							}}
							sx={{
								mt: "0.2em",
								".MuiSelect-select": {
									py: "0.4em",
									maxWidth: "6em",
									width: "6em",
									borderRadius: "0px",
									mx: "0.1em",
								},
							}}
						>
							<MenuItem value="none">
								<p style={{color: "grey", fontSize: "0.9em"}}>
									Any
								</p>
							</MenuItem>
							{categories &&
								categories.map((el) => (
									<MenuItem value={el.name}>
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
											}}
										>
											{el.name}
										</p>
									</MenuItem>
								))}
						</Select>
					</Grid>
					<Grid sx={{ml: "1.2em"}}>
						<p style={{fontSize: "0.8em", color: "#323232"}}>
							Min Price
						</p>
						<Select
							autoWidth
							value={"none"}
							size="small"
							sx={{
								mt: "0.2em",
								".MuiSelect-select": {
									py: "0.4em",
									maxWidth: "6em",
									width: "6em",
									borderRadius: "0px",
									mx: "0.1em",
								},
							}}
						>
							<MenuItem value="none">
								<p style={{color: "grey", fontSize: "0.9em"}}>
									Any
								</p>
							</MenuItem>
							{pricing.map((el) => (
								<MenuItem value={el}>
									<p
										style={{
											color: "grey",
											fontSize: "0.9em",
										}}
									>
										{el}+
									</p>
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid sx={{ml: "1.2em"}}>
						<p style={{fontSize: "0.8em", color: "#323232"}}>
							Max Price
						</p>
						<Select
							autoWidth
							value={"none"}
							size="small"
							sx={{
								mt: "0.2em",
								".MuiSelect-select": {
									py: "0.4em",
									maxWidth: "6em",
									width: "6em",
									borderRadius: "0px",
									mx: "0.1em",
								},
							}}
						>
							<MenuItem value="none">
								<p style={{color: "grey", fontSize: "0.9em"}}>
									Any
								</p>
							</MenuItem>
							{pricing.map((el) => (
								<MenuItem value={el}>
									<p
										style={{
											color: "grey",
											fontSize: "0.9em",
										}}
									>
										{el}+
									</p>
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid sx={{ml: "1.2em"}}>
						<p style={{fontSize: "0.8em", color: "#323232"}}>
							Bedrooms
						</p>
						<Select
							size="small"
							sx={{
								mt: "0.2em",
								".MuiSelect-select": {
									py: "0.4em",
									maxWidth: "4.5em",
									width: "4.5em",
									borderRadius: "0px",
									mx: "0.1em",
								},
							}}
							value={"none"}
							startAdornment={
								<KingBedIcon
									sx={{color: theme.color.primary}}
								/>
							}
						>
							<MenuItem value="none">
								<p
									style={{
										color: "grey",
										fontSize: "0.9em",
										paddingLeft: "50%",
									}}
								>
									Any
								</p>
							</MenuItem>
							{bedrooms.map((el) => (
								<MenuItem value={el}>
									<p
										style={{
											color: "grey",
											fontSize: "0.9em",
											paddingLeft: "50%",
										}}
									>
										{el}+
									</p>
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid sx={{ml: "1.2em", alignItems: "center", pb: 0.8}}>
						<p> &nbsp;</p>
						<Button
							size="small"
							sx={{
								backgroundColor: theme.color.primary,
								color: "white",
								borderRadius: 0,
								"&:hover": {
									backgroundColor: theme.color.primary_,
								},
							}}
							endIcon={more ? <p>-</p> : <p>+</p>}
							onClick={() => {
								setMore(!more);
							}}
						>
							{more ? "Less Filters" : "More Filters"}
						</Button>
					</Grid>
				</Grid>
				{more && (
					<>
					<Grid
							item
							lg={8}
							sx={{
								mt: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "left",
							}}
						>
							<Grid>
								<p
									style={{
										fontSize: "0.8em",
										color: "#323232",
									}}
								>
									Floor size
								</p>
								<Select
									size="small"
									sx={{
										mt: "0.2em",
										".MuiSelect-select": {
											py: "0.4em",
											width: "6em",
											maxWidth: "6em",
											borderRadius: "0px",
											mx: "0.1em",
										},
									}}
									value={"none"}
								>
									<MenuItem value="none">
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
											}}
										>
											Min Size
										</p>
									</MenuItem>
									{size.map((el) => (
										<MenuItem value={el}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												{el}+
											</p>
										</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid sx={{ml: "1.2em"}}>
								<p
									style={{
										fontSize: "0.8em",
										color: "#323232",
									}}
								>
									&nbsp;
								</p>
								<Select
									size="small"
									sx={{
										mt: "0.2em",
										".MuiSelect-select": {
											py: "0.4em",
											width: "6em",
											maxWidth: "6em",
											borderRadius: "0px",
											mx: "0.1em",
										},
									}}
									value={"none"}
								>
									<MenuItem value="none">
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
											}}
										>
											Max Size
										</p>
									</MenuItem>
									{size.map((el) => (
										<MenuItem value={el}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												{el}+
											</p>
										</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid sx={{ml: "1.2em"}}>
								<p
									style={{
										fontSize: "0.8em",
										color: "#323232",
									}}
								>
									Erf Size
								</p>
								<Select
									size="small"
									sx={{
										mt: "0.2em",
										".MuiSelect-select": {
											py: "0.4em",
											width: "6em",
											maxWidth: "6em",
											borderRadius: "0px",
											mx: "0.1em",
										},
									}}
									value={"none"}
								>
									<MenuItem value="none">
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
											}}
										>
											Min Size
										</p>
									</MenuItem>
									{size.map((el) => (
										<MenuItem value={el}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												{el}+
											</p>
										</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid sx={{ml: "1.2em"}}>
								<p
									style={{
										fontSize: "0.8em",
										color: "#323232",
									}}
								>
									&nbsp;
								</p>
								<Select
									size="small"
									sx={{
										mt: "0.2em",
										".MuiSelect-select": {
											py: "0.4em",
											width: "6em",
											maxWidth: "6em",
											borderRadius: "0px",
											mx: "0.1em",
										},
									}}
									value={"none"}
								>
									<MenuItem value="none">
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
											}}
										>
											Max Size
										</p>
									</MenuItem>
									{size.map((el) => (
										<MenuItem value={el}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												{el}+
											</p>
										</MenuItem>
									))}
								</Select>
							</Grid>
							
						</Grid>
						<Grid
							item
							lg={8}
							sx={{
								mt: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "left",
							}}
						>
							<Grid>
								<p
									style={{
										fontSize: "0.8em",
										color: "#323232",
									}}
								>
									Bathrooms
								</p>
								<Select
									size="small"
									sx={{
										mt: "0.2em",
										".MuiSelect-select": {
											py: "0.4em",
											width: "4.5em",
											maxWidth: "4.5em",
											borderRadius: "0px",
											mx: "0.1em",
										},
									}}
									value={"none"}
									startAdornment={
										<BathtubIcon
											sx={{color: theme.color.primary}}
										/>
									}
								>
									<MenuItem value="none">
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
												paddingLeft: "50%",
											}}
										>
											Any
										</p>
									</MenuItem>
									{bathrooms.map((el) => (
										<MenuItem value={el}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												{el}+
											</p>
										</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid sx={{ml: "1.2em"}}>
								<p
									style={{
										fontSize: "0.8em",
										color: "#323232",
									}}
								>
									Parking
								</p>
								<Select
									size="small"
									sx={{
										mt: "0.2em",
										".MuiSelect-select": {
											py: "0.4em",
											width: "4.5em",
											maxWidth: "4.5em",
											borderRadius: "0px",
											mx: "0.1em",
										},
									}}
									value={"none"}
									startAdornment={
										<DirectionsCarIcon
											sx={{color: theme.color.primary}}
										/>
									}
								>
									<MenuItem value="none">
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
												paddingLeft: "50%",
											}}
										>
											Any
										</p>
									</MenuItem>
									{garage.map((el) => (
										<MenuItem value={el}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												{el}+
											</p>
										</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid sx={{ml: "1.2em"}}>
								<p
									style={{
										fontSize: "0.8em",
										color: "#323232",
									}}
								>
									Garage
								</p>
								<Select
									size="small"
									sx={{
										mt: "0.2em",
										".MuiSelect-select": {
											py: "0.4em",
											width: "4.5em",
											maxWidth: "4.5em",
											borderRadius: "0px",
											mx: "0.1em",
										},
									}}
									value={"none"}
									startAdornment={
										<DirectionsCarIcon
											sx={{color: theme.color.primary}}
										/>
									}
								>
									<MenuItem value="none">
										<p
											style={{
												color: "grey",
												fontSize: "0.9em",
												paddingLeft: "50%",
											}}
										>
											Any
										</p>
									</MenuItem>
									{garage.map((el) => (
										<MenuItem value={el}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												{el}+
											</p>
										</MenuItem>
									))}
								</Select>
							</Grid>
						</Grid>
						
						{typeGet === "rent" && (
							<Grid
								item
								lg={8}
								sx={{
									mt: 1,
									display: "flex",
									alignItems: "center",
									justifyContent: "left",
								}}
							>
								<Grid>
									<p
										style={{
											fontSize: "0.8em",
											color: "#323232",
										}}
									>
										Furnished
									</p>
									<Select
										size="small"
										sx={{
											mt: "0.2em",
											".MuiSelect-select": {
												py: "0.4em",
												width: "5em",
												borderRadius: "0px",
												mx: "0.1em",
											},
										}}
										value={"none"}
										startAdornment={
											<EventSeatIcon
												sx={{
													color: theme.color.primary,
												}}
											/>
										}
									>
										<MenuItem value="none">
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												Any
											</p>
										</MenuItem>
										<MenuItem value={true}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												Yes
											</p>
										</MenuItem>
										<MenuItem value={false}>
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												No
											</p>
										</MenuItem>
									</Select>
								</Grid>
								<Grid sx={{ml: "1.2em"}}>
									<p
										style={{
											fontSize: "0.8em",
											color: "#323232",
										}}
									>
										Availability
									</p>
									<Select
										size="small"
										sx={{
											mt: "0.2em",
											".MuiSelect-select": {
												py: "0.4em",
												width: "5em",
												borderRadius: "0px",
												mx: "0.1em",
											},
										}}
										value={"none"}
									>
										<MenuItem value="none">
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Any
											</p>
										</MenuItem>
										{getNextMonths().map((el) => (
											<MenuItem value={el.value}>
												<p
													style={{
														color: "grey",
														fontSize: "0.9em",
													}}
												>
													{el.item}
												</p>
											</MenuItem>
										))}
									</Select>
								</Grid>
								<Grid sx={{ml: "1.2em"}}>
									<p
										style={{
											fontSize: "0.8em",
											color: "#323232",
										}}
									>
										Rental Term
									</p>
									<Select
										size="small"
										sx={{
											mt: "0.2em",
											".MuiSelect-select": {
												py: "0.4em",
												width: "5em",
												borderRadius: "0px",
												mx: "0.1em",
											},
										}}
										value={"none"}
									>
										<MenuItem value="none">
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Any
											</p>
										</MenuItem>
										{rentalTerm.map((el) => (
											<MenuItem value={el.value}>
												<p
													style={{
														color: "grey",
														fontSize: "0.9em",
													}}
												>
													{el.item}
												</p>
											</MenuItem>
										))}
									</Select>
								</Grid>
								<Grid sx={{ml: "1.2em"}}>
									<p
										style={{
											fontSize: "0.8em",
											color: "#323232",
										}}
									>
										Erf Size (m<sup>2</sup>)
									</p>
									<Select
										size="small"
										sx={{
											mt: "0.2em",
											".MuiSelect-select": {
												py: "0.4em",
												width: "5em",
												borderRadius: "0px",
												mx: "0.1em",
											},
										}}
										value={"none"}
										startAdornment={
											<CropFreeIcon
												sx={{
													color: theme.color.primary,
												}}
											/>
										}
									>
										<MenuItem value="none">
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
													paddingLeft: "50%",
												}}
											>
												Any
											</p>
										</MenuItem>
									</Select>
								</Grid>
							</Grid>
						)}
						<Grid
							item
							lg={8}
							sx={{
								mt: 1,
								display: "flex",
								justifyContent: "left",
								flexDirection: "column",
							}}
						>
							<p
								style={{
									fontSize: "0.9em",
									fontWeight: 600,
									color: "#323232",
								}}
							>
								Features
							</p>
							<Grid
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<FormGroup>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox sx={{color: "grey"}} />
										}
										label={
											<p style={{color: "grey"}}>Sauna</p>
										}
									/>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Laundry
											</p>
										}
									/>
								</FormGroup>
								<FormGroup sx={{ml: 0}}>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox sx={{color: "grey"}} />
										}
										label={
											<p style={{color: "grey"}}>
												Garden
											</p>
										}
									/>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Kitchen
											</p>
										}
									/>
								</FormGroup>
								<FormGroup sx={{ml: 0}}>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Gym
											</p>
										}
									/>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Swimming pool
											</p>
										}
									/>
								</FormGroup>
								<FormGroup sx={{ml: 0}}>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Heater
											</p>
										}
									/>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Jacuzy
											</p>
										}
									/>
								</FormGroup>
								<FormGroup sx={{ml: 0}}>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Store room
											</p>
										}
									/>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Air condition
											</p>
										}
									/>
								</FormGroup>
								<FormGroup sx={{ml: 0}}>
									<FormControlLabel
										sx={{
											".MuiFormControlLabel-label": {
												color: "grey",
											},
										}}
										control={
											<Checkbox
												sx={{
													color: "grey",
													fontSize: "0.8em",
												}}
											/>
										}
										label={
											<p
												style={{
													color: "grey",
													fontSize: "0.9em",
												}}
											>
												Pet friendly
											</p>
										}
									/>
								</FormGroup>
							</Grid>
						</Grid>
					</>
				)}
			</Grid>
			{!isLoading ? (
				<Grid sx={{px: 35}}>
					<p
						style={{
							fontSize: "0.9em",
							fontWeight: 500,
							color: "gray",
							marginTop: "10px",
							color: theme.color.primary,
						}}
					>
						{houses && "Found " + houses.length + " results"}
					</p>
					{houses &&
						houses.map((el, pos) => {
							return (
								<div key={pos}>
									<CardProperty el={el} />
								</div>
							);
						})}
				</Grid>
			) : (
				<Grid sx={{textAlign: "center", mt: 6}}>
					<CircularProgress sx={{color: theme.color.primary}} />
				</Grid>
			)}
		</>
	);
};

export default Page;

export const CardProperty = (props) => {
	const router = useRouter();
	const {el} = props;
	const {state, addToFavorites, removeFromFavorites} =React.useContext(AuthContext);
	const [cookies, setCookie, removeCookie] = useCookies();
	const [showAuthForm,setShowAuthForm]=React.useState(false);

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
	
	const checkLiked=(id)=>{
		if (state.user) {
			if (
				state.favorites.includes(id) ||
				state.user.like.includes(id)
			) {
				return true
			}
		}
		return false;
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
		const tmp = "";
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
		}
	};
	return (
		<Grid display="flex" my={2} sx={{boxShadow:'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px'}}>
			<ImageCarousel
				images={el.image_url[1]}
				height="35vh"
				width="50vw"
			/>
			<Grid
				xs={12}
				sx={{
					display: "flex",
					flexDirection: "column",
					pt: 1,
					px: 2,
					backgroundColor: "#f6f6f6",
					cursor: "pointer",
				}}
			>
				<Box
					sx={{alignItems: "center"}}
					onClick={() => {
						router.push("/houses/" + el.id);
					}}
				>
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
							fontSize: "0.8em",
							marginRight: "15px",
							color: "#323232",
							marginTop: "0.1em",
						}}
					>
						Property type:&nbsp;{el.room_type.name}
					</p>
				</Box>
				<Box>
					<p
						style={{
							fontWeight: "500",
							fontSize: "0.8em",
							marginRight: "15px",
						}}
						onClick={() => {
							router.push("/houses/" + el.id);
						}}
					>
						{el.name}
					</p>
					<Grid
						sx={{display: "flex"}}
						onClick={() => {
							router.push("/houses/" + el.id);
						}}
					>
						<Box
							sx={{
								display: "flex",
								r: 2,
								color: "#323232",
							}}
						>
							<HotelIcon
								sx={{
									fontSize: "1.2em",
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
									fontSize: "1.2em",
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
					<p
						style={{
							marginTop: "0.3em",
							fontSize: "0.8em",
							marginRight: "15px",
							color: "grey",
						}}
						onClick={() => {
							router.push("/houses/" + el.id);
						}}
					>
						Description : Lorem ipsum, or lipsum as it is sometimes
						known, is dummy text used in laying out print, graphic
						or web designs...
					</p>
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
						onClick={() => {
							router.push("/houses/" + el.id);
						}}
					>
						Added on : {el.date}
					</p>
					<Avatar
						sx={{
							fontSize: "0.8rem",
							widht: "1em",
							zIndex: 10000,
							backgroundColor: "#e2e2e2",
						}}
						onClick={() => {
							handleLike(el.id);
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
				</Grid>
			</Grid>
			{showAuthForm && (
				<AuthPopup
					hideForm={() => {
						setShowAuthForm(false);
					}}
					authenticate={handleAuthenticate}
				/>
			)}
		</Grid>
	);
};

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
		<Grid sx={{display: "flex", flexDirection: "column"}}>
			<Grid>
				<InputBase
					sx={{ml: 1, width: "35vw"}}
					placeholder="Search for a location"
					value={value}
					onChange={handleInput}
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon />
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
