
import React from 'react'

export default function HistoryDisplay({
    children
}){
    return (<div className="history">
        {children.map((h,i) => {
            return (<div key={h.userName+i}>
                <div>{`${h.userName} a obtenu:`}</div>
                <div>
                    {h.result.map((v,i) => {
                        const hunger = ['bestial-fail', 'red-fail', 'red-success', 'red-crit'].includes(v)
                        return <img
                            key={v+i}
                            className={['die', hunger ? 'hunger' : null].join(' ')}
                            src={`images/${v}.png`}
                        />
                    })}
                </div>
            </div>)
        })}
    </div>)
}
