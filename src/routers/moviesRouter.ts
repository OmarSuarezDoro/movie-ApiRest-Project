/**
*  Full Stack Deployement Project
*  Author : NoexDev (Omar Suárez Doro)
*  Created : 2024-05-22
*  Description : 
*    This file contains the movie router for the application.
*/
import fs from 'fs'; 
import { Router } from 'express';

// import { date } from '../index.js';
import { upload } from '../middlewares/multerConfig.js';
import { movieModel } from '../models/movie.js'

// Instance of the movies router
export const moviesRouter = Router();

// Ruta para subir una nueva película
moviesRouter.post('/movies/upload', upload.single('movieFile'), async (req, res) => {
  try {
    req.body.filePath = './uploads/' + req.body.title_.toLowerCase().replace(/ /g, '_') + '.mp4';
    const movieInstance = new movieModel(req.body);
    await movieInstance.save();
    await fs.promises.rename(req.file!.path, movieInstance.filePath);
    res.status(201).send(movieInstance);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
    // res.status(500).send({ error: 'Error while saving the movie' });
  }
});

moviesRouter.get('/movies', async (_, res) => {
  try {
    const movies = await movieModel.find();
    res.send(movies);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
    // res.status(500).send({ error: 'Error while getting the movies' });
  }
});