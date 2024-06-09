import { CreateUserInterface } from '../interface/user.interface';
import UserService from '../user.service';
import Hashing from '../../../lib/hashing';
import AuthHelper from './helper/auth.helper';
import { NotFoundError } from '../../../exception/not-found.error';

const AuthService = {
  async createUser(data: CreateUserInterface) {
    const { firstName, lastName, email, password, role } = data;
    const formattedEmail = email.toLowerCase();
    await UserService.checkIfUserAlreadyExists(formattedEmail);
    const formattedPassword = await Hashing.hashValue(password.trim());
    return UserService.create({
      email: formattedEmail,
      firstName,
      lastName,
      password: formattedPassword,
      role,
    });
  },

  async login(data: { email: string; password: string }) {
    const { email, password } = data;
    const user = await UserService.find(email);
    if (user) return AuthHelper.handleLoginUser(user, password);
    throw new NotFoundError('user account not tied to an account');
  },
};
export default AuthService;
