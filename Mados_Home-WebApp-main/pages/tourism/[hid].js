import {useContext, useEffect, useState} from "react";
import AppBar from "../../components/navbar";
import Link from "next/link"
import {useRouter} from 'next/router';
import Head from "next/head";
import {
	Box,
	Grid,
	Typography,
	Button,
	Divider,
	TextField,
	IconButton,
	MenuItem,
	Menu,
	Modal,
	CircularProgress
} from "@mui/material";
import {withStyles} from "@material-ui/core/styles";
import images from "../../constants/images";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathroomIcon from "@mui/icons-material/Bathroom";
import CircleIcon from "@mui/icons-material/Circle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import ShowerIcon from "@mui/icons-material/Shower";
import theme from "../../constants/theme";
import {Content_ as ImageCarousel} from "../../components/imageCarousel";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import CustomButton from "../../components/button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import MapView from "../../components/map/map";
import BathtubIcon from '@mui/icons-material/Bathtub';
import VideocamIcon from '@mui/icons-material/Videocam';
import {Context as MainContext} from '../../context/MainContext';
import axios from "axios";
import {tourism} from '../../constants/data'

const CustomTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: "#323232",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "black",
		},
		"& .MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: "black",
				borderWidth: 1,
			},
		},
	},
})(TextField);

const description =
	" The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.";

