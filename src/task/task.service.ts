import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ){}

    getTask(filterDto: GetTaskFilterDto){
        //
    }

    // getAllTask(): Task[]{
    //     return this.task;
    // }

    // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[]{
    //     const {status, search} = filterDto

    //     let task = this.getAllTask()

    //     if(status){
    //         task= task.filter(task=>
    //         task.title.includes(search) || task.description.includes(search)
    //         );
    //     }

    //     return task;
        
    // }
    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id)

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found;
    }

    async createTask(createTaskDto: createTaskDto):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto)

    }

    async deleteTask(id: number): Promise<void>{
        const result = await this.taskRepository.delete(id)
        
        if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`)

        }

    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id)
        task.status = status
         await task.save()
         return task

    }


    
    
}
