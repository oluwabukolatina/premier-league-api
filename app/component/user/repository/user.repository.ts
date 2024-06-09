import * as type from '../interface/user.interface';
import UserModel from './user.model';

class UserRepository {
  public static async create(data: type.CreateUserInterface) {
    try {
      return UserModel.create(data);
    } catch (e) {
      return e;
    }
  }

  public static async find(query: type.FindUserInterface, lean?: boolean) {
    try {
      if (lean) return UserModel.findOne(query);
      return UserModel.findOne(query).populate({
        path: 'profile',
        /**
         * balance is needed when i get the user after stripe payment to add to their balace
         */
        populate: [{ path: 'account' }],
      });
    } catch (e) {
      return e;
    }
  }

  public static async findAll() {
    try {
      return UserModel.find().populate({
        path: 'profile',
      });
    } catch (e) {
      return e;
    }
  }
}

export default UserRepository;
