
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { createTaskDto } from "./dto/create-task.dto";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository');

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;

        const query = this.createQueryBuilder('task');
        query.where({ user })

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER( :search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch(error) {
            this.logger.error(
                `Failed to get taks for user "${user.username}".
                 Filters: ${JSON.stringify(filterDto)}`, error.stack)
            throw new InternalServerErrorException();   
        }   
    }

    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });

        await this.save(task);
        return task;
    } 
}