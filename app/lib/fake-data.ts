import faker from 'faker';

const { internet, name } = faker;
const FakeData = {
  email() {
    return internet.email().toLowerCase();
  },
  password() {
    return `1A${internet.password()}!`;
  },
  firstName() {
    return name.firstName();
  },
  lastName() {
    return name.lastName();
  },
};
export default FakeData;
