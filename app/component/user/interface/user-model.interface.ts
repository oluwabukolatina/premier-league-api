import { Model } from 'mongoose';
import { UserDocument } from '../repository/user.document';
import { UserInterface } from './user.interface';

export interface UserModelInterface extends Model<UserDocument> {
  build(attr: UserInterface): UserDocument;
}
