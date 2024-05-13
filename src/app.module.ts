import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    EmployeeModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/erp'),
    FormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
