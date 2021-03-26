import React from 'react'
import './chat.css';
import {useState,useEffect,useRef} from 'react'
import { Avatar,IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useParams} from 'react-router-dom';
import  firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
import { useHistory} from "react-router-dom";
import ShowFilePreview from './ShowFilePreview';



import db from './firebase.js';
import Chatmsg from './Chatmsg.js';
import { useStateValue } from './StateProvider'

// import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'
import Modal from 'react-modal';


function Chat() {

    const {documentId} = useParams();
    const [seed,setSeed] = useState('');
    const [searchChatInput,setSearchChatInput] = useState('');
    const [chatUser,setChatUser] = useState('');
    const [isOpen,setIsOpen] = useState(false);
    const [input,setInput] = useState('');
    const [showEmoticonBox, setShowEmoticonBox] = useState(false);
    const history = useHistory();
    const [allmsg,setAllmsg] = useState([]);
    const [user,dispatch] = useStateValue();
    const userName = user.user.email;
    const [popupImage,setPopupImage] = useState('');

    const messagesEndRef = useRef(null);
    const [avatar,setavatar] = useState('');
    const [isAvailableFile,setIsAvailableFile] = useState('');
    

    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          width                 : '30%',
          height                 : '50%',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    
    const  handleUploadStart = () => {

    }
    const handleProgress = () => {
    } 
    
    const handleUploadError = error => {
    };
    const handleUploadSuccess = filename => {

        firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => {
            setavatar(url);
            setIsAvailableFile('hide');
            // setavatar(url);
        });
    };

    const handleClose = () => {
        setIsAvailableFile('');
        setShowEmoticonBox(false);
        setavatar('')
    }

    const onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          sendMessage(e);
        }
    }

  const scrollToBottom = () => {
    if (messagesEndRef) {
        messagesEndRef.current.addEventListener('DOMNodeInserted', event => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
      }
  }

    useEffect(() => {

    db.collection("chat")
    .where("emails", "array-contains", user.user.email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().emails[0] !== user.user.email) {
            setChatUser(doc.data().emails[0]);
          } else {
            setChatUser(doc.data().emails[1]);
          }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    db.collection(`chat/${documentId}/chat_msg`)
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
            setAllmsg(snapshot.docs.map((doc) => {
                return {
                    sender: doc.data().sender,
                    id:doc.id,
                    msg:doc.data().msg,
                    type:doc.data().type,
                    sec:doc.data().timestamp?doc.data().timestamp.seconds:Math.floor(Date.now() / 1000),
                }
            }
            
            ));
            scrollToBottom();
        })
        
        setSeed(Math.floor(Math.random() * 5000));

    },[documentId])


    const sendMessage = (e) => {
        e.preventDefault();
        if (input !== '') {
            var docData = {
                msg: input,
                type:'text',
                sender:userName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };
            db.collection(`chat/${documentId}/chat_msg`).add(docData).then(function() {
                setInput('');
                setShowEmoticonBox(false);
            });
        }
    }

    const uploadImageFile  = (e) => {
        e.preventDefault();
        if (avatar !== '') {
            var docData = {
                msg: avatar,
                type:'img',
                sender:userName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };
            db.collection(`chat/${documentId}/chat_msg`).add(docData).then(function() {
                setInput('');
                setIsAvailableFile('');
                setShowEmoticonBox(false);
                scrollToBottom();
            });
        }
    }

    
    const addEmoji = e => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input +  emoji);
      }

      console.log(allmsg);

    return (
        
        <div className="chat">
            
            <div className="chat_header">
                <IconButton><Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/></IconButton>
                <div className="chat_header_info">
                <h3>{chatUser}</h3>
                </div>
                <div className="chat_header_right">
                    <div className="chat_search_container">
                        <IconButton><SearchIcon /></IconButton>                    
                        <form>
                            <input
                            type="text"
                            value={searchChatInput}
                            onChange={(e) => setSearchChatInput(e.target.value)}
                            placeholder="Search"
                            />
                        </form>
                    </div>
                    <IconButton><MoreVertIcon /></IconButton>
                </div>

            </div>

                {isAvailableFile && <ShowFilePreview uploadImageFile={uploadImageFile} handleClose={handleClose} avatar={avatar}/>}

                <div className={`chat_body ${isAvailableFile}`} ref={messagesEndRef}>
                    {allmsg && 
                        allmsg
                        .filter((message) => message.msg.includes(searchChatInput))
                        .map(message => (
                            <Chatmsg type={message.type} msg={message.msg} timestamp={message.timestamp?message.timestamp.seconds:Math.floor(Date.now() / 1000)} name={message.sender} key={message.id} setPopupImage={setPopupImage} setIsOpen={setIsOpen}/>
                        )
                    )}
                </div>

                <Modal isOpen={isOpen} style={customStyles}>
                    <div className="img_popup_header">
                        <IconButton onClick={() => setIsOpen(false)}><CloseIcon/></IconButton>
                    </div>
                    <div className="img_popup_content">
                        <img src={popupImage} alt="Hovered" />
                    </div>
                </Modal>
                
                <div className={`chat_footer ${isAvailableFile}`} >

                <IconButton><InsertEmoticonIcon onClick={() => setShowEmoticonBox(!showEmoticonBox)}/></IconButton>
                
                <CustomUploadButton
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={firebase.storage().ref("images")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                >
                    <AttachFileIcon/>
                </CustomUploadButton>
                
                <form>
                    <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => onEnterPress(e)} placeholder="Type a message" >{input}</textarea>
                    <button type="submit" onClick={sendMessage}> send a msg</button>
                    
                </form>
                    <IconButton><SendIcon onClick={sendMessage}/></IconButton>
                </div>
                {showEmoticonBox && (
                    <div className="chat_footer_emoticons">
                    <Picker onSelect={addEmoji} />
                    </div>
                )}
        </div>
    )
}

export default Chat

