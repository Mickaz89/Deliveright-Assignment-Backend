import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos/create-task.dto';
import { Task } from './interfaces';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Types } from 'mongoose';

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
    return this.taskService.createTask(createTaskDto);
  }

  @Post('update/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete('delete/:id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
