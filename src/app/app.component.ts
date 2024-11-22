import {Component, Pipe} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Título de la página');

    this.meta.addTags([
      { name: 'description', content: 'Ofrecer y buscar trabajo sencillo' },
      { name: 'keywords', content: 'trabajo, buscar, ofrecer, dar, seguro, rápido, job, trading' },
      { name: 'author', content: 'Job Trading' },
      { property: 'og:title', content: 'Job-Trading' },
      { property: 'og:description', content: 'Ofrecer y buscar trabajo' },
      { property: 'og:image', content: 'URL de la imagen' },
    ]);
  }
}
