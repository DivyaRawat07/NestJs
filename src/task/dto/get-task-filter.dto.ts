import { TaskStatus } from "../task-status.enum";
import { IsIn, IsNotEmpty, isNotEmpty, IsOptional } from "class-validator";
export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
    status: TaskStatus
    @IsOptional()
    @IsNotEmpty()
    search: string
}