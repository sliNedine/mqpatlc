import { Component } from '@angular/core';

export const colorMap: Record<number, string> = {
  1: 'red',
  2: 'yellow',
  3: 'green',
  4: 'blue',
  5: 'purple',
};
@Component({
  selector: 'app-master-mind',
  imports: [],
  templateUrl: './master-mind.component.html',
  styleUrl: './master-mind.component.scss',
})
export class MasterMindComponent {
  protected solution: number[] = [];
  protected guess: (number | undefined)[] = [
    undefined,
    3,
    undefined,
    undefined,
    undefined,
  ];

  protected colorMap = colorMap;

  public constructor() {
    this.solution = this.createSolution();
  }

  private createSolution(): number[] {
    const result: number[] = [];
    for (let i = 0; i < 5; i++) {
      const randomNum = 1 + Math.floor(Math.random() * 5);
      result.push(randomNum);
    }
    return result;
  }

  protected changeSingleGuessColor(index: number): void {
    const value = this.guess[index];
    if (value === undefined) {
      this.guess[index] = 1;
    } else if (value === 5) {
      this.guess[index] = undefined;
    } else {
      this.guess[index] = this.guess[index]! + 1;
    }
  }
}
