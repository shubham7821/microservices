import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './schemas/form.schema';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('createForm')
  async createForm(@Body() formData: CreateFormDto): Promise<Form> {
    return this.formService.createForm(formData);
  }

  @Get('formAll')
  async formAll(): Promise<Form[]> {
    return this.formService.formAll();
  }

  @Get(':id')
  async getFormById(@Param('id') id: string): Promise<Form> {
    const form = await this.formService.getFormById(id);
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    return form;
  }
}
