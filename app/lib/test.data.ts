import FakeData from './fake-data';
import { TeamInterface } from '../component/team/interface/team.interface';

const TestData = {
  registerUserPayload() {
    return {
      firstName: FakeData.firstName(),
      lastName: FakeData.lastName(),
      email: FakeData.email(),
      password: FakeData.password(),
    };
  },
  createFixturePayload(
    awayTeam: TeamInterface['_id'],
    homeTeam: TeamInterface['_id'],
  ) {
    return {
      awayTeam,
      homeTeam,
      stadium: 'Emirates',
      date: '2024-09-24 18:45',
    };
  },

  createTeamPayload(name: string) {
    function getManagerName() {
      if (name === 'Liverpool') return 'Jurgen Klopp';
      if (name === 'Tottenham Hotspur') return 'Mauricio Pochettino';
      if (name === 'Arsenal') return 'Mikel Arteta';
      if (name === 'Chelsea') return 'Enzo Maresca';
      if (name === 'Man United') return 'ETH';
      if (name === 'Aston Villa') return 'Unai Emery';
      return 'Pep Guardiola';
    }
    function getStadium() {
      if (name === 'Liverpool') return 'Anfield';
      if (name === 'Tottenham Hotspur') return 'Tottenham Hotspur Stadium';
      if (name === 'Chelsea') return 'Stamford Bridge';
      if (name === 'Arsenal') return 'Emirates Stadium';
      if (name === 'Man United') return 'ETH';
      if (name === 'Aston Villa') return 'Villa Park';
      return 'Etihad Stadium';
    }

    return {
      manager: getManagerName(),
      name: `${name}`,
      numberOfPlayers: '400',
      stadium: getStadium(),
    };
  },
};
export default TestData;
