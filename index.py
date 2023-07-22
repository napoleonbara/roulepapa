from sanic import Sanic, Request, Websocket, file, text, json
from random import randint
from json import dumps as dumpjson


app = Sanic("WebsocketApp")

@app.get('/vampire-roller')
async def vampireTop(request: Request):
    return await file('vampire.html')

@app.get('/images/<path>')
async def image(request: Request, path: str):
    return await file('images/'+path)

def d10():
    return randint(1,10)

def countSuccesses(rolls):
    crits = 0
    succes = 0
    for d in rolls:
        if d > 5: succes += 1
        if d == 10: crits += 1
    succes = succes + (crits - (crits % 2))
    return succes, crits >= 2

def checkBestial(hungerDice):
    return any(d == 1 for d in hungerDice)

def checkMessy(hungerDice):
    return any(d == 10 for d in hungerDice)

def firstRoll(pool):
    return [d10() for i in range(pool)]

def reRoll(rolls, rerolls):
    rolls = rolls[:]
    for i in rerolls:
        rolls[i-1] = d10()
    return rolls

def vampireRoll(pool, hunger):
    rolls = firstRoll(pool)
    hungerDice = rolls[:hunger]
    normalDice = rolls[hunger:]
    successes, crit = countSuccesses(rolls)
    bestial = checkBestial(hungerDice)
    messy = checkMessy(hungerDice)

    return {
        'hungerDice': hungerDice,
        'normalDice': normalDice,
        'successes': successes,
        'possibleBestial': bestial,
        'possibleMessy': crit and messy
    }

def vampireReroll(rolls, rerolls, hunger):
    rolls = reRoll(rolls, rerolls)
    hungerDice = rolls[:hunger]
    normalDice = rolls[hunger:]
    successes, crit = countSuccesses(rolls)
    bestial = checkBestial(hungerDice)
    messy = checkMessy(hungerDice)

    return {
        'hungerDice': hungerDice,
        'normalDice': normalDice,
        'successes': successes,
        'rerolls': rerolls,
        'possibleBestial': bestial,
        'possibleMessy': crit and messy
    }

def commentRoll(result, difficulty):
    comments = [str(result['successes']) + ' ' + ('successes' if result['successes'] > 1 else 'success')]
    if difficulty != 0 and result['successes'] >= difficulty and result['possibleMessy']:
        comments.append("messy critical")
    if difficulty == 0 and result['possibleMessy']:
        comments.append("possible messy critical")
    if difficulty != 0 and result['successes'] < difficulty and result['possibleBestial']:
        comments.append("bestial failure")
    if difficulty == 0 and result['possibleBestial']:
        comments.append("possible bestial failure")
    if result['successes'] == 0:
        comments.append("total failure")
    elif difficulty != 0 and result['successes'] < difficulty and 'bestial failure' not in comments:
        comments.append("failure")
    if difficulty != 0 and result['successes'] >= difficulty and 'messy critical' not in comments:
        comments.append("success")

    return comments

@app.get('/api/roll/vampire')
async def vampireRollApi(request: Request):
    username = request.args.get('username', None)
    hunger = int(request.args.get('hunger', None))
    pool = int(request.args.get('pool', None))
    difficulty = int(request.args.get('difficulty', None))

    ppool = request.args.get('ppool', None)
    ppool = None if ppool is None else [int(x) for x in (ppool.split(","))]
    reroll = request.args.get('reroll', None)
    reroll = None if reroll is None else [int(x) for x in (reroll.split(","))]

    result = vampireRoll(pool, hunger) if ppool is None else vampireReroll(ppool, reroll, hunger)

    comments = commentRoll(result, difficulty)

    published = {
        'hungerDice': result['hungerDice'],
        'normalDice': result['normalDice'],
        'successes': result['successes'],
        'comment': comments
    }

    if 'rerolls' in result:
        published['rerolls'] = result['rerolls']

    await report(username, published)
    return json({'result': published, 'username': username})

@app.websocket("/ws/vampire")
async def feed(request: Request, ws: Websocket):
    
    app.ctx.ws = ws

    async for msg in ws:
        print("Received: " + msg)

async def report(username, result):
    await app.ctx.ws.send(dumpjson({'username': username, 'result': result}))

if __name__ == '__main__':
    app.run()