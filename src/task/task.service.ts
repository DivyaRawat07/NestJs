import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { GetUser } from 'src/auth/get-user.decorator';

import { User } from 'src/auth/user.entity';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';



@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TasksRepository)
        private taskRepository: TasksRepository,
    ){}

    getTask(filterDto: GetTaskFilterDto,
        user:User,
        ):Promise<Task[]>{
       return this.taskRepository.getTasks(filterDto, user);
    
    }

    
    async getTaskById(id: number,
         user: User
        ): Promise<Task>{
        const found = await this.taskRepository.findOne({id})

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found;
    }

    async createTask(createTaskDto: createTaskDto,user: User):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user)

    }

    async deleteTask(id: number, user: User,): Promise<void>{
        const result = await this.taskRepository.delete({id, user})
        
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`)

        }

    }

    // async deleteTask(id: string, user: User): Promise<void> {    const result = await this.taskRepository.delete({ id, user });
    // if (result.affected === 0) {      throw new NotFoundException(`Task with ID "${id}" not found`);    }  }

    async updateTaskStatus(id: number, status: TaskStatus,user: User): Promise<Task>{
        const task = await this.getTaskById(id, user)
        task.status = status
         await task.save()
         return task

    }


    
    
}
