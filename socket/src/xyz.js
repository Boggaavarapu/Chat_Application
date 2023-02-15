import React,{useState} from 'react'

export default function xyz() {
    
  return (
    <div  className='container' >
       <div className='right'>
            <div className="chat-box">
                <div className="inside">
                    <h2>Chatroom  {userData.username}</h2>
                    <button className="send-button" onClick={logoutfunction}>Logout</button></div>
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
        </div>
    </div>
  )
}
