import React from 'react'
import {useState,useEffect } from 'react'
import { Avatar,IconButton } from '@material-ui/core';
import {Link} from 'react-router-dom'
import './SidebarChat.css'

function SidebarChat(props) {
    const [seed,setSeed] = useState('');
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[props.id])

    if (props.newChat) {
        return ;
    } else {
        return (
            <Link to={`/${props.id}`} key={`sidebar_chat_${props.id}`}>
            <div className="sidebarChat" key={props.id}>
                <IconButton><Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/></IconButton>
                <div className="sidebarChat_Info">
                    <h3>{props.name}</h3>
                    {/* <p>LAst msg ... </p> */}
                </div>
            </div>
            </Link>
        )
    }
}

export default SidebarChat

