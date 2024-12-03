import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.initializeTitleListener();
  }
}
