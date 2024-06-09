import jwt from 'jsonwebtoken';
import { ClientError } from '../exception/client.error';

const Jwt = {
  createToken(payload: any, secret: jwt.Secret, expiry: string) {
    console.log(payload, 'the payload');
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
