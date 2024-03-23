import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserModel } from './user.schema';
import { User } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<UserModel>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user.toObject();
    }
    return null;
  }

  async login(user: any) {
    const userInDb: User | null = await this.validateUser(
      user.username,
      user.password,
    );
    if (!userInDb) {
      throw new BadRequestException('Invalid credentials');
    }
    const { name, _id } = userInDb;
    const payload = { name, id: _id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string, name: string) {
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new BadRequestException('Username already exists');
    }
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      name,
    });
    await newUser.save();
    return this.login({ username, password });
  }
}
