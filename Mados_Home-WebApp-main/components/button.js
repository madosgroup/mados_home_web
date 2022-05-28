import {Button} from "@mui/material";
import theme from '../constants/theme'
const Content = (props) => {
	const {onClick,text,width} = props;
	return (
		<Button  sx={{width:'100%'}} size="medium" sx={styles.btn} onClick={onClick}>
			{text}
		</Button>
	);
};

export default Content;

const styles={
    btn: {
		backgroundColor: theme.color.primary,
		color: "white",
		fontWeight: "medium",
		fontFamily: "Poppins",
        borderRadius:10,
		width: "100px",
		"&:hover": {
			background: theme.color.primary_,
		}
    }
}