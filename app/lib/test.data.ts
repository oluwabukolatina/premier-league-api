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
};
export default TestData;
