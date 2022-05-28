import {useContext, useEffect, useState} from "react";
import Navbar from "../../../components/navbar";
import Head from "next/head";
import {
	Grid,
	Box,
	Avatar,
	Divider,
	Button,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	DesktopDatePicker,
	Checkbox
} from "@mui/material";
import theme from "../../../constants/theme";
import {Context as AuthContext} from "../../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ListIcon from "@mui/icons-material/List";
import {useRouter} from "next/router";
import PricingPlan from "../../../components/account/pricing-plan";
import PublishForm from "../../../components/account/account-publish";
import Sidebar from "../../../components/account/sidebar";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import getStripe from "../../../lib/get-stripe";

const Page = () => {
	const [currentSection, setCurrentSection] = useState("general");
	const router = useRouter();
	const {state} = useContext(AuthContext);
	const [subscriptionLoading, setSubscriptionLoading] = useState("");

	const redirectToCheckout = async (idPrice) => {
		// Create Stripe checkout
		const {
			data: {id},
		} = await axios.post("/api/checkout_sessions", {
			items: [
				{
					price: idPrice,
					quantity: 1,
				},
			],
		});
		// Redirect to checkout
		const stripe = await getStripe();
		await stripe.redirectToCheckout({sessionId: id});
	};

	const handleSubscriptionSilver = async () => {
		setSubscriptionLoading("silver");
		await redirectToCheckout(
			`${process.env.NEXT_PUBLIC_STRIPE_SILVER_PLAN}`
		);
		setSubscriptionLoading("");
	};

	const handleSubscriptionGold = async () => {
		setSubscriptionLoading("gold");
		await redirectToCheckout(`${process.env.NEXT_PUBLIC_STRIPE_GOLD_PLAN}`);
		setSubscriptionLoading("");
	};

	const handleSubscriptionDiamond = async () => {
		setSubscriptionLoading("diamond");
		await redirectToCheckout(
			`${process.env.NEXT_PUBLIC_STRIPE_DIAMOND_PLAN}`
		);
		setSubscriptionLoading("");
	};

	
/* 	useEffect(()=>{
		if(!state.isAuthenticated){
			router.push('/')
		}
	},[]) */
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
					maxWidth: "100vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Grid
					container
					xs={10}
					sx={{display: "flex", justifyContent: "center"}}
				>
					<Grid
						xs={12}
						sx={{
							mt: 4,
							borderTopLeftRadius: "1em",
							borderTopRightRadius: "1em",
							height: "15em",
							backgroundImage: `url(https://www.publicdomainpictures.net/pictures/60000/nahled/grey-gradient-background.jpg)`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							overflow: "visible",
						}}
					>
						<Avatar
							src="https://uploads-ssl.webflow.com/5ee8ad43cc806482b6268d59/5f0866626672d1001b6ba1f4_StockProfile%20male.jpg"
							sx={{
								float: "right",
								marginRight: "1em",
								width: "2.5em",
								height: "2.5em",
								marginTop: "10.6em",
							}}
						/>
					</Grid>
					<Grid sx={{display: "flex"}} xs={12}>
						<Sidebar/>
						<PublishForm/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Page;

const Subscription=()=>{
	return(
		<></>
	/* 	{!state.isPublisher && (
			<>
				<Grid
					sx={{
						display: "flex",
						mt: 3,
						pr: 1,
						justifyContent: "right",
						alignItems: "center",
						width: "100%",
					}}
				>
					<Button
						size="small"
						sx={styles.btnContained}
					>
						Start free Trial
					</Button>
				</Grid>
				<Grid>
					<p style={{fontWeight: 600}}>
						Choose a plan
					</p>
					<Grid container spacing={4}>
						<Grid item md={4} xs={12}>
							<PricingPlan
								cta="Subscribe"
								currency="$"
								description="To familiarize yourself with our tools."
								features={[
									"60 posts",
									"Technical support",
									"For 3 months",
								]}
								image="/static/pricing/plan1.svg"
								name="Silver"
								time="3 months"
								price="10"
								sx={{
									height: "100%",
									maxWidth: 460,
									mx: "auto",
								}}
								isLoading={
									subscriptionLoading ===
									"silver"
										? true
										: false
								}
								subscribe={
									handleSubscriptionSilver
								}
							/>
						</Grid>
						<Grid item md={4} xs={12}>
							<PricingPlan
								cta="Subscribe"
								currency="$"
								description="To familiarize yourself with our tools."
								features={[
									"120 posts",
									"Technical support",
									"For 6 months",
								]}
								image="/static/pricing/plan2.svg"
								name="Gold"
								popular
								time="6 months"
								price="25"
								sx={{
									height: "100%",
									maxWidth: 460,
									mx: "auto",
								}}
								isLoading={
									subscriptionLoading ===
									"gold"
										? true
										: false
								}
								subscribe={
									handleSubscriptionGold
								}
							/>
						</Grid>
						<Grid item md={4} xs={12}>
							<PricingPlan
								cta="Subscribe"
								currency="$"
								description="To familiarize yourself with our tools."
								features={[
									"Unlimited posts",
									"Technical support",
									"For 12 months",
								]}
								image="/static/pricing/plan3.svg"
								name="Diamond"
								price="50"
								time="12 months"
								sx={{
									height: "100%",
									maxWidth: 460,
									mx: "auto",
								}}
								isLoading={
									subscriptionLoading ===
									"diamond"
										? true
										: false
								}
								subscribe={
									handleSubscriptionDiamond
								}
							/>
						</Grid>
					</Grid>
				</Grid>
			</>
		)} */
	)
}
const styles = {
	menuItem: {
		pl: 2,
		display: "flex",
		justifyContent: "left",
		alignItems: "center",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#C9CCD5",
		},
	},
	menuIcons: {
		fontSize: "1.5rem",
		marginRight: "0.5em",
		color: "#323232",
	},
	menuTitle: {
		fontSize: "1rem",
	},
	btnContained: {
		backgroundColor: theme.color.primary,
		color: "white",
        px:1,
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
		"&:hover": {
			background: theme.color.primary_,
		},
	},
};
