import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function SimpleMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		}
	}

	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<div style={{height:'100px'}}>
			<Button
				aria-owns={anchorEl ? "simple-menu" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				onMouseOver={handleClick}
			>
				Open Menu
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{onMouseLeave: handleClose}}
				transformOrigin={{
					horizontal: "right",
					vertical: "top",
				}}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom",
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</div>
	);
}

export default SimpleMenu;
