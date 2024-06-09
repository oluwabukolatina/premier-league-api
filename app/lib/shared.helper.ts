import { Types } from 'mongoose';
import { randomBytes } from 'crypto';
import { UnknownInterface } from './unknown.interface';

const { ObjectId } = Types;
const SharedHelper = {
  formatDateToIso(dateString: string) {
    const [datePart, timePart] = dateString.split(' ');
    return new Date(`${datePart}T${timePart}:00.000Z`).toISOString();
  },
  randomString(length: number, teams: string) {
    const charset = `0123456789${teams}`;
    const rand = randomBytes(length);
    let string = '';
    for (let i = 0; i < rand.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      string += charset[randomIndex];
    }
    return string;
  },

  upperCaseTrim(params: string) {
    return params.toUpperCase().trim();
  },
  titleCase(str: string) {
    return str
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  },

  validObjectId(id: UnknownInterface) {
    return ObjectId.isValid(id);
  },
};
export default SharedHelper;
