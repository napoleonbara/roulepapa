

export function getComments(diceResult, difficulty){
    console.log(diceResult, difficulty)

    diceResult = diceResult.map(e => e.value) 
    
    const crits = diceResult.filter(x => x.includes('crit')).length
    const successes = diceResult.filter(x => x.includes('success')).length
    const total = successes + crits + (crits - (crits % 2))

    const messies = diceResult.filter(x => x.includes('red-crit')).length
    const bestials = diceResult.filter(x => x.includes('bestial')).length

    let comments = [`${total} succes`]

    if(difficulty > 0) {
        if(total >= difficulty) { 
            if(crits >= 2) {
                if(messies >= 1) {
                    comments.push('triomphe brutal!')
                } else {
                    comments.push('succes critique!')
                }
            } else {
                comments.push('succes')
            }
        } else if (total > 0) {
            if(bestials >= 1) {
                comments.push('echec bestial!')
            } else {
                comments.push('echec')
            }
        } else {
            if(bestials >= 1) {
                comments.push('echec bestial!')
            } else {
                comments.push('echec total')
            }    
        }
    } else {
        if(crits >= 2) {
            if(messies >= 1) {
                comments.push('possible triomphe brutal!')
            } else {
                comments.push('possible succes critique!')
            }
        }
        if (total > 0) {
            if(bestials >= 1) {
                comments.push('possible echec bestial!')
            }
        } else {
            if(bestials >= 1) {
                comments.push('possible echec bestial!')
            } else {
                comments.push('echec total')
            }    
        }
    }

    return comments
}

export function rollHungerDie(){
    return [
        'bestial-fail',
        'red-fail',
        'red-fail',
        'red-fail',
        'red-fail',
        'red-success',
        'red-success',
        'red-success',
        'red-success',
        'red-crit'
    ][Math.floor(Math.random()*10)]
}

export function rollNormalDie(){
    return [
        'normal-fail',
        'normal-fail',
        'normal-fail',
        'normal-fail',
        'normal-fail',
        'normal-success',
        'normal-success',
        'normal-success',
        'normal-success',
        'normal-crit'
    ][Math.floor(Math.random()*10)]
}

 