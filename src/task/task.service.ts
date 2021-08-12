import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
const uuid = require('uuid').v4
@Injectable()
export class TaskService {
    private task: Task[] = [];

    getAllTask(): Task[]{
        return this.task;
    }

    createTask(title:string, description:string): Task{
        const task :Task = {
            id: uuid(),
            title,
            description,
            status:TaskStatus.OPEN,

        };
        this.task.push(task);
        return task;
    }

}
