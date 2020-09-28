import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import ChatIcon from '@material-ui/icons/Chat';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import '../css/Sidebar.css';
import db from '../firebase';
import { useStateValue } from '../component/StateProvider/StateProvider'
import { actionTypes } from './StateProvider/Reducer';
import { useHistory } from 'react-router-dom';

function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [searchRooms, setSearchRooms] = useState(rooms);
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [searchText, setSearchText] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((snapshot)=>
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    )

    return () => {
      unsubscribe();
    }

  }, []);

  useEffect(() => {
    setSearchRooms(rooms)
  }, [rooms])
  

  const signOut = () => {
    localStorage.setItem('userData', null);
    dispatch({
      type: actionTypes.UNSET_USER,
      user: null
    })
    history.push("/");
  }

  const searchInput = (e) =>{
    let inputText = e.target.value;
    setSearchText(inputText);
    setSearchRooms(rooms.filter(val => val.data.name.includes(inputText)));
  }

  return (
    <div className="Sidebar">
      <div className="sidebar_header">
        <div className="display__name">
            <Avatar src={user?.photoURL} />
            <div style={{marginLeft: '10px'}}>{user?.displayName ? user?.displayName : "Guest"}</div>
        </div>
        
        <div className="sidebar_heraderRight">
            <IconButton onClick={signOut}>
                <ExitToAppIcon />
            </IconButton>
            {/* <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton> */}
            
        </div>
      </div>

      <div className="sidbar_search">
        <div className="sidebar_searchContainer">
            <SearchOutlinedIcon />
            <input type="text" value={searchText} onChange={searchInput} placeholder="Search or start new chat"/>
        </div>
        
      </div>

      <div className="sidebar_chats">
        <SidebarChat />
        {searchRooms.length ? searchRooms?.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        )) : (
          <div className="no_chat"><h3>No chat forund</h3></div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
