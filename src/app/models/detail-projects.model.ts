import { BaseTask } from "./base-task.model";
import { Project } from "./project-app.model";

export class DetailProject extends BaseTask {
  project!: Project;
  // taskList: Task[];
  // detailProjectFather!: DetailProject;
  detailProjectList!: DetailProject[];
}
