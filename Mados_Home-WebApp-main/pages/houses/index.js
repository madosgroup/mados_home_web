import {useEffect, useState} from "react";
import AppBar from "../../components/navbar";
import Link from "next/link"
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
	Modal
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
import ImageCarousel from "../../components/imageCarousel";
import InputAdornment from "@mui/material/InputAdornment";
import {houses} from "../../constants/data";
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
	const [toggle, setToggle] = useState(true);
	const [description_, setDescription] = useState("");
	const [openModal,setOpenModal]=useState(false)
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<AppBar />

			<Box sx={{mx: 12, my: 3, py: 1}}>
				<Grid container sx={{display: "flex", mr: 2}}>
					<Grid container item xs={8} sx={{display: "flex"}}>
						<ImageCarousel
							height="430px"
							width="100%"
							label={false}
							images={houses[0].images}
							spaceArrows="20%"
						/>

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
					<Grid xs={4} px={4} py={0}>
						<Box
							sx={{
								px: 2,
								backgroundColor: "#f6f6f6",
								height: "100%",
							}}
						>
							<Box sx={{textAlign: "center"}}>
								<p
									style={{
										fontWeight: 500,
										margin: 0,
										marginBottom: "24px",
									}}
								>
									More about this property
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
								size="small"
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
								size="small"
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
								size="small"
								fullWidth
								placeholder="Phone"
							/>
							<CustomTextField
								sx={{mb: 2}}
								size="small"
								fullWidth
								minRows={3}
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
							<Button
								size="medium"
								fullWidth
								sx={styles.btnOutlined}
								onClick={() => {}}
							>
								Live Chat
							</Button>
						</Box>
					</Grid>
				</Grid>
				<Grid xs={8} px={1} py={2}>
					<Modal
						open={openModal}
						onClose={handleCloseModal}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={styles.modal}>
							<iframe style={{height:'100%',width:'100%'}}  src="https://www.youtube.com/embed/83aA64ldeTQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</Box>
					</Modal>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Box sx={{display: "flex", alignItems: "center"}}>
							<CircleIcon
								sx={{
									fontSize: "1.1em",
									color: theme.color.primary,
									mr: 1,
								}}
							/>
							<p
								style={{
									fontSize: "0.9em",
									color: "#323232",
								}}
							>
								For sale
							</p>
						</Box>
						<Box>
							{/* <Button
								size="medium"
								fullWidth
								sx={styles.btn}
								onClick={() => {}}
							>
								Buy
							</Button> */}
							<IconButton onClick={handleOpenModal} aria-label="Video overview">
								<VideocamIcon sx={{fontSize: "1.2em"}} />
							</IconButton>
							<IconButton>
								<FavoriteBorderIcon sx={{fontSize: "1.2em"}} />
							</IconButton>
							<IconButton
								aria-label="more"
								id="long-button"
								aria-controls={open ? "long-menu" : undefined}
								aria-expanded={open ? "true" : undefined}
								aria-haspopup="true"
								onClick={handleClick}
							>
								<ShareIcon />
							</IconButton>
						</Box>
					</Box>
					<Grid display="flex" sx={{justifyContent: "space-between"}}>
						<Grid xs={6}>
							<Box
								mt={1}
								sx={{display: "flex", alignItems: "center"}}
							>
								<p
									style={{
										fontSize: "1.1em",
										color: "#323232",
									}}
								>
									FBU 500,000 &nbsp;
								</p>
								<p
									style={{
										fontWeight: "500",
										color: "gray",
										fontSize: "0.8em",
										margin: "0px",
										textDecoration: "line-through",
									}}
								>
									FBU 800,000/mo
								</p>
							</Box>
							<Box
								mt={1}
								sx={{display: "flex", alignItems: "center"}}
							>
								<p style={{color: "#323232"}}>
									Bujumbura , Kinindo Av Mutaga
								</p>
							</Box>
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
								<p style={{fontSize: "1em", color: "#323232"}}>
									{" "}
									Hotel
								</p>
							</Box>
							<Box
								mt={2}
								sx={{display: "flex", AlignItems: "center"}}
							>
								<HotelIcon
									sx={{
										fontSize: "1.5em",
										color: theme.color.primary,
										mr: 1,
									}}
								/>
								<p style={{fontSize: "1em", color: "#323232"}}>
									{" "}
									5 Bedrooms
								</p>
							</Box>
							<Box
								mt={2}
								sx={{display: "flex", AlignItems: "center"}}
							>
								<BathroomIcon
									sx={{
										fontSize: "1.5em",
										color: theme.color.primary,
										mr: 1,
									}}
								/>
								<p style={{fontSize: "1em", color: "#323232"}}>
									{" "}
									3 Bathrooms
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
								<p style={{fontSize: "1em", color: "#323232"}}>
									Built in 2015
								</p>
							</Box>
						</Grid>
						<Grid
							ml={3}
							mt={2}
							xs={5}
							sx={{
								maxHeight: "270px",
								overflow: "hidden",
								borderRadius: "5px",
							}}
						>
							<MapView />
						</Grid>
					</Grid>
					<Box mt={4} sx={{display: "flex", alignItems: "center"}}>
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
					<Grid mt={1} xs={10}>
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
					<Box mt={4} sx={{display: "flex", alignItems: "center"}}>
						<p
							style={{
								fontSize: "1.3em",
								fontWeight: 600,
								color: "#323232",
							}}
						>
							Other Properties
						</p>
					</Box>
					<Grid container mt={2}>
						{houses.map((el, pos) => {
							if (pos < 3) {
								return (
									<Grid key={pos} item xs={12} md={4} mb={2}>
										<Box
											sx={{
												mr: 2,
												backgroundColor: "#f6f6f6",
												borderRadius: 5,
												pb: 2,
												overflow: "hidden",
												marginBottom: "10px",
												borderWidth: "1px",
												"&:hover": {
													cursor: "pointer",
												},
											}}
										>
											<Link href="/house/">
												<ImageCarousel
													width="100%"
													height="200px"
													images={el.images}
												/>
											</Link>
											<Box px={0.8}>
												<p
													style={{
														fontWeight: "500",
														marginTop: "10px",
														fontSize: "0.9em",
													}}
												>
													{el.name}
												</p>
												<Box
													display="flex"
													mt={1}
													p={0}
													sx={{alignItems: "center"}}
												>
													<p
														style={{
															fontWeight: "500",
															fontSize: "0.9em",
															margin: "0px",
														}}
													>
														${el.price}
														/mo&nbsp;&nbsp;
													</p>
													<p
														style={{
															fontWeight: "500",
															color: "gray",
															fontSize: "0.8em",
															margin: "0px",
															textDecoration:
																"line-through",
														}}
													>
														$800,000/mo
													</p>
												</Box>
												<p
													style={{
														fontWeight: "400",
														fontSize: "0.8em",
													}}
												>
													Posted 4 days ago
												</p>
											</Box>
											<Divider sx={{my: 2}} />
											<Box
												display="flex"
												sx={{
													justifyContent:
														"space-around",
												}}
											>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														r: 2,
													}}
												>
													<HotelIcon
														sx={{
															fontSize: "1.2em",
															mb: 0.5,
															mr: 0.8,
															color: theme.color
																.primary,
														}}
													/>
													<p
														style={{
															fontSize: "0.9em",
														}}
													>
														05 Bed
													</p>
												</Box>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														r: 2,
													}}
												>
													<BathtubIcon
														sx={{
															fontSize: "1.2em",
															mb: 0.5,
															mr: 0.8,
															color: theme.color
																.primary,
														}}
													/>
													<p
														style={{
															fontSize: "0.9em",
														}}
													>
														01 Bath
													</p>
												</Box>
											</Box>
										</Box>
									</Grid>
								);
							}
						})}

						{houses.map((el, pos) => {
							if (pos < 3) {
								return (
									<Grid key={pos} item xs={12} md={4} mb={2}>
										<Box
											sx={{
												mr: 2,
												backgroundColor: "#f6f6f6",
												borderRadius: 5,
												pb: 2,
												overflow: "hidden",
												marginBottom: "10px",
												borderWidth: "1px",
												"&:hover": {
													cursor: "pointer",
												},
											}}
										>
											<Link href="/house/">
												<ImageCarousel
													width="100%"
													height="200px"
													images={el.images}
												/>
											</Link>
											<Box px={0.8}>
												<p
													style={{
														fontWeight: "500",
														marginTop: "10px",
														fontSize: "0.9em",
													}}
												>
													{el.name}
												</p>
												<Box
													display="flex"
													mt={1}
													p={0}
													sx={{alignItems: "center"}}
												>
													<p
														style={{
															fontWeight: "500",
															fontSize: "0.9em",
															margin: "0px",
														}}
													>
														${el.price}
														/mo&nbsp;&nbsp;
													</p>
													<p
														style={{
															fontWeight: "500",
															color: "gray",
															fontSize: "0.8em",
															margin: "0px",
															textDecoration:
																"line-through",
														}}
													>
														$800,000/mo
													</p>
												</Box>
												<p
													style={{
														fontWeight: "400",
														fontSize: "0.8em",
													}}
												>
													Posted 4 days ago
												</p>
											</Box>
											<Divider sx={{my: 2}} />
											<Box
												display="flex"
												sx={{
													justifyContent:
														"space-around",
												}}
											>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														r: 2,
													}}
												>
													<HotelIcon
														sx={{
															fontSize: "1.2em",
															mb: 0.5,
															mr: 0.8,
															color: theme.color
																.primary,
														}}
													/>
													<p
														style={{
															fontSize: "0.9em",
														}}
													>
														05 Bed
													</p>
												</Box>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														justifyContent:
															"center",
														r: 2,
													}}
												>
													<BathtubIcon
														sx={{
															fontSize: "1.2em",
															mb: 0.5,
															mr: 0.8,
															color: theme.color
																.primary,
														}}
													/>
													<p
														style={{
															fontSize: "0.9em",
														}}
													>
														01 Bath
													</p>
												</Box>
											</Box>
										</Box>
									</Grid>
								);
							}
						})}
					</Grid>
				</Grid>
			</Box>
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
