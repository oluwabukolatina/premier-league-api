import { Types } from 'mongoose';
import { TeamInterface } from '../../team/interface/team.interface';
import { UnknownInterface } from '../../../lib/unknown.interface';

export interface FixtureInterface {
  _id: Types.ObjectId;
  awayTeam: string;
  completed: boolean;
  date: Date;
  homeTeam: string;
  isRemoved: boolean;
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
  awayTeam?: TeamInterface['_id'] | UnknownInterface;
  completed?: boolean;
  date?: Date;
  homeTeam?: TeamInterface['_id'] | UnknownInterface;
  score?: { homeTeam?: number; awayTeam?: number } | UnknownInterface;
  stadium?: boolean;
  uniqueLink?: string;
  isRemoved?: boolean;
}
