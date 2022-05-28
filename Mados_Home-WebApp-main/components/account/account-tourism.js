import { useRouter } from "next/router";
import { useState,useContext, useEffect } from "react";
import {Context as AuthContext} from '../../context/AuthContext';
import {tourism} from "../../constants/data";
import {Box, Grid, InputAdornment, Button,Paper,InputBase,Divider, Typography} from "@mui/material";
import {Content_ as ImageCarousel} from '../imageCarousel';
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import theme from '../../constants/theme';
import { Edit } from "@mui/icons-material";


const Content=()=>{
	const {state,addToBooked,removeFromBooked}=useContext(AuthContext);
    const [booked,setBooked]=useState(null);

    useEffect(()=>{
        const tmp=tourism.filter(el=>state.booked.includes(el.id))
        setBooked(tmp)
        console.log(tourism.filter(el=>state.booked.includes(el.id)));
    },[])

    return(
        <>
       {booked && booked.length>0 ?
        (
        <Grid pt={4} pl={4}>
            {booked.map((el, pos) => (
								<div key={pos}>
									<CardProperty el={el}/>
                                    <Divider/>
								</div>
							))}
        </Grid>)
        :
        <Grid sx={{height:'100%',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <p>Empty</p>
        </Grid>}
        </>
    )
}

const CardProperty = (props) => {
	const router=useRouter()
	const {el} = props;
	return (
		<Grid display="flex" my={2}>
			<ImageCarousel image={el.Photo} height="22vh" width="22vw" />
			<Grid
				xs={6}
				sx={{
					display: "flex",
					flexDirection: "column",
					pt: 1,
					px: 2,
					justifyContent: "space-between",
					cursor: "pointer",
				}}
			>
				<Box sx={{alignItems: "center"}}>
					{/* <p
						style={{
							fontWeight: "500",
							fontSize: "1.1em",
							marginRight: "15px",
						}}
					>
						FBU&nbsp;{el.name}/mo
					</p> */}
					<p
						style={{
							fontSize: "0.8em",
							marginRight: "15px",
							color: "#323232",
						}}
					>
						Type: Tourism
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
						Added on Monday 3th,Feb 2022
					</p>
				</Grid>
			</Grid>
			<Grid xs={2} sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
				{/* <Button
					onClick={() => {
					}}
					size="small"
					sx={{...styles.btnOutlined,mb:1}}
				>
					Edit
				</Button> */}
				<Button
					onClick={() => {
						router.push("/tourism/"+el.id);
					}}
					size="small"
					sx={styles.btnContained}
				>
					View
				</Button>
			</Grid>
		</Grid>
	);
};

const styles={
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
    btnOutlined: {
		backgroundColor: "white",
        width:'100%',
		border: `2px solid ${theme.color.primary}`,
		borderWidth: 1,
		color: theme.color.primary,
		fontWeight: "medium",
		fontFamily: "Poppins",
		borderRadius: 10,
	},
    btnContained: {
		backgroundColor: theme.color.primary,
		color: "white",
        width:'100%',
		fontWeight: "medium",
		fontFamily: "Poppins",
        borderRadius:10,
		"&:hover": {
			background: theme.color.primary_,
		},
	},
}

export default Content;