
import './App.css';
import React,{useState,useEffect} from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Avatar, Button, ListItemText, TextField, Typography } from '@material-ui/core';
function App() {
  const [messages,setMessages]=useState([])
  const [message,setMessage]=useState('')
  const [nickname,setNickname]=useState('')
  const [stompClient,setStompClient]=useState(null)
  useEffect(() => {
    let client = null;

    const connectToWebSocket = async () => {
      const socket = new SockJS('https://a315-2405-4802-1d7e-1170-e4bd-6b3-a642-7802.ngrok-free.app/ws');
      client = Stomp.over(socket);
      
      await new Promise((resolve, reject) => {
        client.connect({}, () => {
          resolve();
        }, (error) => {
          reject(error);
        });
      });

      setStompClient(client);
    };

    if (!stompClient) {
      connectToWebSocket();
    } else {
      // Khi stompClient được thiết lập, chỉ thực hiện subscribe một lần
      const subscription = stompClient.subscribe('/topic/messages', (response) => {
        setMessages(prevMessages => [...prevMessages, JSON.parse(response.body)]);
      });

      return () => {
        // Hủy đăng ký khi component bị unmount
        subscription.unsubscribe();
      };
    }
  }, [stompClient]);


  const handleNicknameChange=(e)=>{
    setNickname(e.target.value)
  }
  const handleMessageChange=(e)=>{
    setMessage(e.target.value)
  }
  const sendMessage=()=>{
    console.log(messages)
    if(message.trim()&&stompClient){
    stompClient.send("/app/chat",{},JSON.stringify({
      nickname:nickname,
      content:message
    }))
    setMessage('')
  }
  }

  return (
    <div style={{left:'20%',position:'relative',padding:'30px'}}>
        {messages.map((message,index)=>{
          return (
          <div key={index} style={{display:'flex'}}>
            <Avatar>{message.nickname.charAt(0)}</Avatar>
            <ListItemText primary={<Typography variant='subtitle1' gutterBottom>{message.nickname}</Typography>}
              secondary={message.content}></ListItemText> 
          </div>
          )
        })}
      <div style={{display:'flex',alignItems:'center'}}>
        <TextField label='Nickname' id='standard-basic' variant='standard' value={nickname} onChange={handleNicknameChange}></TextField>
        <TextField label='message' id='standard-basi' variant='standard' value={message} onChange={handleMessageChange}></TextField>
        <Button variant='contained' onClick={sendMessage} disabled={!message.trim()}>Send</Button>
      </div>
    </div>
  );
}

export default App;
