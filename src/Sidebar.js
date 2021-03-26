import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarChat from "./SidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import DonutLargeIcon from "@material-ui/icons/DonutLarge";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, Redirect } from "react-router-dom";
import db from "./firebase.js";
// import firebase from "firebase";
import Popup from "./Popup";
import ChatIcon from '@material-ui/icons/Chat';
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Sidebar() {
  const history = useHistory();

  const [user, dispatch] = useStateValue();

  const [isOpen, setIsOpen] = useState(false);

  const [logout, setLogOut] = useState(false);

  const [searchinput, setSearchInput] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [rooms, setRooms] = useState([]);

  // function to logout user on button click
  const logoutuser = () => {
    localStorage.clear();
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
    setLogOut(true);
    let path = `/`;
    history.push(path);
  };


  // function to filter chats
  const searchHandle = (searchText) => {
    setSearchResult([]);
    if (searchText !== "") {
      db.collection("chat_users")
        .where("email", "!=", user.user.email)
        .get()
        .then((querySnapshot) => {
          setSearchResult(querySnapshot.docs.map((doc) => doc.data().email));
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      } else {
        setSearchResult([]);
      }
    };


  // Hook to be executed if user email is changed or any new room is added
  useEffect(() => {
    var room_array = [];
    db.collection("chat")
    .where("emails", "array-contains", user.user.email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().emails[0] !== user.user.email) {
            room_array = [...room_array, {
              email : doc.data().emails[0],
              id : doc.id,
            }];
          } else {
            room_array = [...room_array, {
              email : doc.data().emails[1],
              id : doc.id,
            }];
          }
        });
        setRooms(room_array);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
  }, [user.user.email]);

  if (logout) {
    return <Redirect to="/" />;
  }
  // console.log(rooms);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton>
          <Avatar src={user.user.photoURL} />
        </IconButton>
        <div className="sidebar_header_right">
          <IconButton onClick={logoutuser}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_search_container">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <form>
            <input
              type="text"
              value={searchinput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
            />
          </form>
        </div>
      </div>

      {isOpen && (
        <Popup
          handleClose={togglePopup}
          searchResult={searchResult}
          searchHandle={searchHandle}
        />
      )}
      <div className="sidebar_chats">
        {/* <SidebarChat key="new_chat" newChat="1" handlePopup={togglePopup} /> */}
        {rooms &&
          rooms
            .filter((roomName) => roomName.email.includes(searchinput))
            .map((room) => <SidebarChat id={room.id} name={room.email} key={room.id} />)}
      </div>
        <div className="sidebar_footer" onClick={togglePopup}>
            <IconButton><ChatIcon/></IconButton>
        </div>
    </div>
  );
}

export default Sidebar;
