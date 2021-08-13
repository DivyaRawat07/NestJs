import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';

import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor( private taskService: TaskService){}

@Get()
    getTask(@Query()filterDto: GetTaskFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTaskWithFilters(filterDto)
        }else
        {
            return this.taskService.getAllTask();
        }
        
    }
@Get('/:id')
    getTaskById(@Param('id') id:string): Task{
        return this.taskService.getTaskById(id)
    }
@Post()
@UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: createTaskDto):Task{
    return this.taskService.createTask(createTaskDto);
     }
@Delete('/:id')
     deleteTask(@Param('id') id:string): void{
        return this.taskService.deleteTask(id)
     }
@Patch('/:id/status')
     updateTaskStatus(
         @Param('id') id: string,
         @Body('status',TaskStatusValidationPipe)status: TaskStatus,
     ): Task{
        return this.taskService.updateTaskStatus(id, status)
     }
}
