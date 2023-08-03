
import React, {useState} from 'react'

export default function NumberSelect({
    name,
    range,
    init,
    onChange
    
}){
    const [value, setValue] = useState(init)

    function handleChange(e){
        onChange(Number(e.target.value))
    }
	return (<select name={name} onChange={handleChange}>
        {range.map(v => <option key={v} value={v} select={(v===value).toString()}>{v}</option>)}
    </select>)
}
