import React, {Component} from "react";
import {
	Map,
	GoogleApiWrapper,
	Marker,
	InfoWindow,
	Polyline,
} from "google-maps-react";
import {
	Box,
	Button,
	Grid,
	Paper,
	InputAdornment,
	InputBase,
	Divider,
    Typography
} from "@mui/material";
import {useState, useContext, useEffect} from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationDisabledIcon from "@mui/icons-material/LocationDisabled";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../constants/theme";
const mapStyles = {
	width: "100%",
	height: "100%",
};

const containerStyle = {
	position: "relative",
	width: "100%",
	height: "520px",
};

export function MapContainer(props) {
	return (
		<Box sx={{textAlign: "center"}}>
			<Map
				containerStyle={containerStyle}
				google={props.google}
				style={mapStyles}
				zoom={10}
				initialCenter={{
					lat: -3.38227,
					lng: 29.363581,
				}}
			>
            </Map>
		</Box>
	);
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyCTDHQP-P0h6BPPv-ubbL-ybg8qezEQgjU",
})(MapContainer);

const styles = {
	btnSearch: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "bold",
		borderRadius: "0px",
		borderTopRightRadius: "8px",
		borderBottomRightRadius: "8px",
		width: "150px",
		"&:hover": {
			background: theme.color.primary_,
		},
	},
};
