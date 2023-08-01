
import React from 'react'

import VampireDie from './vampire-die'

export default function RollDisplay({
    onReRoll,
    children,
    onClick
}){

	return (
        <div>
            <div>
                {children.result && children.result.map((r,i) => <VampireDie 
                    key={r+i} die={r} onClick={(die) => onClick(die)}></VampireDie>)}
            </div>
            <div>
                {children.comments && children.comments.map(c => <div key={c}>{c}</div>)}
            </div>
        </div>
    )
}
