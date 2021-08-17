import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskController } from './task.controller';
import { TasksRepository } from './task.repository';

import { TaskService } from './task.service';

@Module({
imports:[
  TypeOrmModule.forFeature([TasksRepository]),
  AuthModule
],

  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
