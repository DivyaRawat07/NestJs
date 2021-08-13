import { TaskStatus } from "../task.model";
import { isNotEmpty } from "class-validator";
export class GetTaskFilterDto{
    status: TaskStatus
    search: string
}