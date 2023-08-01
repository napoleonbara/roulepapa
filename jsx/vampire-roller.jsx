
import React, {useState, useEffect} from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';

import {toQueryString, range} from './utils'
import MuteButton from './mute-button'
import NumberSelect from './number-select'
import WebsocketConnection from './websocket-connection'
import HistoryDisplay from './history-display'
import RollDisplay from './roll-display'

import {getComments, rollHungerDie, rollNormalDie} from './vampire-dice-utils'


export default function VampireRoller({
	sound_effect,
	websocket,
	backend
}){
	const [userName, setUserName] = useState('')
	const [pool, setPool] = useState(1)
	const [hunger, setHunger] = useState(0)
	const [difficulty, setDifficulty] = useState(0)
	const [rerollDisabled, setRerollDisabled] = useState(true)
	const [rollResult, setRollResult] = useState([])
	const [history, setHistory] = useState([])
	const [muted, setMuted] = useState(false)

    const { sendMessage, lastMessage, readyState } = useWebSocket(websocket);

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data)
            setHistory((prev) => [data, ...prev].slice(0, 10));
        }
    }, [lastMessage, setHistory]);

	async function submitRoll(pool, hunger, difficulty, userName){
        const diceResult = [
            ...range(hunger).map(rollHungerDie),
            ...range(Math.max(pool-hunger, 0)).map(rollNormalDie)
        ].map(v => { return {value: v, selected: false} })

        const comments = getComments(diceResult, difficulty)

        handleRoll({result: diceResult, reroll: true, comments, userName})
	}

	async function submitHunger(userName){
        const dieResult = ['bestial-fail', 'normal-success'][Math.floor(Math.random()*2)]
        const comments = dieResult === 'bestial-fail' ? ["t'as faim"] : ["t'as pas faim"]
        handleRoll({result: [{value: dieResult, selected: false}], reroll: false, comments, userName})
	}

    async function submitReRoll(difficulty, userName){

        rollResult.result.forEach(r => {
            if(r.selected){
                r.value = rollNormalDie()
                r.selected = false
            }
        })

        const comments = getComments(rollResult.result, difficulty)

        handleRoll({result: rollResult.result, reroll: false, comments, userName})        
    }

	async function handleRoll(params){

        const queryParams = {
            userName: (!params.userName || params.userName.length === 0) ? "quelqu'un" : params.userName,
            result: params.result.map(d => d.value)
        }

        fetch(`${backend}/report${toQueryString(queryParams)}`)
        
        setRollResult(params)
        setRerollDisabled(!params.reroll)
        playDiceRollSound()
	}	

    console.log({
        userName: userName,
        pool: pool,
        hunger: hunger,
        difficulty: difficulty,
        rerollDisabled: rerollDisabled,
        rollResult: rollResult,
        history: history,
        muted: muted,
    })

    function onReRollSelect(die){
        
        if(die.selected){
            die.selected = false
        }else if(rollResult.result && rollResult.result.filter(d => d.selected).length < 3 && rollResult.reroll){
            die.selected = true
        }

        setRollResult(Object.assign({}, rollResult))
    }

    function playDiceRollSound(){
        let audio = document.getElementById('audio-dice-roll')
        if(!muted){
            audio.play()   
        }
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    console.log(`The WebSocket is currently ${connectionStatus}`)

    return  (
    	<div id="roller">
            <MuteButton init={muted} onClick={(b) => setMuted(b)}></MuteButton>

            <label htmlFor="input-username">User Name:</label>
            <input type="text" name="username" onChange={(e) => setUserName(e.target.value)}></input>

            <label htmlFor="select-pool">Dice Pool:</label>
            <NumberSelect name="pool" range={range(10, 1)} init={pool} onChange={(v) => setPool(v)}/>

            <label htmlFor="select-pool">Hunger:</label>
            <NumberSelect name="hunger" range={range(5)} init={hunger} onChange={(v) => setHunger(v)}/>

            <label htmlFor="select-difficulty">Difficulty:</label>
            <NumberSelect name="difficulty" range={range(10)} init={difficulty} onChange={(v) => setDifficulty(v)}/>

            <input 
                type="button"
                value="Roll"
                name="button-roll"
                onClick={() => submitRoll(pool, hunger, difficulty, userName)}>
            </input>
            
            <input
                type="button"
                value="Hunger Test"
                name="button-hunger"
                onClick={() => submitHunger()}
            ></input>
            
            <RollDisplay onClick={(die) => onReRollSelect(die)}>{rollResult}</RollDisplay>
            {rollResult.reroll &&
                <input type="button" value="Re-roll" name="button-reroll" 
                    disabled={!rollResult.result.some(r => r.selected)}
                    onClick={() => submitReRoll(difficulty, userName)} />
            }
            <HistoryDisplay >{history}</HistoryDisplay>
   	        
	        <audio id="audio-dice-roll">
    	        <source src={sound_effect} type="audio/mpeg"></source>
        	</audio>
        </div>
    )
}
