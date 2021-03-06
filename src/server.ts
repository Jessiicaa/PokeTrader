import express from 'express';
import { env } from 'process';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.listen((env.PORT || 3333), () => {
  console.log(`Server started on port ${env.PORT || 3333}!`);
});
