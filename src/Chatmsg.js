import React from 'react'
import './Chatmsg.css';
import { useStateValue } from './StateProvider'



function Chatmsg(props) {


    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        // var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
        return time;
      }

    const [user,dispatch] = useStateValue();
    
    const userName = user.user.email;

    var msg_type = '';
    // console.log(props.timestamp);
    if (props.type === 'img') {
        var msg_text = <img src={props.msg} alt="Not Available" onClick={() => {
            props.setPopupImage(props.msg);
            props.setIsOpen(true);
        }}/>
        msg_type = 'img';
    } else {
        msg_text = props.msg;
    }
    if (userName === props.name) {
        return (
            <div className={`chat_body_msg chat_receiver ${msg_type}`}>
                {/* <span className="chat_name">
                    {props.name}
                </span> */}
                    {msg_text}
                    

                <span className="chat_time">
                {timeConverter(props.timestamp)}
                    {/* {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(props.timestamp)} */}
                </span>
            </div>
        )
    } else {
        return (
            <div className={`chat_body_msg ${msg_type}`}>
                {/* <span className="chat_name">
                    {props.name}
                </span> */}
                    {msg_text}
                <span className="chat_time">
                    {timeConverter(props.timestamp)}
                    {/* {new Intl.DateTimeFormat('en-In', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(props.timestamp)} */}
                </span>
            </div>
        )   
    }
}

export default Chatmsg
