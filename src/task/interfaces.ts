import { Types } from 'mongoose';
import { TaskStatus } from './task.schema';

export interface Task {
  _id: Types.ObjectId;
  content: string;
  status: TaskStatus;
  user: Types.ObjectId;
}
