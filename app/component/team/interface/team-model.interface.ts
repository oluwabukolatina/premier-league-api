import { Model } from 'mongoose';
import { TeamDocument } from '../repository/team.document';
import { TeamInterface } from './team.interface';

export interface TeamModelInterface extends Model<TeamDocument> {
  build(attr: TeamInterface): TeamDocument;
}
