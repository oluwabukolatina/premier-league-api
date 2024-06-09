import { Types } from 'mongoose';

export interface FixtureDocument extends Document {
  _id: Types.ObjectId;
  awayTeam: { type: Types.ObjectId; ref: 'Team'; required: true };
  completed: boolean;
  date: Date;
  homeTeam: { type: Types.ObjectId; ref: 'Team'; required: true };
  score: {
    home: number;
    away: number;
  };
}
