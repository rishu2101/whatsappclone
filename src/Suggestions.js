import React from 'react'
const Suggestions = (props) => {

    

    const options =   props.results.filter(result => result.includes(props.searchInput)).map(room => (
        <li key={room} onClick={() => props.addNeChatBox(room)}>
            {/* <Link to={`/${room}`} > */}
            {room}
            {/* </Link> */}
        </li>
    ))
  return <ul>{options}</ul>
}

export default Suggestions