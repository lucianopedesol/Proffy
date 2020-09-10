import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
//  A cada requisição ele faz a conversão dos dados possibilitando a leitura de JSON
// express não lê JSON, precisa dessa função para isso
app.use(express.json());

app.use(routes);
app.listen(3333);