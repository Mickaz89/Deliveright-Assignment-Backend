import { Types } from 'mongoose';
import { TaskStatus } from '../task.schema';
import { IsEnum, IsString } from 'class-validator';
import { IsObjectId } from 'src/decorators/is-object-id';

export class CreateTaskDto {
  @IsString()
  content: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsObjectId()
  user: Types.ObjectId;
}
