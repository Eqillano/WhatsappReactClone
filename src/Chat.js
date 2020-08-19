import React,{useState,useEffect} from 'react'
import "./Chat.css"
import {Avatar} from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [seed,setSeed]  = useState(''); 
    const [input,setInput] = useState('')
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState('');
    const [messages,setMessages] = useState([])
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId)
            .onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)));

            db.collection('rooms').doc(roomId).
            collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => 
                    doc.data()))
            )
                )

        }
    },[roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    },[roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            user:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chatheader__info'>
                    <h3>{roomName}</h3>
                    <p> last seen {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                </div>
                <div className='chat__body'>
                    {messages.map(message => (
                        <p className=
                        {`chat_message ${true} && "chat_receiver"}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                    ))}
                      
                </div>
                    <div className='chat__footer'>
                        <InsertEmoticonIcon/>
                        <form>
                            <input type='text' value={input} onChange={ e => setInput(e.target.value)}/>
                            <button onClick={sendMessage}type='submit'>Send a message</button>
                        </form>
                        <MicIcon/>
                        </div>
            </div>
    )
}

export default Chat
