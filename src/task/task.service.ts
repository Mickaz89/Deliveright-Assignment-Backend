import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskModel } from './task.schema';
import { Task } from './interfaces';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<TaskModel>) {}

  async getTasks(user: Types.ObjectId): Promise<Task[]> {
    return this.taskModel.find({ user }).exec();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { content, status, user } = createTaskDto;
    const task = new this.taskModel({ content, status, user });
    return task.save();
  }

  async updateTask(updateTaskDto: CreateTaskDto): Promise<Task> {
    const { content, status, user } = updateTaskDto;
    const task = await this.taskModel.findOne({ content, user });
    task.status = status;
    return task.save();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findOneAndDelete({ _id: id });
  }
}
