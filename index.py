from sanic import Sanic, Request, Websocket, file, empty
from random import randint
from json import dumps as dumpjson
from dotenv import load_dotenv
import os

app = Sanic("WebsocketApp")

app.ctx.wsConnectionPool = []



@app.get('/scripts/<path>')
async def static(request: Request, path: str):
    return await file('dist/'+path)

@app.get('/vampire-roller')
async def vampireTop(request: Request):
    return await file('dist/vampire.html')

@app.get('/images/<path>')
async def images(request: Request, path: str):
    return await file('images/'+path)

@app.get('/css/<path>')
async def css(request: Request, path: str):
    return await file('css/'+path)

@app.get('/sounds/<path>')
async def sounds(request: Request, path: str):
    return await file('sounds/'+path)


@app.get('/api/report')
async def reportRollApi(request: Request):
    userName = request.args.get('userName', None)
    result = request.args.get('result', '').split(',')
    
    print(f'received report userName:{userName}, result:{result}')

    await report(userName, result)
    return empty(200)

@app.websocket("/ws/vampire")
async def feed(request: Request, ws: Websocket):
    
    app.ctx.wsConnectionPool.append(ws)

    async for msg in ws:
        print("Received: " + msg)

async def report(userName, result):
    for ws in app.ctx.wsConnectionPool:
        try:
            await ws.send(dumpjson({'userName': userName, 'result': result}))
        except Exception:
            app.ctx.wsConnectionPool.remove(ws)

if __name__ == '__main__':
    load_dotenv()
    app.run(host=os.environ['ROULEPAPA_HOST'], port=int(os.environ['ROULEPAPA_PORT']))