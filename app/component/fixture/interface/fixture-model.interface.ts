import { Model } from 'mongoose';
import { FixtureDocument } from '../repository/fixture.document';
import { FixtureInterface } from './fixture.interface';

export interface FixtureModelInterface extends Model<FixtureDocument> {
  build(attr: FixtureInterface): FixtureDocument;
}
