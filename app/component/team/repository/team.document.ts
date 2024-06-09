import { Types } from 'mongoose';

export interface TeamDocument extends Document {
  _id: Types.ObjectId;
  isRemoved: boolean;
  manager: string;
  numberOfPlayers: string;
  name: string;
  stadium: string;
}
