import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
const uuid = require('uuid').v4
@Injectable()
export class TaskService {
    private task: Task[] = [];

    getAllTask(): Task[]{
        return this.task;
    }

    getTaskWithFilters(filterDto: GetTaskFilterDto): Task[]{
        const {status, search} = filterDto

        let task = this.getAllTask()

        if(status){
            task= task.filter(task=>
            task.title.includes(search) || task.description.includes(search)
            );
        }

        return task;
        
    }
    getTaskById(id: string): Task{
        const found = this.task.find(task=> task.id === id)

        if(!found){
            throw new NotFoundException();
        }
        else{
            return found
        }
    }

    createTask(createTaskDto: createTaskDto): Task{
        const{title, description} = createTaskDto;
        const task :Task = {
            id: uuid(),
            title,
            description,
            status:TaskStatus.OPEN,

        };
        this.task.push(task);
        return task;
    }
    deleteTask(id: string): void{
        const found = this.getTaskById(id);
        this.task = this.task.filter(task=> task.id !== found.id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task = this.getTaskById(id)
        task.status = status
        return task
    }

}
