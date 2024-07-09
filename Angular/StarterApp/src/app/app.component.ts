import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpleHelloComponent } from './simple-hello/simple-hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleHelloComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StarterApp';
}
