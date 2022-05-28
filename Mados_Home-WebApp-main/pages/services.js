import {Typography, Box} from "@mui/material";
import Divider from "@mui/material/Divider";

const Page = () => {
	return (
        
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box sx={{display: "flex"}}>
				<Typography>This page will be available soon</Typography>
			</Box>
		</div>
	);
};

export default Page;
