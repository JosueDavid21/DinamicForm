import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../base-service.service"; 
import { Project } from "../../models/project-app.model";
import { AppConstants } from "../../constants/app-constants";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService<Project> {

  override endpointBase(): string {
    return AppConstants.PROJECT_URL;
  }

  constructor(protected override http: HttpClient) {
    super(http);
  }

}
