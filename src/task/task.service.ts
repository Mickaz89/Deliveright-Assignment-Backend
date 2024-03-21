import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskModel } from './task.schema';
import { Task } from './interfaces';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<TaskModel>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { content, status, user } = createTaskDto;
    const task = new this.taskModel({ content, status, user });
    return task.save();
  }
}
