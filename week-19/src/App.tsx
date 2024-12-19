import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket, setSocket]= useState< null| WebSocket>(null)
  const [message, setmessage]= useState('')
  const [sendmessage, setsendmessage]= useState('')
  useEffect(()=>{
    const socket=new WebSocket('ws://localhost:8080')
    socket.onopen=()=>{
      console.log('connected')
      setSocket(socket)
    }
    socket.onmessage=(message)=>{
      console.log('Recieved message is' ,message.data)
      setmessage(message.data)
    }

    return ()=>socket.close()
    
  },[])
if(!socket){
  return <div>
    loading..
  </div>
}
  return (
    
<>
<input onChange={(e)=>{
  setsendmessage(e.target.value)
}}></input>
<button onClick={()=>{
  socket.send(sendmessage)
}}></button>
{message}
</>
    
  )
}

export default App
