import { Body, Controller, Get, Post } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor( private taskService: TaskService){}

@Get()
    getAllTask(): Task[]{
        return this.taskService.getAllTask();
    }
@Post()
    createTask(@Body() createTaskDto: createTaskDto):Task{
    return this.taskService.createTask(title, description);
     
    }
}
