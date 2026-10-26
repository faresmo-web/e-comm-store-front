import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';


@Component({
  imports: [RouterOutlet, MatBadgeModule, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('webapp');
}
