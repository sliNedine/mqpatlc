import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { MasterMindComponent } from '../../components/master-mind/master-mind.component';

interface GameColor {
  realR: number;
  realG: number;
  realB: number;
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  imports: [CommonModule, MasterMindComponent],
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  private colorService = inject(ColorService);

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
