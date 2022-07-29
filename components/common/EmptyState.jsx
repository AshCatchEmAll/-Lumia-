import empty from "../../assets/empty.svg";
import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
export default function EmptyState({text}){
    const mobileScreen = useMediaQuery("(max-width:400px)");
    const styling = mobileScreen ? { width: "100px",
    height: "200px",
   
    
    filter: "grayscale(60%)" } : {width: "200px",
    height: "300px",
    filter: "grayscale(60%)"};
    return  <div style={{
        height:"90vh",
        display:"flex",alignItems:"center", flexDirection:"column",justifyContent:"center",}}>
    {" "}
    <img
      src={empty.src}
      style={styling}
      
    />
    <Typography style={{textAlign:"center"}}>{text}</Typography>{" "}
  </div>
}