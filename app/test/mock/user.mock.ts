import FakeData from '../../lib/fake-data';
import UserService from '../../component/user/user.service';
import Hashing from '../../lib/hashing';

const UserMock = {
  async createUser() {
    const password = FakeData.password();
    const email = FakeData.email();
    const { user } = await UserService.create({
      email,
      firstName: FakeData.firstName(),
      lastName: FakeData.firstName(),
      password: await Hashing.hashValue(password.trim()),
      role: 'ADMIN',
    });
    return { user, password };
  },
  async createAdminUser() {
    const password = FakeData.password();
    const email = FakeData.email();
    const { user } = await UserService.create({
      email,
      firstName: FakeData.firstName(),
      lastName: FakeData.firstName(),
      password: await Hashing.hashValue(password.trim()),
      role: 'ADMIN',
    });
    return { user, password };
  },
};
export default UserMock;
