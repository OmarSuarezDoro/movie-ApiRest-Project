import fs from 'fs';
import chalk from 'chalk';
import express from 'express';
import { startDb } from './db/startDb.js';
import { userRouter } from './routers/userRouter.js';
import { moviesRouter } from './routers/moviesRouter.js';

export const date  = Date.now().toLocaleString();

function main() {
  try {
    startDb();
    let app = express();
    app.use(express.json());
    app.use(userRouter);
    app.use(moviesRouter);
    app.listen(3000, () => {
      console.log(chalk.green('[+] Server started on http://localhost:3000'));
    });
    console.log(chalk.blue('[+] Start of the logs: '));
    fs.promises.writeFile(`./logs/${date}`, '');
    
  } catch (error) {
    console.log(chalk.red('[-] ' + (error as Error).message));
    process.exit(-1);
  }
}

main();