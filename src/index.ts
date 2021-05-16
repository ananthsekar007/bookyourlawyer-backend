import express from 'express';
import Sequelize from "../server/index";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import http from "http";
import "reflect-metadata";

export const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('The app is working');
});

app.use(cors());
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
app.use(bodyParser.json())

// app.listen(8000, async function () {
//   console.log('Example app listening on port 8000!');
//   try {
//     await Sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });

const httpServer = http.createServer(app);

export { httpServer }

