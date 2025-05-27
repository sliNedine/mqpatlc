import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

export const colorMap: Record<number, string> = {
  1: 'red',
  2: 'yellow',
  3: 'green',
  4: 'blue',
  5: 'purple',
};

export type Guess = [
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined
];

export type Guesses = [
  Guess,
  Guess,
  Guess,
  Guess,
  Guess,
  Guess,
  Guess,
  Guess,
  Guess,
  Guess
];

export type Tip = 'color' | 'nope' | 'hit';

@Component({
  selector: 'app-master-mind',
  imports: [NgClass],
  templateUrl: './master-mind.component.html',
  styleUrl: './master-mind.component.scss',
})
export class MasterMindComponent {
  protected solution: Guess;
  protected guesses: Guesses = [
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
  ];
  protected tips: [
    Tip[],
    Tip[],
    Tip[],
    Tip[],
    Tip[],
    Tip[],
    Tip[],
    Tip[],
    Tip[],
    Tip[]
  ] = [
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
    ['nope', 'nope', 'nope', 'nope', 'nope'],
  ];

  protected round: number = 0;
  protected isWin = signal<boolean>(false);

  protected colorMap = colorMap;

  public constructor() {
    this.solution = this.createSolution();
  }

  private createSolution(): Guess {
    let result: Guess = [undefined, undefined, undefined, undefined, undefined];
    for (let i = 0; i < 5; i++) {
      const randomNum = 1 + Math.floor(Math.random() * 5);
      result[i] = randomNum;
    }
    return result;
  }

  protected changeSingleGuessColor(round: number, index: number): void {
    if (!this.isWin()) {
      const value = this.guesses[round][index];
      if (value === undefined) {
        this.guesses[round][index] = 1;
      } else if (value === 5) {
        this.guesses[round][index] = undefined;
      } else {
        this.guesses[round][index] = this.guesses[round][index]! + 1;
      }
    }
  }

  protected resetGame(): void {
    this.solution = this.createSolution();
    this.round = 0;
    this.guesses = [
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
    ];
    this.tips = [
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
      ['nope', 'nope', 'nope', 'nope', 'nope'],
    ];
  }

  protected makeGuess(): void {
    if (
      !this.isWin() &&
      this.round !== 10 &&
      this.guesses[this.round][0] !== undefined &&
      this.guesses[this.round][1] !== undefined &&
      this.guesses[this.round][2] !== undefined &&
      this.guesses[this.round][3] !== undefined &&
      this.guesses[this.round][4] !== undefined
    ) {
      let tipse: Tip[] = [];
      let indexOutSol = [false, false, false, false, false];
      let indexOutGuess = [false, false, false, false, false];

      // Erst Treffer (richtige Zahl am richtigen Platz)
      for (let i = 0; i < 5; i++) {
        if (this.guesses[this.round][i] === this.solution[i]) {
          tipse[i] = 'hit';
          indexOutSol[i] = true;
          indexOutGuess[i] = true;
        }
      }

      // Dann Farben (richtige Zahl am falschen Platz)
      for (let i = 0; i < 5; i++) {
        if (!indexOutGuess[i]) {
          for (let j = 0; j < 5; j++) {
            if (
              !indexOutSol[j] &&
              this.guesses[this.round][i] === this.solution[j]
            ) {
              tipse[i] = 'color';
              indexOutSol[j] = true;
              break;
            }
          }
        }
      }

      tipse = this.shuffle(tipse);
      for (let i = 0; i < 5; i++) {
        if (!tipse[i]) {
          tipse[i] = 'nope';
        }
        this.tips[this.round][i] = tipse[i];
      }
      //check if win?
      if (
        tipse[0] == 'hit' &&
        tipse[1] == 'hit' &&
        tipse[2] == 'hit' &&
        tipse[3] == 'hit' &&
        tipse[4] == 'hit'
      ) {
        this.isWin.set(true);
        alert('Glückwunsch. Du hast gewonnen!');
      } else {
        if (this.round !== 10) {
          this.round++;
        }
        if (this.round === 10) {
          alert('Du hast leider veloren...versuch es doch noch einmal.');
        }
      }
    } else if (this.round === 10) {
      alert('Du hast doch verloren...du musst reset drücken. Sorry!');
    } else if (!this.isWin()) {
      alert('Du musst schon 5 Tips abgeben ;)');
    } else {
      alert('Du hast doch schon gewonnen...');
    }
  }
  private shuffle<T>(array: T[]): T[] {
    const result = [...array]; // Nicht original-Array mutieren
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
