import React,{useState,useEffect} from 'react'
import "./Chat.css"
import {Avatar} from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom';
import db from './firebase';

function Chat() {
    const [seed,setSeed]  = useState(''); 
    const [input,setInput] = useState('')
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState('');

    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId)
            .onSnapShot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
    },[roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    },[roomId])

    const sendMessage = (e) => {
        e.preventDefault()
        setInput('');
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chatheader__info'>
                    <h3>{roomName}</h3>
                    <p>Last seen at...</p>
                </div>
                </div>
                <div className='chat__body'>

                        <p className=
                        {`chat_message ${true} && "chat_receiver"}`}>
                        <span className='chat__name'>Sergey Vanteev</span>
                        <span className='chat__timestamp'>
                        </span>
                    </p>
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
