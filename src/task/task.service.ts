import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './dtos/create-task.dto';
import { TaskModel } from './task.schema';
import { Task } from './interfaces';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<TaskModel>) {}

  async getTasks(user: Types.ObjectId): Promise<Task[]> {
    return this.taskModel.find({ user }).sort({ status: -1 }).exec();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { content, status, user } = createTaskDto;
    const task = new this.taskModel({ content, status, user });
    return task.save();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { content, status } = updateTaskDto;
    const task = await this.taskModel.findOne({ _id: id });
    task.status = status;

    if ('content' in updateTaskDto) {
      task.content = content;
    }

    return task.save();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findOneAndDelete({ _id: id });
  }
}
