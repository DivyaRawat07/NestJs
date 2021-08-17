import { Logger, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';



import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    private logger = new Logger('TaskController')
    constructor( private taskService: TaskService){}

@Get()
    getTask(@Query(ValidationPipe)filterDto: GetTaskFilterDto,
    @GetUser() user: User):Promise<Task[]>{
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)} `)
        return this.taskService.getTask(filterDto, user)
       
    }
@Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number, user: User): Promise<Task>{
        return this.taskService.getTaskById(id, user)
    }

    
@Post()
@UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: createTaskDto,
    @GetUser() user: User,):Promise<Task>{
        this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)} `)
    return this.taskService.createTask(createTaskDto, user);
     }
@Delete('/:id')
     deleteTask(@Param('id',ParseIntPipe,) id:number,  @GetUser() user: User): Promise<void>{
        return this.taskService.deleteTask(id, user)

        
     }
@Patch('/:id/status')
     updateTaskStatus(
         @Param('id', ParseIntPipe) id: number,
         @Body('status',TaskStatusValidationPipe)status: TaskStatus, @GetUser() user: User
     ):Promise<Task>{
        return this.taskService.updateTaskStatus(id, status, user)
     }
}
