/**
*  Full Stack Deployement Project
*  Author : NoexDev (Omar Suárez Doro)
*  Created : 2024-05-22
*  Description : 
*    This file contains the user router for the application.
*/
import fs from 'fs'; 
import { Router } from 'express';
import { userModel } from '../models/user.js';
import { date } from '../index.js';

// Instance of the user router
export const userRouter = Router();

// Definition of the user handlers
userRouter.get('/users', async (req, res) => {
  fs.promises.appendFile(`./logs/${date}`, `${Date.now()} > GET /users from ${req.hostname}\n`);
  try {
    let users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

userRouter.get('/users/:username', async (req, res) => {
  fs.promises.appendFile(`./logs/${date}`, `${Date.now()} > GET /users from ${req.hostname}\n`);
  try {
    let user = await userModel.findOne({ "username_": req.params.username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting user' });
  }
});


userRouter.post('/users', async (req, res) => {
  fs.promises.appendFile(`./logs/${date}`, `${Date.now()} > POST /users from ${req.hostname} with user ${req.body.username_}\n`);
  try {
    let user = new userModel(req.body);
    // for (let movie of user.upload_movies_) {
    //   // Implementar con el modelo de peliculas
    // }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});



userRouter.delete('/users', async (req, res) => {
  fs.promises.appendFile(`./logs/${date}`, `${Date.now()} > DELETE /users from ${req.hostname} with user ${req.body.username_}\n`);
  try {
    let user = await userModel.findOneAndDelete({ username_: req.body.username_ });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

userRouter.delete('/users/:username', async (req, res) => {
  fs.promises.appendFile(`./logs/${date}`, `${Date.now()} > DELETE /users from ${req.hostname} with user ${req.params.username}\n`);
  try {
    let user = await userModel
      .findOneAndDelete({ username_: req.params.username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});