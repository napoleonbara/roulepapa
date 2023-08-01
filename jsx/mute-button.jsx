
import React, {useState} from 'react'

export default function MuteButton({init, onClick}){

	const [muted, setMuted] = useState(init)

    function handleClick(){
        setMuted(!muted)
        onClick(!muted)
    }

	const cls = `mute-button ${muted?'muted':''}`
	const src = `/images/${muted?'muted.svg':'speaker.svg'}`
	return <img 
        className={cls} 
        src={src}
        onClick={handleClick}
        width="36" height="36"
        style={{cursor: 'pointer'}}
    />
}
