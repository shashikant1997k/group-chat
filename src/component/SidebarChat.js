import React, { useState, useEffect, useRef } from 'react'
import { Avatar } from '@material-ui/core';
import '../css/SidebarChat.css';
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChat(props) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    const myRef = useRef();

    useEffect(() => {
        if(props.id){
            db.collection('rooms').doc(props.id).collection('messages')
            .orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc)=>
                    doc.data()
                ))
            ))
        }
    }, [props.id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 7000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for group");

        if(roomName){
            db.collection('rooms').add({
                name: roomName
            })
        }
    }

    const mouseEnter = () =>{
        myRef.current.classList.add("activeChat")
    }
    const mouseLeave = () =>{
        myRef.current.classList.remove("activeChat")
    }

    return props.name ? (
        <Link to={`/rooms/${props.id}`}>
            <div className="sidebarChat" ref={myRef} onMouseEnter={mouseEnter} onMouseOut={mouseLeave}>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{props.name}</h2>
                    <p>{ messages[0]?.message }</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChat" ref={myRef} onMouseEnter={mouseEnter} onMouseOut={mouseLeave} onClick={createChat}>
            <h2>Add new Group</h2>
        </div>
    )
}

export default SidebarChat
