import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TaskStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

@Schema()
export class TaskModel extends Document {
  @Prop()
  content: string;

  @Prop({ required: true })
  status: TaskStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
