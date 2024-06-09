import { UserInterface } from '../../interface/user.interface';
import Jwt from '../../../../lib/jwt';
import * as secret from '../../../../config/secrets';
import Hashing from '../../../../lib/hashing';
import { ServerError } from '../../../../exception/server.error';
import { UnAuthorizedError } from '../../../../exception/un-authorized.error';

const AuthHelper = {
  async createToken(user: UserInterface) {
    const token = Jwt.createToken(
      { email: user.email, id: user._id },
      secret.GO_MONEY_JWT_SECRET,
      secret.GO_MONEY_JWT_EXPIRY,
    );
    return { token };
  },

  async handleLoginUser(user: UserInterface, password: string) {
    const { password: userPassword } = user;
    const trimmedPassword = password.trim();
    const correctPassword = await Hashing.compareHashedValue(
      trimmedPassword,
      userPassword,
    );
    if (correctPassword) {
      const { token } = await this.createToken(user);
      if (!token) throw new ServerError('Unable to create token');
      return {
        token,
      };
    }
    throw new UnAuthorizedError('Incorrect Credentials');
  },
};
export default AuthHelper;
