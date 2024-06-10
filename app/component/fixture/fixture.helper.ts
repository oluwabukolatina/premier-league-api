import SharedHelper from '../../lib/shared.helper';
import EnvHelper from '../../config/env.helper';
import { GET_FIXTURE } from './fixture.url';

const FixtureHelper = {
  generateLink(awayTeam: string, homeTeam: string) {
    const random = SharedHelper.randomString(8, `${awayTeam}${homeTeam}`);
    return `${EnvHelper.getAppUrl()}${GET_FIXTURE}?uniqueLink=${random}`;
  },
};
export default FixtureHelper;
