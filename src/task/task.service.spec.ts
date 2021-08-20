import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing"
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./task.repository"
import { TaskService } from "./task.service"

const mockUser = {id:12, username:'Test User'};
const mockTaskRepository = ()=>({
    getTasks:jest.fn(),
    findOne:jest.fn(),
    createTask:jest.fn()
});
    

describe('TaskService',()=>{
    let tasksService
    let taskRepository

    beforeEach(async()=>{
        const module = await Test.createTestingModule({
            providers:[
                TaskService,
                {provide: TasksRepository, useFactory:mockTaskRepository}
            ],
        }).compile();

        tasksService = await module.get<TaskService>(TaskService)
        taskRepository = await module.get<TasksRepository>(TasksRepository)
    });

    describe('getTasks',()=>{
        it('get all tasks form the repository', async()=>{
            taskRepository.getTask.mockResolvedValue('someValue')
            expect(taskRepository.getTasks).not.toHaveBeenCalled()

            const filters: GetTaskFilterDto = {status: TaskStatus.IN_PROGRESS, search:'Some search query'};

            const result = tasksService.getTask(filters, mockUser)
            expect(taskRepository.getTasks).not.toHaveBeenCalled()
            expect(result).toEqual('someValue');

        })
    })

    describe('getTasksById',()=>{
     it('calls taskRepository.findOne() and successfully retrieve and return the task', async()=>{
     const mockTask = {title:'Test task', descripton:'Test desc'}
     taskRepository.findOne.mockResolvedValue(mockTask)

     const result = await tasksService.getTaskById(1,mockUser)
     expect(result).toEqual(mockTask)

     expect(taskRepository.findOne).toHaveBeenCalledWith({
         where:{
             id:1,
             userId: mockUser.id
            },
        })
     });

     it('throws an error as task is not found',()=>{
        taskRepository.findOne.mockResolvedValue(null)
        expect(tasksService.getTaskById(1, mockUser)).rejects.not.toThrow(NotFoundException);
    })
    })
    });

    describe('createTask',()=>{
        it('calls taskRepository.create() and return the result', async()=>{
            TasksRepository.createTask.mockResolvedValue('someTask')
            expect(TasksRepository.createTask).not.toHaveBeenCalled()
            const createTaskDto = {title:'Test task', description:'Test desc'}
            const result = await TaskService.createTask(createTaskDto, mockUser)
            expect(TasksRepository.createTask).toHaveBeenCalledWith(createTaskDto, mockUser)
            expect(result).toEqual('someTask')

        })
    })
    
    
