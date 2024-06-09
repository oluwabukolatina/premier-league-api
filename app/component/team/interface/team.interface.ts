import { Types } from 'mongoose';

export interface TeamInterface {
  _id: Types.ObjectId;
  isRemoved: boolean;
  manager: string;
  name: string;
  numberOfPlayers: string;
  stadium: string;
}
export interface CreateTeamInterface {
  manager: string;
  numberOfPlayers: number;
  name: string;
  stadium: string;
}
export interface FindTeamInterface {
  name?: string;
  _id?: TeamInterface['_id'];
}
export interface UpdateTeamInterface {
  isRemoved?: boolean;
  manager?: string;
  name?: string;
  numberOfPlayers?: string;
  stadium?: string;
}
