import { model, Schema } from 'mongoose';
import { UserDocument } from './user.document';
import { UserModelInterface } from '../interface/user-model.interface';

const UserSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  },
  { timestamps: true },
);

const UserModel = model<UserDocument, UserModelInterface>('User', UserSchema);

export default UserModel;
