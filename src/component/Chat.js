import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
// import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import '../css/Chat.css';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../component/StateProvider/StateProvider';
import * as firebase from 'firebase';
import moment from 'moment';

function Chat() {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            document.querySelector('.chat').style.pointerEvents = "auto";
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            });

            db.collection('rooms').doc(roomId).collection('messages')
            .orderBy('timestamp', 'asc').onSnapshot((snapshot)=>{
                setMessages(snapshot.docs.map((doc)=>
                    doc.data()
                ))}
            )
        }

        
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 7000));
    }, []);

    useEffect(() => {
        var element = document.querySelector('.chat_body');
        element.scrollTop = element.scrollHeight;
    },[messages])

    

    const sendMessage = (e) => {
        e.preventDefault();

        if(input){
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: user?.displayName,
                email: user?.email,
                timestamp: firebase?.firestore?.FieldValue?.serverTimestamp()
            })
        }

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{ roomName }</h3>
                    {/* <p>last seen {moment(messages[messages.length -1]?.timestamp?.toDate()).format('llll')}</p> */}
                </div>

                <div className="chat_headerRight">
                    {/* <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton> */}
                </div>
            </div>

            <div className="chat_body">
                {messages?.map(message => (
                    <p className={`chat_message ${message?.email === user?.email && "chat_reciver"}`}>
                    <span className="chat_name">
                        {message?.name}
                    </span>
                    {message?.message}
                    <span className="chat_time">
                        {moment(message?.timestamp?.toDate()).format('lll')}
                    </span>
                </p>
                ))}
            </div>

            <div className="chat_footer">
                <IconButton className="emojiIcon">
                    <InsertEmoticonIcon />
                </IconButton>
                
                <form action="">
                    <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="Type a message" name="" id=""/>
                    <IconButton type="submit" onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                    {/* <button type="submit" onClick={sendMessage}>  </button> */}
                </form>
                <IconButton className="micIcon">
                    <MicIcon />
                </IconButton>
                
            </div>
        </div>
    )
}

export default Chat
