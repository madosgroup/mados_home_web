import {useState} from "react";
import {Box, Grid, Typography, Button, Card, IconButton} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {houses} from "../constants/data";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {ForkLeft} from "@mui/icons-material";
import theme from "../constants/theme";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Content = (props) => {
	const {width, height,spaceArrows,images,label} = props;
	const [index, setIndex] = useState(0);
	const [isHover, setIsHover] = useState(false);

	const showNext = () => {
		if (index === images.length - 1) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
	};

	const showPreview = () => {
		if (index === 0) {
			setIndex(images.length - 1);
		} else {
			setIndex(index - 1);
		}
	};
	/* const url_real=`url(${process.env.NEXT_PUBLIC_BASE_URL_SERVER+"/cdn/"+images[index][0]})` */
	/*  `url(${images[index][0]})` */
	return (
		<Box
			sx={{
				position: "relative",
				backgroundImage:images[index][0]&& `url(${"http://34.229.97.210:5000"+"/cdn/"+images[index][0]})`,
				width: `${width}`,
				backgroundSize:'cover',
				backgroundRepeat: "no-repeat",
				height: height,
				cursor:'auto'
			}}
		>
			<Box
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
				onClick={showNext}
				sx={{
					height: "100%",
					width: spaceArrows ?`${spaceArrows}`:"30%",
					float: "left",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
				}}
			>
				{isHover && (
					<ArrowBackIosIcon
						sx={{
							fontSize: "2.5rem",
							fontWeight: "bold",
							color: "white",
						}}
					/>
				)}
				<Box
					sx={{
						position: "absolute",
						top: "15px",
						width: "20%",
						backgroundColor: theme.color.primary,
					}}
				>
					{label &&
						<Typography
						sx={{
							fontSize: "0.85em",
							fontWeight: 500,
							textAlign: "center",
							color: "white",
							fontFamily: "poppins",
						}}
					>
						New
					</Typography>
					}
				</Box>
			</Box>

			<Box
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
				onClick={showNext}
				sx={{
					height: "100%",
					width: "30%",
					float: "right",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
				}}
			>
				{isHover && (
					<ArrowForwardIosIcon
						sx={{
							fontSize: "2.5rem",
							fontWeight: "bold",
							color: "white",
						}}
					/>
				)}
			</Box>
		</Box>
	);
};

export const Content_ = (props) => {
	const {width, height,spaceArrows,image,label} = props;
	const [index, setIndex] = useState(0);
	const [isHover, setIsHover] = useState(false);

	const showNext = () => {
		/* if (index === images.length - 1) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		} */
	};

	const showPreview = () => {
	/* 	if (index === 0) {
			setIndex(images.length - 1);
		} else {
			setIndex(index - 1);
		} */
	};
	/* const url_real=`url(${process.env.NEXT_PUBLIC_BASE_URL_SERVER+"/cdn/"+images[index][0]})` */
	/*  `url(${images[index][0]})` */
	return (
		<Box
			sx={{
				position: "relative",
				backgroundImage:`url(${image})`,
				width: `${width}`,
				backgroundSize:'cover',
				backgroundRepeat: "no-repeat",
				height: height,
				cursor:'auto'
			}}
		>
			<Box
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
				onClick={showNext}
				sx={{
					height: "100%",
					width: spaceArrows ?`${spaceArrows}`:"30%",
					float: "left",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
				}}
			>
				{isHover && (
					<ArrowBackIosIcon
						sx={{
							fontSize: "2.5rem",
							fontWeight: "bold",
							color: "white",
						}}
					/>
				)}
				<Box
					sx={{
						position: "absolute",
						top: "15px",
						width: "20%",
						backgroundColor: theme.color.primary,
					}}
				>
					{label &&
						<Typography
						sx={{
							fontSize: "0.85em",
							fontWeight: 500,
							textAlign: "center",
							color: "white",
							fontFamily: "poppins",
						}}
					>
						New
					</Typography>
					}
				</Box>
			</Box>

			<Box
				onMouseEnter={() => {
					setIsHover(true);
				}}
				onMouseLeave={() => {
					setIsHover(false);
				}}
				onClick={showNext}
				sx={{
					height: "100%",
					width: "30%",
					float: "right",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					cursor: "pointer",
				}}
			>
				{isHover && (
					<ArrowForwardIosIcon
						sx={{
							fontSize: "2.5rem",
							fontWeight: "bold",
							color: "white",
						}}
					/>
				)}
			</Box>
		</Box>
	);
};

export default Content;
