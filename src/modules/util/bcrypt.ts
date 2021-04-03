import * as bcrypt from 'bcrypt';
import { bcryptConstants } from "../../config/bcryptConstants";


export const getHash = (data: string) => {
  return bcrypt.hash(data, bcryptConstants.saltOrRounds);
};

export const isMatch = (data: string, hash: string) => {
  return bcrypt.compareSync(data, hash);
};