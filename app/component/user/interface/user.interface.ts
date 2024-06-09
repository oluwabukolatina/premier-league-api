import { Types } from 'mongoose';

export interface UserInterface {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}
export interface FindUserInterface {
  _id?: UserInterface['_id'];
  email?: string;
  verificationToken?: string;
}
export interface CreateUserInterface {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}
