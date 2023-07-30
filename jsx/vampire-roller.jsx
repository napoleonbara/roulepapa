
import React, {useState} from "react"

// TODO: put in utils.js
function toQueryString(obj){
    let elems = []
    for(let k in obj){
        if(obj[k]) elems.push(`${k}=${obj[k]}`)
    }
    if(elems.length > 0){
        return `?${elems.join('&')}`
    }else{
        return ''
    }
}

function MuteButton({state, onClick}){

	const [muted, setMuted] = useState(state)

	const cls = `mute-button ${muted?'muted':''}`
	const src = `/images/${muted?'muted.png':'unmuted.png'}`
	return <img className={cls} src={src} onClick={onClick} />
}

function NumberSelect(){
	return <div></div>
}

function RollDisplay(){
	return <div></div>
}

function HistoryDisplay(){
	return <div></div>
}

function WebsocketConnection(){
	return <div></div>
}

export default function VampireRoller({
	sound_effect,
	websocket,
	backend
}){
//	const {useState} = React
	console.log(React)
	const [userName, setUserName] = React.useState('')
	const [pool, setPool] = React.useState(1)
	const [hunger, setHunger] = React.useState(0)
	const [difficulty, setDifficulty] = React.useState(0)
	const [rerollDisabled, setRerollDisabled] = React.useState(true)
	const [rollResult, setRollResult] = React.useState([])
	const [history, setHistory] = React.useState([])
	const [muted, setMuted] = React.useState(false)


	async function submitRoll(){
        await handleRoll({
            userName,
            hunger,
            pool,
            difficulty
        })
	}

	async function submitHunger(){
        await handleRoll({
            userName,
            hunger: 0,
            pool: 1,
            difficulty: 1,
            hungerRoll: true 
        })
	}

    async function submitReroll(){
        let {ppool, reroll} = getRerollInfo(rollResult)
        await handleRoll({
            userName,
            hunger,
            pool,
            difficulty,
            ppool,
            reroll
        })
    }

	async function handleRoll(params){
        let response = await fetch(`${backend}${toQueryString(params)}`)
        let json = await response.json()
        
//        currentPool = [...json.result.hungerDice, ...json.result.normalDice]

        setRollResult(json.result)
        setRerollDisabled(true)
	}	

    return  (
    	<div id="roller">
            <MuteButton state={muted} onClick={setMuted(!muted)}></MuteButton>

            <label for="input-username">User Name:</label>
            <input type="text" name="username" onChange={(v) => setUserName(v)}></input>

            <label for="select-pool">Dice Pool:</label>
            <NumberSelect name="pool" range={[1,10]} value={pool} onChange={(v) => setPool(v)}/>

            <label for="select-pool">Hunger:</label>
            <NumberSelect name="hunger" range={[0,5]} value={hunger} onChange={(v) => setHunger(v)}/>

            <label for="select-difficulty">Difficulty:</label>
            <NumberSelect name="difficulty" range={[1,10]} value={difficulty} onChange={(v) => setDifficulty(v)}/>

            <input id="submit-roll" type="button" value="Roll" name="button-roll" onclick={submitRoll}></input>
            
            <input id="submit-hunger-test" type="button" value="Hunger Test" name="button-hunger" onclick={submitHunger}></input>
            
            <RollDisplay id="main-display" onReRoll={submitReRoll}>{rollResult}</RollDisplay>
            <HistoryDisplay id="history-display">{history}</HistoryDisplay>
   	        
   	        <WebsocketConnection endPoint={websocket}></WebsocketConnection>
	        <audio id="audio-dice-roll">
    	        <source src={sound_effect} type="audio/mpeg"></source>
        	</audio>
        </div>
    )
}
