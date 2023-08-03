import React from 'react'
import ReactDOM from 'react-dom/client'

import VampireRoller from './vampire-roller'

import favicon from '../images/favicon.ico'
import diceSound from '../sounds/dice-roll.mp3'

let root = document.getElementById('root')
var head = document.getElementsByTagName('head')[0]

ReactDOM.createRoot(head).render(<link rel="icon" type="image/x-icon" href={favicon}></link>)

ReactDOM.createRoot(root).render(
    <VampireRoller
        backend='/api'
        websocket={`ws://${window.location.hostname}:8000/ws/vampire`}
        sound_effect={diceSound}
    ></VampireRoller>)