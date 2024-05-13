import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument } from './schemas/form.schema';

@Injectable()
export class FormService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  async createForm(formData: CreateFormDto): Promise<Form> {
    if (formData.id === '0') {
      delete formData.id;
      const createdForm = new this.formModel(formData);
      return createdForm.save();
    } else {
      const form = await this.formModel
        .findByIdAndUpdate(formData.id, formData)
        .setOptions({ overwrite: true, new: true });
      if (!form) {
        throw new NotFoundException();
      }
      return form;
    }
  }

  async formAll(): Promise<Form[]> {
    return this.formModel.find().select('_id');
  }

  async getFormById(_id: string): Promise<Form> {
    return this.formModel.findById(_id);
  }
}
