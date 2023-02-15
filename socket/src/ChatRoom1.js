import React,{useState} from 'react'

let newSocket=null;
export default function ChatRoom1() {
    
    const [publicChats, setPublicChats] = useState([]);
    const [userData, setUserData] = useState({
        username: '',
        connected: false,
        message: ''
      });
    const connect=()=>{
        const newSocket1 = new WebSocket('ws://localhost:8080/chat');
        newSocket1.onopen = (event) => {
            console.log(event.data);
            setUserData({...userData,"connected": true})
          };
        newSocket1.onerror=(error)=>{   
            console.log(error)
        }
        // newSocket1.onmessage = function (event) {
        //     var statusCode = event.data;
        //     console.log('inside');
        //     // Update the UI based on the status code
        //     if (statusCode === '404') {
        //       console.error('Error: Endpoint not found');
        //     } else if (statusCode === '500') {
        //       console.error('Error: Server error');
        //     }
        //     else if (statusCode === '101'){
        //         console.log('sucess');
        //     }
        //   };
        newSocket=newSocket1
        newSocket.onmessage = (event) => {
            console.log(event.target)
            console.log(event.data)
            const data1 = JSON.parse(event.data);
            publicChats.push(data1);
            setPublicChats([...publicChats]); 
            };
    }
    const close=(event)=>{
        console.log(newSocket.readyState)
        newSocket.close();
        console.log(newSocket.readyState.onopen)
        setUserData({...userData,"connected": false})
        console.log(newSocket.readyState)
    }
    
    const handlemessage=()=>{
        const json1={
            usernam1:userData.username,
            message1:userData.message
        }
        if (newSocket){
            newSocket.send( JSON.stringify(json1))
        }
        setUserData({...userData,message:""})
    }   
  return (
    <div className="container">
        {userData.connected?
            <div className="chat-box">
                <div className="inside">
                <h2>Chatroom  {userData.username}</h2>
                <button className="send-button" onClick={close}>Logout</button></div>
                <div className="chat-content">
                    <ul className="chat-messages">
                    {publicChats.map(chat=>( 
                            <li className='box'>
                                <div className="avatar">{chat.usernam1}<span>  </span></div>
                                <div className="message-data"> {chat.message1}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="send-message">
                        <input type="text" className="input-message" id="input" placeholder="Enter the message" value={userData.message} onChange={e=>setUserData({...userData,message:e.target.value})} /> 
                        <button type="button" className="send-button" onClick={handlemessage}>send</button>
                        

                    </div>
                </div>
            </div>
            :
            <div className="register">
                <input
                    id="user-name"
                    placeholder="Enter your name"
                    name="userName"
                    value={userData.username}
                    onChange={e=>setUserData({...userData,username:e.target.value})}
                    margin="normal"
                />
                <button type="button" className="regbutton " onClick={connect}>
                        connect
                </button> 
            </div>
        }
    </div>
  )
}

