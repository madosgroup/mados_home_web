import React, {useState} from "react";
import {useRouter} from "next/router";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
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
import {houses} from "../../constants/data";
import {CardPropertyMap} from "../search";
import Navbar from "../../components/navbar";
import Head from "next/head";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const libraries = ["places"];

const mapContainerStyle = {
	position: "absolute",
	top: 0,
	zIndex: -1000,
	height: "100vh",
	width: "100vw",
};

const options = {
	disableDefaultUI: true,
	zoomControl: true,
};

export default function App() {
	const router = useRouter();
	const {lng, lat} = router.query;
	const [center, setCenter] = useState({
		lng: lng ? parseFloat(lng) : 43,
		lat: lat ? parseFloat(lat) : 20,
	});

	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
		libraries,
	});

	const [selectedProperty, setSelectedProperty] = React.useState(null);
	const [zoom, setZoom] = React.useState(5);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
		setTimeout(() => {
			mapRef.current.setZoom(10);
		}, 500);
	}, []);

	const panTo = React.useCallback(({lat, lng}) => {
		mapRef.current.panTo({lat, lng});
		mapRef.current.setZoom(10);
	}, []);

	if (loadError) return "Error";
	if (!isLoaded) return "Loading...";

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
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					py: 2,
					px: 10,
					backgroundColor: "#EFEFEF",
				}}
			>
				<Paper
					elevation={0}
					sx={{
						p: "0px 4px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "52%",
						height: [35, 45],
						backgroundColor: "white",
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
					<Search_ panTo={panTo} />
				</Paper>
			</Box>
			<div>
				<GoogleMap
					id="map"
					mapContainerStyle={mapContainerStyle}
					zoom={8}
					center={center}
					options={options}
					onLoad={onMapLoad}
					onClick={() => {
						setSelectedProperty(null);
					}}
				>
					{/* {parkData.features.map((park) => (
						<Marker
							key={park.properties.PARK_ID}
							position={{
								lat: park.geometry.coordinates[1],
								lng: park.geometry.coordinates[0],
							}}
							onClick={() => {
								setSelectedProperty(park);
							}}
							icon={{
								url: `/circle.svg`,
								scaledSize: new window.google.maps.Size(15, 15),
							}}
						/>
					))}

					{selectedProperty && (
						<InfoWindow
							onCloseClick={() => {
								setSelectedProperty(null);
							}}
							position={{
								lat: selectedProperty.geometry.coordinates[1],
								lng: selectedProperty.geometry.coordinates[0],
							}}
						>
							<div style={{margin: 0, padding: "0px"}}>
								<CardPropertyMap el={houses[0]} />
							</div>
						</InfoWindow>
					)} */}
				</GoogleMap>
			</div>
		</>
	);
}

export function Map_() {
	const libraries = ["places"];

	const mapContainerStyle = {
		width: "37vw",
		height: "85vh",
	};

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
	};
	const center = {
		lat: 45.4211,
		lng: -75.6903,
	};

	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
		libraries,
	});
	const [selectedProperty, setSelectedProperty] = React.useState(null);
	const [zoom, setZoom] = React.useState(5);

	useState(() => {
		setTimeout(() => {
			mapRef.current.setZoom(10);
		}, 500);
	}, []);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({lat, lng}) => {
		mapRef.current.panTo({lat, lng});
		mapRef.current.setZoom(10);
	}, []);

	if (loadError) return "Error";
	if (!isLoaded) return "Loading...";

	return (
		<div>
			<GoogleMap
				id="map"
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
				onLoad={onMapLoad}
				onClick={() => {
					setSelectedProperty(null);
				}}
			>
				{parkData.features.map((park) => (
					<Marker
						key={park.properties.PARK_ID}
						position={{
							lat: park.geometry.coordinates[1],
							lng: park.geometry.coordinates[0],
						}}
						onClick={() => {
							setSelectedProperty(park);
						}}
						icon={{
							url: `/circle.svg`,
							scaledSize: new window.google.maps.Size(20, 20),
						}}
					/>
				))}

				{selectedProperty && (
					<InfoWindow
						onCloseClick={() => {
							setSelectedProperty(null);
						}}
						position={{
							lat: selectedProperty.geometry.coordinates[1],
							lng: selectedProperty.geometry.coordinates[0],
						}}
					>
						<div style={{margin: 0, padding: "0px"}}>
							<CardPropertyMap el={houses[0]} />
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}

function Search({panTo}) {
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
	};

	const handleSelect = async (address) => {
		setValue(address, false);
		clearSuggestions();

		try {
			const results = await getGeocode({address});
			const {lat, lng} = await getLatLng(results[0]);
			panTo({lat, lng});
		} catch (error) {
			console.log("😱 Error: ", error);
		}
	};

	return (
		<div className="search">
			<Combobox onSelect={handleSelect} sx={{border: "1px solid black"}}>
				<ComboboxInput
					value={value}
					onChange={handleInput}
					disabled={!ready}
					placeholder={"Search the location"}
				/>
				<ComboboxPopover>
					<ComboboxList>
						{status === "OK" &&
							data.map(({id, description}) => (
								<ComboboxOption key={id} value={description} />
							))}
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</div>
	);
}

function Search_({panTo}) {

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
			panTo({lat, lng});
		} catch (error) {
			console.log("😱 Error: ", error);
		}
	};

	return (
		<Grid sx={{display: "flex", flexDirection: "column"}}>
			<Grid>
				<InputBase
					sx={{ml: 1, width: "45vw"}}
					placeholder="Search for a location, country, city..."
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
							width: "40em",
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
const styles = {
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
