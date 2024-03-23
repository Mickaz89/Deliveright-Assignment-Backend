import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue('login response'),
            register: jest.fn().mockResolvedValue('register response'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    expect(await controller.login({ username: 'test', password: 'test' })).toBe(
      'login response',
    );
    expect(service.login).toHaveBeenCalled();
  });

  it('should register', async () => {
    expect(
      await controller.register({ username: 'test', password: 'test' }),
    ).toBe('register response');
    expect(service.register).toHaveBeenCalled();
  });
});
