import express, { Express, Router } from "express";
import expressWs, {Instance as ExpressWS} from "express-ws";

const app: Express = express();   // Создание express приложения
const eWS: ExpressWS = expressWs(app); // Запуск WebSocket сервера
const WSS = eWS.getWss();

const router = Router();
app.use('/', router);

router.ws('/', (ws) => {
  console.log('WS connected');
  ws.on('message', (message) => {
    // Каждый клиент это WS
    console.log(message)
    WSS.clients.forEach(client => client.send(message));
  })
})

app.listen(3000, () => console.log('Server started'));