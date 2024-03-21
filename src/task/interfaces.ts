import { Types } from 'mongoose';
import { TaskStatus } from './task.schema';

export interface Task {
  content: string;
  status: TaskStatus;
  user: Types.ObjectId;
}
