
import React from 'react'

export default function VampireDie({die, onClick}){
	const hunger = ['bestial-fail', 'red-fail', 'red-success', 'red-crit'].includes(die.value) 

    return (<img 
    	className={['die', hunger ? 'hunger' : 'normal', die.selected ? 'selected' : null].join(' ')}
    	style={{cursor: !hunger ? 'pointer' : 'initial'}}
    	src={`images/${die.value}.png`}
    	onClick={!hunger ? () => onClick(die) : null}
    />)
}

