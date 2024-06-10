import jwt from 'jsonwebtoken';
import { ClientError } from '../exception/client.error';
import { UserInterface } from '../component/user/interface/user.interface';

const Jwt = {
  createToken(
    payload: { email: UserInterface['email']; id: UserInterface['_id'] },
    secret: jwt.Secret,
    expiry: string,
  ) {
    return jwt.sign(payload, secret, {
      expiresIn: expiry,
    });
  },
  // verifyToken(token: string, key: string) {
  //   return jwt.verify(token, key, (err, decoded) => {
  //     if (err) return err;
  //     return decoded;
  //   });
  // },
  verifyToken(token: string, key: string) {
    try {
      return jwt.verify(token, key);
    } catch (err) {
      throw new ClientError(err.message);
    }
  },
};

export default Jwt;
