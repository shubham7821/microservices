import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ type: JSON })
  data: JSON;

  @Prop({ type: 'string', default: 'P' })
  status: string;

  @Prop({ type: 'string', default: '' })
  comment: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
