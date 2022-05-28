
import { TextField } from "@mui/material";
import {withStyles} from "@material-ui/core/styles";

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

export const InputText=(props) =>{

    return <CustomTextField {...props}/>;

}