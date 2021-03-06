import React, { useState } from 'react'
import "./_header.scss"
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps} from 'react-icons/md'
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

function Header({handelToggleSidebar}) {
    const [input, setInput] = useState("")
    const  history = useHistory()
    const {photoURL} = useSelector(state => state.auth?.user)
    const handelSubmit = (e) => {
        e.preventDefault()
        history.push(`/search/${input}`)
        setInput("")
    }
    return (
        <div className="header">
             <FaBars className="header__menu" size={26}
             onClick={() => handelToggleSidebar()}
             
             />
            <img src="https://pngimg.com/uploads/youtube/youtube_PNG102352.png" className="header__logo" alt="youtubelogo"/>
           <form onSubmit={handelSubmit}>
               <input type="text" placeholder="Search" value={input} onChange={e => setInput(e.target.value)}/>
               <button type="submit" ><AiOutlineSearch size={22} /></button>
           </form>
           <div className="header__icons">
            <MdNotifications size={28} />
            <MdApps size={28} />
            <img src={photoURL} alt="userimage" />
           </div>
        </div>
    )
}

export default Header
