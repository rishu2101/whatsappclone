import React from 'react'
import {Link} from 'react-router-dom'
const Suggestions = (props) => {
    const options =   props.results.filter(result => result.includes(props.searchInput)).map(room => (
        <li key={room}>
            <Link to={`/${room}`} >
            {room}
            </Link>
        </li>
    ))
  return <ul>{options}</ul>
}

export default Suggestions