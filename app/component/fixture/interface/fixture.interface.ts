import { Types } from 'mongoose';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface FixtureInterface {
  _id: Types.ObjectId;
  awayTeam: string;
  completed: boolean;
  date: Date;
  homeTeam: string;
  score: { homeTeam: number; awayTeam: number };
  uniqueLink: string;
}
export interface CreateFixtureInterface {
  homeTeam: string;
  awayTeam: string;
  date: string;
  uniqueLink: string;
}
export interface FindFixtureInterface {
  uniqueLink?: string;
  _id?: FindFixtureInterface['_id'];
}

export interface UpdateFixtureInterface {
  completed?: boolean;
  stadium?: boolean;
  date?: string | Date | UnknownInterface;
}
