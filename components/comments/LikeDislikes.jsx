import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import {ThumbUpSharp,ThumbDownSharp } from "@mui/icons-material";

function LikeDislikes(props) {
 
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {
        answerId: props.answerId, userId: props.userId
    };

   
 



    useEffect(() => {

        // Axios.post('/api/like/getLikes', variable)
        //     .then(response => {
        //         if (response.data.success) {
        //             //How many likes does this video or comment have 
        //             setLikes(response.data.likes.length)

        //             //if I already click this like button or not 
        //             response.data.likes.map(like => {
        //                 if (like.userId === props.userId) {
        //                     setLikeAction('liked')
        //                 }
        //             })
        //         } else {
        //             alert('Failed to get likes')
        //         }
        //     })

        // Axios.post('/api/like/getDislikes', variable)
        //     .then(response => {
        //         if (response.data.success) {
        //             //How many likes does this video or comment have 
        //             setDislikes(response.data.dislikes.length)

        //             //if I already click this like button or not 
        //             response.data.dislikes.map(like => {
        //                 if (like.userId === props.userId) {
        //                     setDislikeAction('disliked')
        //                 }
        //             })
        //         } else {
        //             alert('Failed to get dislikes')
        //         }
        //     })

    }, [])

    return (
        <React.Fragment>
            <span key="comment-basic-like">
              
                <ThumbUpSharp/>
              
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
               
                   
                    <ThumbDownSharp/>
             
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes