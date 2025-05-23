import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ColorServiceService } from '../../services/color-service.service';

interface GameColor {
  realR: number;
  realG: number;
  realB: number;
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [CommonModule],
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  private colorService = inject(ColorServiceService);

  unlockRed() {
    this.colorService.unlockChannel('r');
  }

  unlockGreen() {
    this.colorService.unlockChannel('g');
  }

  unlockBlue() {
    this.colorService.unlockChannel('b');
  }
}
