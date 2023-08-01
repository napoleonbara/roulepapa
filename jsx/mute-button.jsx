
import React, {useState} from 'react'
import mutedIcon from '../images/muted.svg'
import speakerIcon from '../images/speaker.svg'

export default function MuteButton({init, onClick}){

	const [muted, setMuted] = useState(init)

    function handleClick(){
        setMuted(!muted)
        onClick(!muted)
    }

	return <img 
        className={`mute-button ${muted?'muted':''}`} 
        src={muted ? mutedIcon : speakerIcon}
        onClick={handleClick}
        width="36" height="36"
        style={{cursor: 'pointer'}}
    />
}
