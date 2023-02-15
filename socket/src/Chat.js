import React, { useState } from 'react'
import axios from 'axios'
let newSocket=null;
export default function Chat() {
    const [userdetails,setusedetails]=useState({
        username:"",
        password:"",
        number:""
    })
    const [online,setonline]=useState([])
    const [publicChats, setPublicChats] = useState([]);
    const[check ,setcheck]=useState({
        check1:false,
        check2:false
    })
    const[login,setlogin]=useState({
        number1:"",
        password1:""
    })
    const [userData, setUserData] = useState({
        username: "",
        message: ''
      });
    const signup=async()=>{
        console.log(userdetails)
        const result=await axios.post(`http://localhost:8081/web/post/${userdetails.username}/${userdetails.password}/${userdetails.number}`)
        console.log(result)
        setcheck({...check,check2:false})
    }
    const autherfication=async()=>{
        var result= await axios.get(`http://localhost:8081/web/get/${login.number1}/${login.password1}`)
        var result1= await axios.get(`http://localhost:8081/web/gets/${login.number1}/${login.password1}`)
        
        setUserData({...userData,username:result1.data})
        console.log(result.data)
        if (result.data){
            setcheck({...check,check1:true})
            const newSocket1 = new WebSocket('ws://localhost:8081/chat');
            newSocket1.onopen = (event) => {
                console.log("connected")
                newSocket1.send(result1.data)
            };
            console.log(check.check1)
            newSocket=newSocket1
            newSocket1.onmessage = (event) => {
                const data1 = JSON.parse(event.data);
                publicChats.push(data1);
                setPublicChats([...publicChats]); 
                };
            }
            newSocket.onclose=()=>{
                console.log("closed")
            }
            
    }
    const logoutfunction=()=>{
        newSocket.close();
        setcheck({...check,check1:false})
        
        setlogin({...login,number1:"",password1:""})
    }
    const signupdetails=()=>{
        setcheck({...check,check2:true})
    }
    const handlemessage=()=>{
        const json1={
            usernam1:userData.username,
            message1:userData.message
        }
        setUserData({...userData,message:""})
        if (newSocket){
            newSocket.send( JSON.stringify(json1))
        }
    }   
  return (
    <div className='whole' >
    <div>
      {check.check1?
        <div className='container1'>
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
                </div>
            </div>
            <div className="send-message">
                <input type="text" className="input-message" id="input" placeholder="Enter the message" value={userData.message} onChange={e=>setUserData({...userData,message:e.target.value})} /> 
                <button type="button" className="send-button" onClick={handlemessage}>send</button>
            </div>
        </div>:
        <div>
            {check.check2?
                <div>
                    <div className='container'>
                        <div className='row'>
                            
                            <div className='col-md-6 offset md-3 border rounded p-4 mt-2 shadow'>
                            
                                <div className='mb-3'>
                                    <label htmlFor='FolderName' className='form-label'>
                                        UserName
                                    </label>
                                    <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder='Enter UserName'
                                    name="FolderName"
                                    value={login.username_log}
                                    onChange={e=>setusedetails({...userdetails,username:e.target.value})}
                                    />
                                    <label htmlFor='FolderName' className='form-label'>
                                        Password
                                    </label>
                                    <input
                                    type={"password"}
                                    className="form-control"
                                    placeholder='Enter Password'
                                    name="FolderName"
                                    value={userdetails.password}
                                    onChange={e=>setusedetails({...userdetails,password:e.target.value})}
                                    />
                                    <label htmlFor='FolderName' className='form-label'>
                                        number
                                    </label>
                                    <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder='Enter Number'
                                    name="FolderName"
                                    value={userdetails.number}
                                    onChange={e=>setusedetails({...userdetails,number:e.target.value})}
                                    />
                                    <br></br>
                                    <button type="submit" className='btn btn-primary' onClick={signup}>Submit</button>
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            :
            <div>   
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset md-3 border rounded p-4 mt-2 shadow' id='abcd'>
                            
                                <div className='mb-3'>
                                    <label htmlFor='FolderName' className='form-label'>
                                        Number
                                    </label>
                                    <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder='Enter Number'
                                    name="FolderName"
                                    value={login.number1}
                                    onChange={e=>setlogin({...login,number1:e.target.value})}
                                    />
                                    <label htmlFor='FolderName' className='form-label'>
                                        Password
                                    </label>
                                    <input
                                    type={"password"}
                                    className="form-control"
                                    placeholder='Enter Password'
                                    name="FolderName"
                                    value={login.password1}
                                    onChange={e=>setlogin({...login,password1:e.target.value})}
                                    />
                                    <br></br>
                                    <button type="submit" className='btn btn-primary' onClick={autherfication}>Submit</button>
                                    
                                    <button type="submit" id='buttonid' className='btn btn-primary' onClick={signupdetails}>Sign up</button>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
      }
    </div>
    </div>
  )
}
