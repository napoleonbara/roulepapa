

export function toQueryString(obj){

    let elems = []
    for(let k in obj){
        if(obj[k] != undefined) elems.push(`${k}=${obj[k]}`)
    }
    if(elems.length > 0){
        return `?${elems.join('&')}`
    }else{
        return ''
    }
}

export function range(size, startAt=0){
    return [...Array(size).keys()].map(v => v+startAt)
}