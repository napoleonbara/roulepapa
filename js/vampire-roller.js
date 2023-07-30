
import React, { useState } from "react";

// TODO: put in utils.js
function toQueryString(obj) {
    let elems = [];
    for (let k in obj) {
        if (obj[k]) elems.push(`${k}=${obj[k]}`);
    }
    if (elems.length > 0) {
        return `?${elems.join('&')}`;
    } else {
        return '';
    }
}

function MuteButton({ state, onClick }) {

    const [muted, setMuted] = useState(state);

    const cls = `mute-button ${muted ? 'muted' : ''}`;
    const src = `/images/${muted ? 'muted.png' : 'unmuted.png'}`;
    return React.createElement('img', { className: cls, src: src, onClick: onClick });
}

function NumberSelect() {
    return React.createElement('div', null);
}

function RollDisplay() {
    return React.createElement('div', null);
}

function HistoryDisplay() {
    return React.createElement('div', null);
}

function WebsocketConnection() {
    return React.createElement('div', null);
}

export default function VampireRoller({
    sound_effect,
    websocket,
    backend
}) {
    //	const {useState} = React
    console.log(React);
    const [userName, setUserName] = React.useState('');
    const [pool, setPool] = React.useState(1);
    const [hunger, setHunger] = React.useState(0);
    const [difficulty, setDifficulty] = React.useState(0);
    const [rerollDisabled, setRerollDisabled] = React.useState(true);
    const [rollResult, setRollResult] = React.useState([]);
    const [history, setHistory] = React.useState([]);
    const [muted, setMuted] = React.useState(false);

    async function submitRoll() {
        await handleRoll({
            userName,
            hunger,
            pool,
            difficulty
        });
    }

    async function submitHunger() {
        await handleRoll({
            userName,
            hunger: 0,
            pool: 1,
            difficulty: 1,
            hungerRoll: true
        });
    }

    async function submitReroll() {
        let { ppool, reroll } = getRerollInfo(rollResult);
        await handleRoll({
            userName,
            hunger,
            pool,
            difficulty,
            ppool,
            reroll
        });
    }

    async function handleRoll(params) {
        let response = await fetch(`${backend}${toQueryString(params)}`);
        let json = await response.json();

        //        currentPool = [...json.result.hungerDice, ...json.result.normalDice]

        setRollResult(json.result);
        setRerollDisabled(true);
    }

    return React.createElement(
        'div',
        { id: 'roller' },
        React.createElement(MuteButton, { state: muted, onClick: setMuted(!muted) }),
        React.createElement(
            'label',
            { 'for': 'input-username' },
            'User Name:'
        ),
        React.createElement('input', { type: 'text', name: 'username', onChange: v => setUserName(v) }),
        React.createElement(
            'label',
            { 'for': 'select-pool' },
            'Dice Pool:'
        ),
        React.createElement(NumberSelect, { name: 'pool', range: [1, 10], value: pool, onChange: v => setPool(v) }),
        React.createElement(
            'label',
            { 'for': 'select-pool' },
            'Hunger:'
        ),
        React.createElement(NumberSelect, { name: 'hunger', range: [0, 5], value: hunger, onChange: v => setHunger(v) }),
        React.createElement(
            'label',
            { 'for': 'select-difficulty' },
            'Difficulty:'
        ),
        React.createElement(NumberSelect, { name: 'difficulty', range: [1, 10], value: difficulty, onChange: v => setDifficulty(v) }),
        React.createElement('input', { id: 'submit-roll', type: 'button', value: 'Roll', name: 'button-roll', onclick: submitRoll }),
        React.createElement('input', { id: 'submit-hunger-test', type: 'button', value: 'Hunger Test', name: 'button-hunger', onclick: submitHunger }),
        React.createElement(
            RollDisplay,
            { id: 'main-display', onReRoll: submitReRoll },
            rollResult
        ),
        React.createElement(
            HistoryDisplay,
            { id: 'history-display' },
            history
        ),
        React.createElement(WebsocketConnection, { endPoint: websocket }),
        React.createElement(
            'audio',
            { id: 'audio-dice-roll' },
            React.createElement('source', { src: sound_effect, type: 'audio/mpeg' })
        )
    );
}