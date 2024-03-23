import { ObjectId } from 'mongodb';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskStatus } from './task.schema';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: jest.fn().mockResolvedValue('getTasks response'),
            createTask: jest.fn().mockResolvedValue('createTask response'),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tasks', async () => {
    const mockReq = { user: { id: 'testUserId' } }; // adjust this to match your needs
    expect(await controller.getTasks(mockReq)).toBe('getTasks response');
    expect(service.getTasks).toHaveBeenCalled();
  });

  it('should create task', async () => {
    const createTaskDto = {
      content: 'test',
      status: TaskStatus.OPEN,
      user: new ObjectId(), // generates a new fake ObjectId
    };
    expect(await controller.createTask(createTaskDto)).toBe(
      'createTask response',
    );
    expect(service.createTask).toHaveBeenCalled();
  });
});
