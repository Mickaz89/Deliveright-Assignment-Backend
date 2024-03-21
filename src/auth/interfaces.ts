import { Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
}
