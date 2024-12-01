import { ProjectStatus } from "../enums/project-status.enum";

export abstract class BaseTask {
   id!: number;
   name!: string;
   description!: string;
   status!: ProjectStatus;
   startDate!: Date;
   endDate!: Date;
}