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
	Checkbox,
	IconButton
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from "@mui/lab";

const Content=()=>{
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [category,setCategory]=useState("")
    const [beds,setBeds]=useState("")
    const [bedrooms,setBedrooms]=useState("")
    const [baths,setBaths]=useState("")
    const [parking,setParking]=useState("")
    const [date,setDate]=useState("")
    const [city,setCity]=useState("")
    const [adress,setAdress]=useState("")
    const [longitude,setLongitude]=useState("")
    const [latitude,setLatitude]=useState("")
    const [video,setVideo]=useState(null)
    const [photos,setPhotos]=useState([])
    const [isForSell,setIsForSell]=useState(false);
    const [instantBook,setInstantBook]=useState(false);
    const [isAvailable,setIsAvailable]=useState(false);
	const [isUploading,setIsUploading]=useState(false);
	const [errorMessage,setErrorMessage]=useState("");

    const handlePublish=async ()=>{
			setIsUploading(true)
            const formData=new FormData()
          
            formData.append("name",name)
            formData.append("description",description)
            formData.append("category",category)
            formData.append("beds",beds)
            formData.append("bedrooms",bedrooms)
            formData.append("baths",baths)
            formData.append("year",date)
            formData.append("size_of_the_property",50)
            formData.append("currency",'FBU')
            formData.append("host",2)
            formData.append("parking",parking)
            formData.append("date",date)
            formData.append("city",city)
            formData.append("address",adress)
            formData.append("longt",longitude)
            formData.append("lat",latitude)
            formData.append("price",500000)
            formData.append("video",video)
            formData.append("is_for_sell",isForSell)
            formData.append("instant_book",instantBook)
            formData.append("is_available",isAvailable)

            await axios({
                method: "post",
                url: "http://34.229.97.210:5000/api/v1/register_house/",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
              }
            ).then(async(response)=>{
                const tmp=response.data.house;
				await uploadPictures(tmp.id)
            }).catch(err=>{
                console.error(err.response)
            })  
			setIsUploading(false)
    }

	const uploadPictures=async (id)=>{
		photos.forEach(async (image)=>{
			const formData=new FormData()
			formData.append("file",image.data)
			formData.append("room",id)
			formData.append("caption",image.name)
            await axios({
                method: "post",
                url: "http://34.229.97.210:5000/api/v1/register_photo",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
              }
            ).then(response=>{
                console.log(response.data);
            }).catch(err=>{
                console.error(err.response)
            })  
		})
	}
	const removePicture=(id)=>{
		const tmp=photos.filter(el=>el.id!=id)
		setPhotos(tmp)
	}
    return (
		<Grid container sx={{p: 4, display: "block"}} xs={8}>
			<p style={{fontWeight: 600, fontSize: "1.2em"}}>Publish</p>
			<Grid item lg={9} pt={1}>
				<p>Name </p>
				<TextField
					size="small"
					sx={{mt: 1}}
					fullWidth
					label="Name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Description </p>
				<TextField
					minRows={4}
					multiline
					size="small"
					sx={{mt: 1}}
					fullWidth
					label="Description"
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Category </p>
				<Select
					sx={{mt: 1}}
					labelId="demo-simple-select-label"
					id="category_"
					fullWidth
					value={category}
					onChange={(e) => {
						setCategory(e.target.value);
					}}
				>
					<MenuItem value={"House"}>House</MenuItem>
					<MenuItem value={"Appartement"}>Appartement</MenuItem>
					<MenuItem value={"Hotel"}>Hotel</MenuItem>
				</Select>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Beds</p>
				<TextField
					size="small"
					type="number"
					sx={{mt: 1}}
					fullWidth
					label="Beds"
					value={beds}
					onChange={(e) => {
						setBeds(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Bedrooms</p>
				<TextField
					size="small"
					type="number"
					sx={{mt: 1}}
					fullWidth
					label="Bedrooms"
					value={bedrooms}
					onChange={(e) => {
						setBedrooms(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Baths</p>
				<TextField
					size="small"
					type="number"
					sx={{mt: 1}}
					fullWidth
					label="Baths"
					value={baths}
					onChange={(e) => {
						setBaths(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Parking</p>
				<TextField
					size="small"
					type="number"
					sx={{mt: 1}}
					fullWidth
					label="Parking"
					value={parking}
					onChange={(e) => {
						setParking(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Date </p>
				<TextField
					size="small"
					fullWidth
					type="date"
					value={date}
					onChange={(e) => {
						setDate(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>City </p>
				<TextField
					size="small"
					sx={{mt: 1}}
					fullWidth
					label="City"
					value={city}
					onChange={(e) => {
						setCity(e.target.value);
					}}
				/>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Adress </p>
				<TextField
					size="small"
					sx={{mt: 1}}
					fullWidth
					label="Adress"
					value={adress}
					onChange={(e) => {
						setAdress(e.target.value);
					}}
				/>
			</Grid>
			<Grid
				item
				container
				lg={10}
				pt={2}
				sx={{display: "flex", flexDirection: "column"}}
			>
				<p style={{marginRight: "1.2em", marginBottom: "1em"}}>
					Location:
				</p>
				<Box sx={{display: "flex"}}>
					<Grid
						item
						sx={{display: "flex", alignItems: "center", mr: 3}}
						lg="4"
					>
						<p style={{fontSize: "0.9em"}}>Latitude</p>
						<TextField
							sx={{ml: 1}}
							size="small"
							fullWidth
							type="number"
							value={latitude}
							onChange={(e) => {
								setLatitude(e.target.value);
							}}
						/>
					</Grid>
					<Grid
						item
						sx={{display: "flex", alignItems: "center"}}
						lg="4"
					>
						<p style={{fontSize: "0.9em"}}>Longitude</p>
						<TextField
							sx={{ml: 1}}
							defaultChecked={true}
							size="small"
							fullWidth
							type="number"
							value={longitude}
							onChange={(e) => {
								setLongitude(e.target.value);
							}}
						/>
					</Grid>
				</Box>
			</Grid>
			<Grid
				item
				container
				lg={10}
				pt={2}
				sx={{display: "flex", alignItems: "center"}}
			>
				<p style={{marginRight: "1.2em"}}>Details:</p>
				<Grid item sx={{display: "flex", alignItems: "center"}}>
					<p>Is For Sell </p>
					<Checkbox
						sx={{ml: 1}}
						size="small"
						checked={isForSell}
						onChange={(e) => {
							setIsForSell(!isForSell);
						}}
					/>
				</Grid>
				<Grid item sx={{display: "flex", alignItems: "center", ml: 2}}>
					<p>Is Available </p>
					<Checkbox
						sx={{ml: 1}}
						size="small"
						checked={isAvailable}
						onChange={(e) => {
							setIsAvailable(!isAvailable);
						}}
					/>
				</Grid>
				<Grid item sx={{display: "flex", alignItems: "center", ml: 2}}>
					<p>Instant Book </p>
					<Checkbox
						sx={{ml: 1}}
						size="small"
						checked={instantBook}
						onChange={(e) => {
							setInstantBook(!instantBook);
						}}
					/>
				</Grid>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Video </p>
				<input
					style={{display: "none"}}
					id="raised-button-file_"
					type="file"
					onChange={(e) => {
						if (e.target.files[0]) {
							setVideo(e.target.files[0]);
						}
					}}
				/>
				<label htmlFor="raised-button-file_">
					<Button
						sx={{width: "100%", mt: 1}}
						variant="outlined"
						component="span"
					>
						Upload a video
					</Button>
				</label>
			</Grid>
			<Grid item lg={9} pt={1}>
				<p>Photos </p>
				<input
					style={{display: "none"}}
					id="raised-button-file_2"
					type="file"
					multiple="multiple"
					onChange={(e) => {
						const tmp=[];
						if (e.target.files) {
							for (let i = 0; i < e.target.files.length; i++) {
									tmp.push({id:i,data:e.target.files[i]});
							}
						}
						setPhotos(tmp)
					}
					}
				/>
				<label htmlFor="raised-button-file_2">
					<Button
						sx={{width: "100%", mt: 1}}
						variant="outlined"
						component="span"
					>
						Upload photos
					</Button>
				</label>
				{photos.length>0 && (
					<Box mt={1}>
						<p>Uploaded Pictures</p>
						{photos.map((el) => (
							<Box
							key={el.id}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									px: 1,
								}}
							>
								<p style={{color: "grey"}}>{el.data.name}</p>
								<IconButton onClick={()=>{removePicture(el.id)}}>
									<DeleteIcon sx={{color: "red"}} />
								</IconButton>
							</Box>
						))}
					</Box>
				)}
			</Grid>
			<Grid item lg={9} mt={3}>
				<LoadingButton  loading={isUploading} onClick={handlePublish} fullWidth variant="contained">
					Upload
				</LoadingButton>
			</Grid>
		</Grid>
	);
}

export default Content;