const Page = () => {
    const router=useRouter()
    const {hid} = router.query;
	const contextMain=useContext(MainContext);
	const [toggle, setToggle] = useState(true);
	const [description_, setDescription] = useState("");
	const [openModal,setOpenModal]=useState(false)
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [house,setHouse]=useState(null)
	const [housesFetched,setHousesFetched]=useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleOpenModal=() =>{
		setOpenModal(true)
	}
	const handleCloseModal=() =>{
		setOpenModal(false)
	}
	const handleClose = () => {
		setAnchorEl(null);
	};

	const fetchHouse=async ()=>{
		const fetchInitial = async () => {
			try {
				await axios
					.get("http://34.229.97.210:5000/api/v1/rooms")
					.then(function (response) {
						console.log(response.data.find((el) =>el.id == 4));
						setHouse(response.data.find((el) =>el.id == 4));
						setHousesFetched(response.data);
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
	}


	useEffect(()=>{
		/* if (!contextMain.state.houses) {
			fetchHouses();
		} else {
			if (contextMain.state.houses.find((el) => el.id == hid)) {
				setHouse(contextMain.state.houses.find((el) => el.id == hid));
				setHousesFetched(contextMain.state.houses);
			}else{
				fetchHouses()
			}
		} */
		fetchHouse()
		
	},[])

	
	
	useEffect(() => {
		if (toggle) {
			const str_ = description.slice(0, 407) +" ...";
			setDescription(str_);
		} else {
			setDescription(description);
		}
	}, [toggle]);

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
			</Head>
			<AppBar />

			{(house && housesFetched) ? 
			(
				<Box sx={{mx: [2, "null", 4], my: 3, py: 1}}>
					<Grid container sx={{display: "flex", mr: 2}}>
						<Grid
							container
							item
							md={8}
							lg={8}
							sx={{display: "flex"}}
						>
							{house && (
								<ImageCarousel
									height={["22em", "30em"]}
									width="100%"
									label={false}
									image={tourism[hid].Photo}
									spaceArrows="20%"
								/>
							)}

							{/* <Grid item display="flex" mt={2}>
							<Grid container xs={3} mr={1}>
								<img
									style={{
										maxWidth: "100%",
										maxHeight: "100%",
										display: "block",
									}}
									src={images[0]}
								/>
							</Grid>
							<Grid container xs={3} mr={1}>
								<img
									style={{
										maxWidth: "100%",
										maxHeight: "100%",
										display: "block",
									}}
									src={images[0]}
								/>
							</Grid>
							<Grid container xs={3} mr={1}>
								<img
									style={{
										maxWidth: "100%",
										maxHeight: "100%",
										display: "block",
									}}
									src={images[0]}
								/>
							</Grid>
							<Grid container xs={3}>
								<img
									style={{
										maxWidth: "100%",
										maxHeight: "100%",
										display: "block",
									}}
									src={images[0]}
								/>
							</Grid>
						</Grid> */}
						</Grid>
						<Grid
							item
							md={4}
							lg={4}
							sx={{
								px: [4, null, 2, 4, 6],
								display: ["none", "none", "inline"],
							}}
						>
							<Box
								sx={{
									px: 2,
									pt: 1,
									boxShadow:
										"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
									height: "100%",
								}}
							>
								<Box sx={{textAlign: "center"}}>
									<p
										style={{
											fontWeight: 500,
											margin: 0,
											fontSize:'1.2em',
											marginBottom: "24px",
										}}
									>
										Get in touch
									</p>
								</Box>
								<CustomTextField
									sx={{mb: 2}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon />
											</InputAdornment>
										),
									}}
									size="medium"
									fullWidth
									placeholder="Full Name"
								/>
								<CustomTextField
									sx={{mb: 2}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<EmailIcon />
											</InputAdornment>
										),
									}}
									size="medium"
									fullWidth
									placeholder="Email"
								/>
								<CustomTextField
									sx={{mb: 2}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<CallIcon />
											</InputAdornment>
										),
									}}
									size="medium"
									fullWidth
									placeholder="Phone"
								/>
								<CustomTextField
									sx={{mb: 2}}
									size="small"
									fullWidth
									minRows={4}
									multiline
									placeholder="Lorem ipsum, or lipsum as it is sometimes known."
								/>
								<Button
									size="medium"
									fullWidth
									sx={styles.btn}
									onClick={() => {}}
								>
									Email agent
								</Button>
								{/* <Button
									size="medium"
									fullWidth
									sx={styles.btnOutlined}
									onClick={() => {}}
								>
									Live Chat
								</Button> */}
							</Box>
						</Grid>
					</Grid>
					<Grid
						sm={12}
						md={8}
						xs={12}
						sx={{px: [0, "null", 1], py: [0, "null", 2]}}
					>
						<Modal
							open={openModal}
							onClose={handleCloseModal}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={styles.modal}>
								{
									<video  style={{width:'100%',height:'100%'}} controls autoPlay>
										<source
											src={house.video}
											type="video/mp4"
										/>
									</video>
								}
							</Box>
						</Modal>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-end",
							}}
						>
							<Box>
								{/* <Button
								size="medium"
								fullWidth
								sx={styles.btn}
								onClick={() => {}}
							>
								Buy
							</Button> */}
								<IconButton
									onClick={handleOpenModal}
									aria-label="Video overview"
								>
									<VideocamIcon sx={{fontSize: "1.2em"}} />
								</IconButton>
								<IconButton>
									<FavoriteBorderIcon
										sx={{fontSize: "1.2em"}}
									/>
								</IconButton>
								<IconButton
									aria-label="more"
									id="long-button"
									aria-controls={
										open ? "long-menu" : undefined
									}
									aria-expanded={open ? "true" : undefined}
									aria-haspopup="true"
									onClick={handleClick}
								>
									<ShareIcon />
								</IconButton>
							</Box>
						</Box>
						<Grid
							display="flex"
							container
							sx={{justifyContent: "space-between"}}
						>
							<Grid item xs={12} sm={6} md={6}>
								{house.adress && <Box
									mt={1}
									sx={{display: "flex", alignItems: "center"}}
								>
									<p style={{color: "#323232"}}>
										{house.adress.country}-
										{house.adress.pronvince} ,{" "}
										{house.adress.municipality}{" "}
										{house.adress.town}{" "}
										{house.adress.street}
									</p>
								</Box>}
								<Box
									mt={2}
									sx={{display: "flex", alignItems: "center"}}
								>
									<p
										style={{
											fontSize: "1.2em",
											fontWeight: 600,
											color: "#323232",
										}}
									>
										Fact and Features
									</p>
								</Box>
								<Box
									mt={2}
									sx={{display: "flex", AlignItems: "center"}}
								>
									<ApartmentIcon
										sx={{
											fontSize: "1.5em",
											color: theme.color.primary,
											mr: 1,
										}}
									/>
									<p
										style={{
											fontSize: "1em",
											color: "#323232",
										}}
									>
										Tourism
									</p>
								</Box>
								<Box
									mt={2}
									sx={{display: "flex", AlignItems: "center"}}
								>
									<CalendarTodayIcon
										sx={{
											fontSize: "1.5em",
											color: theme.color.primary,
											mr: 1,
										}}
									/>
									<p
										style={{
											fontSize: "1em",
											color: "#323232",
										}}
									>
										Posted on: {house.date}
									</p>
								</Box>
							</Grid>
							<Grid
								item
								px={[0, "null", 2]}
								mt={[4]}
								xs={12}
								sm={6}
								md={6}
								sx={{
									maxHeight: "270px",
									overflow: "hidden",
									borderRadius: "5px",
								}}
							>
								<MapView />
							</Grid>
						</Grid>
						<Box
							mt={4}
							sx={{display: "flex", alignItems: "center"}}
						>
							<p
								style={{
									fontSize: "1.2em",
									fontWeight: 600,
									color: "#323232",
								}}
							>
								Description
							</p>
						</Box>
						<Grid mt={1}>
							<p
								style={{
									fontSize: "0.9em",
									color: "grey",
									marginTop: 2,
								}}
							>
								{description_}
							</p>
							<p
								onClick={() => {
									setToggle(!toggle);
								}}
								style={{
									marginTop: 4,
									cursor: "pointer",
									fontSize: "1em",
									color: theme.color.primary,
								}}
							>
								{toggle ? "Show more" : "Show less"}
							</p>
						</Grid>
						<Grid
							sx={{display: ["block", "block", "none"]}}
							sm={8}
							xs={12}
						>
							<Box
								sx={{
									pt: 1,
									height: "100%",
								}}
							>
								<Box sx={{textAlign: "left"}}>
									<p
										style={{
											fontWeight: 500,
											margin: 0,
											marginBottom: "24px",
											marginTop: "12px",
										}}
									>
										More about this property
									</p>
								</Box>
								<CustomTextField
									sx={{mb: 3}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<PersonIcon />
											</InputAdornment>
										),
									}}
									size="small"
									fullWidth
									placeholder="Full Name"
								/>
								<CustomTextField
									sx={{mb: 3}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<EmailIcon />
											</InputAdornment>
										),
									}}
									size="small"
									fullWidth
									placeholder="Email"
								/>
								<CustomTextField
									sx={{mb: 3}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<CallIcon />
											</InputAdornment>
										),
									}}
									size="small"
									fullWidth
									placeholder="Phone"
								/>
								<CustomTextField
									sx={{mb: 3}}
									size="small"
									fullWidth
									minRows={3}
									multiline
									placeholder="Lorem ipsum, or lipsum as it is sometimes known."
								/>
								<Button
									size="medium"
									sx={styles.btn}
									onClick={() => {}}
								>
									Email agent
								</Button>
							</Box>
						</Grid>
						
					</Grid>
				</Box>
			):

			<Grid sx={{height:"75vh",display:'flex',alignItems:'center',justifyContent:'center'}}>
					<CircularProgress sx={{color: theme.color.primary}} />
			</Grid>
			}
		</>
	);
};

const styles = {
	modal: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: '80vw',
		height:'90vh',
		bgcolor: "background.paper",
		boxShadow: 24,
	},
	btnShowMore: {
		color: theme.color.primary,
	},
	btn: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "medium",
		fontFamily: "Poppins",
		marginBottom: 2,
		borderRadius: 10,
		width: "100%",
		"&:hover": {
			background: theme.color.primary_,
		},
	},
	btnOutlined: {
		backgroundColor: "white",
		border: `2px solid ${theme.color.primary}`,
		borderWidth: 1,
		color: theme.color.primary,
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
	},
};

export default Page;
