import { ParseIntPipe } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';



import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor( private taskService: TaskService){}

@Get()
    getTask(@Query(ValidationPipe)filterDto: GetTaskFilterDto){
        return this.taskService.getTask(filterDto)
       
    }
@Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task>{
        return this.taskService.getTaskById(id)
    }
@Post()
@UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: createTaskDto):Promise<Task>{
    return this.taskService.createTask(createTaskDto);
     }
@Delete('/:id')
     deleteTask(@Param('id',ParseIntPipe) id:number): Promise<void>{
        return this.taskService.deleteTask(id)

        
     }
@Patch('/:id/status')
     updateTaskStatus(
         @Param('id', ParseIntPipe) id: number,
         @Body('status',TaskStatusValidationPipe)status: TaskStatus,
     ):Promise<Task>{
        return this.taskService.updateTaskStatus(id, status)
     }
}
