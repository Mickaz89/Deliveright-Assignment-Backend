import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './interfaces';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks(@Request() req): Promise<Task[]> {
    const { id } = req.user;
    return this.taskService.getTasks(id);
  }

  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(createTaskDto);
    return this.taskService.createTask(createTaskDto);
  }

  @Post('update')
  async updateTask(@Body() updateTaskDto: CreateTaskDto): Promise<Task> {
    console.log(updateTaskDto);
    return this.taskService.updateTask(updateTaskDto);
  }

  @Post('delete/:id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
