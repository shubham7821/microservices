import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FormDocument = Form & Document;

@Schema()
export class Form {
  @Prop({ type: JSON })
  data: JSON;
}

export const FormSchema = SchemaFactory.createForClass(Form);
