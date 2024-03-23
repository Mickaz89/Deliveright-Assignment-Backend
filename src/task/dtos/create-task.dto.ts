import { Types } from 'mongoose';
import { TaskStatus } from '../task.schema';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IsObjectId } from '../../decorators/is-object-id.decorator';

export class CreateTaskDto {
  @IsString()
  content: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
