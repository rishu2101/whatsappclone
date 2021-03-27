import React from 'react'
import {useState} from 'react'
import './Popup.css'
import Suggestions from './Suggestions.js'

function Popup(props) {

    const [searchinput,setSearchInput] = useState('');

    const fetchSearchResult  = (searchtext) => {
        setSearchInput(searchtext);
        props.searchHandle(searchtext);
    }

    return (
        <div className="popup-box">
        <div className="box">
            <span className="close-icon-popup" onClick={props.handleClose}>x</span>
            <form>
                <input placeholder="Search for..." onChange={(e) => { fetchSearchResult(e.target.value)}}/>
                <Suggestions results={props.searchResult} searchInput={searchinput} addNeChatBox={props.addNeChatBox}/>
            </form>
        </div>
        </div>
    )
}

export default Popup



