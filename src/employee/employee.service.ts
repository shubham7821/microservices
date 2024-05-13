import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    const createdForm = new this.employeeModel(createEmployeeDto);
    return createdForm.save();
  }

  findAll(): Promise<Employee[]> {
    return this.employeeModel.find();
  }

  findOne(_id: string) {
    return this.employeeModel.findById(_id);
  }

  update(employee: { id: string; data: CreateEmployeeDto }) {
    return this.employeeModel.findByIdAndUpdate(employee.id, employee.data);
  }

  async updateStatus(updateStatus: {
    comment: string;
    status: string;
    id: string;
  }) {
    const document = await this.employeeModel.findById(updateStatus.id);

    if (!document) {
      throw new Error('Document not found');
    }

    // Update the field
    document.status = updateStatus.status;
    document.comment = updateStatus.comment;

    // Save the updated document
    return await document.save();
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
