import { model, Schema } from 'mongoose';
import { TeamDocument } from './team.document';
import { TeamModelInterface } from '../interface/team-model.interface';

const TeamSchema = new Schema(
  {
    isRemoved: Boolean,
    manager: String,
    name: String,
    numberOfPlayers: String,
    stadium: String,
  },
  { timestamps: true },
);

const TeamModel = model<TeamDocument, TeamModelInterface>('Team', TeamSchema);

export default TeamModel;
