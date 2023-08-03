import React, {useState, useEffect} from 'react'

export default function WebsocketConnection({
    endPoint,
    onMessage
}){
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        console.log("setting websocket")
        const newSocket = new WebSocket(endPoint)
        setSocket(newSocket)

        newSocket.addEventListener('open', (event) => {
            newSocket.send('Hello, server!')
        })

        newSocket.addEventListener('message', (m) => {
            console.log("received missive")
            onMessage(m)
        })
    }, []);
}
