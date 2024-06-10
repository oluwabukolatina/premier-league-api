import FakeData from './fake-data';

const TestData = {
  registerUserPayload() {
    return {
      firstName: FakeData.firstName(),
      lastName: FakeData.lastName(),
      email: FakeData.email(),
      password: FakeData.password(),
    };
  },
  createTeamPayload(name?: string) {
    return {
      manager: 'Mikel Arteta',
      name: name || 'Arsenal',
      numberOfPlayers: '500',
      stadium: 'Emirates Stadium',
    };
  },
  createManCityTeamPayload() {
    return {
      manager: 'Pep Guardiola',
      name: 'Manchester City',
      numberOfPlayers: '400',
      stadium: 'Etihad Stadium',
    };
  },
  createChelseaTeamPayload() {
    return {
      manager: 'Mauricio Pochettino',
      name: 'Chelsea',
      numberOfPlayers: '400',
      stadium: 'Stamford Bridge',
    };
  },
};
export default TestData;
