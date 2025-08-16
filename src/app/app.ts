import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoogleAuthComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('testing-auth');
}
