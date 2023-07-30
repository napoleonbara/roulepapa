
function VampireDie({hunger, value}){
    value = Number(value)
    let image = hunger ? [
        'bestial-fail.png',
        'red-fail.png',
        'red-fail.png',
        'red-fail.png',
        'red-fail.png',
        'red-success.png',
        'red-success.png',
        'red-success.png',
        'red-success.png',
        'red-crit.png'
    ][value-1] :
    [
        'normal-fail.png',
        'normal-fail.png',
        'normal-fail.png',
        'normal-fail.png',
        'normal-fail.png',
        'normal-success.png',
        'normal-success.png',
        'normal-success.png',
        'normal-success.png',
        'normal-crit.png'
    ][value-1]

    return <img className={['die', hunger?'hunger':null].join(' ')} src={`images/${image}`} />
}

function Display(){
	return (
		<div>
			<VampireDie hunger value="1"/>
			<VampireDie hunger value="2"/>
			<VampireDie hunger value="3"/>
			<VampireDie hunger value="4"/>
			<VampireDie hunger value="5"/>
			<VampireDie hunger value="6"/>
			<VampireDie hunger value="7"/>
			<VampireDie hunger value="8"/>
			<VampireDie hunger value="9"/>
			<VampireDie hunger value="10"/>
			<VampireDie value="1"/>
			<VampireDie value="2"/>
			<VampireDie value="3"/>
			<VampireDie value="4"/>
			<VampireDie value="5"/>
			<VampireDie value="6"/>
			<VampireDie value="7"/>
			<VampireDie value="8"/>
			<VampireDie value="9"/>
			<VampireDie value="10"/>
		</div>
	)
}