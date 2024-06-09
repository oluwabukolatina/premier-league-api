import UserRepository from './repository/user.repository';
import {
  CreateUserInterface,
  FindUserInterface,
} from './interface/user.interface';
import { NotFoundError } from '../../exception/not-found.error';
import { MESSAGE_USER_ACCOUNT_NOT_FOUND } from './user.message';
import { ClientError } from '../../exception/client.error';

const UserService = {
  async create(userData: CreateUserInterface) {
    return UserRepository.create(userData);
  },
  async get(query: FindUserInterface, lean?: boolean) {
    const user = await UserRepository.find(query, lean);
    if (user) return user;
    throw new NotFoundError(MESSAGE_USER_ACCOUNT_NOT_FOUND);
  },
  async checkIfUserAlreadyExists(email: string) {
    const findUser = await UserRepository.find({ email });
    if (findUser) throw new ClientError('account already belongs to a user');
    return email;
  },
  async find(email: string) {
    return UserRepository.find({ email });
  },
};
export default UserService;
