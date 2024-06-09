import { model, Schema } from 'mongoose';
import { FixtureDocument } from './fixture.document';
import { FixtureModelInterface } from '../interface/fixture-model.interface';

const FixtureSchema = new Schema(
  {
    awayTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    completed: { type: Boolean, default: false },
    date: { type: Date, required: true },
    homeTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: {
      awayTeam: { type: Number, default: 0 },
      homeTeam: { type: Number, default: 0 },
    },
    stadium: String,
    uniqueLink: { type: String, unique: true },
  },
  { timestamps: true },
);

const FixtureModel = model<FixtureDocument, FixtureModelInterface>(
  'Fixture',
  FixtureSchema,
);

export default FixtureModel;
