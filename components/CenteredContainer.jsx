import React from "react";
import styles from "../styles/CenteredContainer.module.css"

function CenteredContainer({children}){
    return <div className={styles.centered_container}>
        
        {children}
    </div>
}


export default CenteredContainer;