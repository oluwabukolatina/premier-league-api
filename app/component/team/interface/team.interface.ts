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
interface FindInterface {
  _id?: TeamInterface['_id'];
  name?: string | RegExp;
  isRemoved?: boolean;
}
interface MultiFindInterface {
  $or: ({ name: RegExp } | { manager: RegExp } | { stadium: RegExp })[];
}
export type FindTeamInterface = FindInterface | MultiFindInterface;
export interface UpdateTeamInterface {
  isRemoved?: boolean;
  manager?: string;
  name?: string;
  numberOfPlayers?: string;
  stadium?: string;
}
