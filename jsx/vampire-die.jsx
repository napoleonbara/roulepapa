
import React from 'react'
import '../css/vampire-styles.css'

import bestialFail from '../images/bestial-fail.png'
import redFail from '../images/red-fail.png'
import redSuccess from '../images/red-success.png'
import redCrit from '../images/red-crit.png'
import normalFail from '../images/normal-fail.png'
import normalSuccess from '../images/normal-success.png'
import normalCrit from '../images/normal-crit.png'

const images = {
    'bestial-fail': bestialFail,
    'red-fail': redFail,
    'red-success': redSuccess,
    'red-crit': redCrit,
    'normal-fail': normalFail,
    'normal-success': normalSuccess,
    'normal-crit': normalCrit
}

function imageFor(die){
    return images[die.value]
}

export default function VampireDie({die, onClick}){
	const hunger = ['bestial-fail', 'red-fail', 'red-success', 'red-crit'].includes(die.value) 

    return (<img 
    	className={['die', hunger ? 'hunger' : 'normal', die.selected ? 'selected' : null].join(' ')}
    	style={{cursor: !hunger ? 'pointer' : 'initial'}}
    	src={imageFor(die)}
    	onClick={!hunger ? () => onClick(die) : null}
    />)
}

