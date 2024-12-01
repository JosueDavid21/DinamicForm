import { DetailProject } from "./detail-projects.model";
import { BaseTask } from "./base-task.model";

export class Project extends BaseTask {
  detailProjectList!: DetailProject[];
}