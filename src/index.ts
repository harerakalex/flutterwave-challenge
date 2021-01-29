import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { indexRouter } from './apis';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(indexRouter);
app.use((_req: Request, res: Response) => {
  res.status(404).json({ status: 404, error: 'Endpoint route not found' });
});

app.listen(port, () => {
  console.log(`Server Listening on Port: ${port}`);
});
