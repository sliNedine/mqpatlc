import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorServiceService {
  private channelVars = {
    r: '--actualR',
    g: '--actualG',
    b: '--actualB',
  };

  unlockChannel(channel: 'r' | 'g' | 'b') {
    document.documentElement.style.setProperty(
      this.channelVars[channel],
      '255'
    );
  }

  lockChannel(channel: 'r' | 'g' | 'b') {
    document.documentElement.style.setProperty(this.channelVars[channel], '0');
  }
}
