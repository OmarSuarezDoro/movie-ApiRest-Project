/**
*  Full Stack Deployement Project
*  Author : NoexDev (Omar Suárez Doro)
*  Created : 2024-05-22
*  Description : 
*    This file contains the main code to connect to the database
*/

import { connect } from 'mongoose';
import chalk from 'chalk';

// Connect to Database
export let startDb = async () => {
  try {
    await connect(process.env.MONGODB_URL!);
    console.log(chalk.green('[+] Connected to the database'));
  } catch (error) {
    throw new Error('Something went wrong when conecting to the database');
  }
};