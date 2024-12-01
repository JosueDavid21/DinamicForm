import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectAppComponent } from './components/project-app/project-app.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectDevJD';
}
