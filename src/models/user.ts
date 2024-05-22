/**
*  Full Stack Deployement Project
*  Author : NoexDev (Omar Suárez Doro)
*  Created : 2024-05-22
*  Description : 
*    This file contains the user model for the application.
*/

import { Schema, model, Document } from 'mongoose';

/**
 * Declaration of the user collection interface
 */
export interface userInterface extends Document {
  username_: string;
  password_: string;
  email_: string;
  role_: string;
  created_at_: Date;
  liked_movies_: Array<Schema.Types.ObjectId>;
  subcription_up_: boolean;
}

/**
 * Declaration of the user collection schema
 */
const userSchema = new Schema<userInterface>({
  username_: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return /^[a-zA-Z0-9_]{3,30}$/.test(v);
      },
      message: (props: any) => {
        return `${props.value} is not a valid username!`;
      },
    },
  },
  password_: {
    type: String,
    required: true,
  },
  email_: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props: any) => {
        return `${props.value} is not a valid email!`;
      },
    }
  },
  role_: {
    type: String,
    default: 'user',
  },
  created_at_: {
    type: Date,
    default: Date.now,
  },
  liked_movies_: {
    ref: 'Movie',
    type: Array<Schema.Types.ObjectId>(),
  },
  subcription_up_: {
    type: Boolean,
    default: false,
    required: true
  }
});

/**
 * Export of the user model
 */
export const userModel = model<userInterface>('users', userSchema);
