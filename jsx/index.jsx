import React from 'react'
import ReactDOM from 'react-dom/client'

import VampireRoller from "./vampire-roller.js"

let root = document.getElementById('root')

ReactDOM.createRoot(root).render(
    <VampireRoller
        backend='/api'
        websocket={`ws://${window.location.host}/ws/vampire`}
        sound_effect='/sounds/dice-roll.mp3'
        images={{
            'bestial-fail':   '/images/bestial-fail.png',
            'red-fail':       'images/red-fail.png',
            'red-success':    'images/red-success.png',
            'red-crit':       'images/red-crit.png',
            'normal-fail':    'images/normal-fail.png',
            'normal-success': 'images/normal-success.png',
            'normal-crit':    'images/normal-crit.png'                    
        }}
    ></VampireRoller>)