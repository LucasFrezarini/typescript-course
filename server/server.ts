import * as http from "http";
import Api from './api/api';

let config = require('./config/env/config')();
let models = require('./models');

console.log(config);

models.sequelize.sync().then(() => {
  const server = http.createServer(Api);
  server.listen(config.serverPort);
  server.on("listening", () => console.log(`Servidor rodando na porta ${config.serverPort}`));
  server.on("error", (error : NodeJS.ErrnoException) => console.error(`Ocorreu um erro: ${error}`));
});
