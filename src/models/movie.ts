/**
*  Full Stack Deployement Project
*  Author : NoexDev (Omar Suárez Doro)
*  Created : 2024-05-22
*  Description : 
*    This file contains the movie model for the application.
*/

import { Schema, model, Document } from 'mongoose';

/**
 * Declaration of the movie collection interface
 */
export interface movieInterface extends Document {
  title_: string;
  description_: string;
  director_: string;
  genre: string;
  releaseDate: Date;
  duration: number;
  filePath: string;
  uploadDate: Date;
  rating: number;
  views: number;
}

/**
 * Declaration of the movie collection schema
 */
const movieSchema = new Schema<movieInterface>({
  title_: { 
    type: String, 
    required: true,
    unique: true
  },
  description_: { type: String },
  director_: { type: String },
  genre: { type: String },
  releaseDate: { type: Date },
  duration: { type: Number },
  filePath: { 
    type: String, 
    required: true 
  },
  uploadDate: { 
    type: Date, 
    default: Date.now()
  },
  rating: { 
    type: Number, 
    min: 0, 
    max: 10
  },
  views: { 
    type: Number, 
    default: 0 
  },
});

/**
 * Export of the user model
 */
export const movieModel = model<movieInterface>('movies', movieSchema);
