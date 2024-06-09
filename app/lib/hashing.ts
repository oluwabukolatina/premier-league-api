import bcrypt from 'bcrypt';

const Hashing = {
  async hashValue(value: string) {
    return bcrypt.hash(value, 9);
  },
  async compareHashedValue(value: string, hashed: string) {
    return bcrypt.compare(value, hashed);
  },
};
export default Hashing;
