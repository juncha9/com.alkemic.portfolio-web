import { IDurationWaiter } from './interfaces';

export default class Effect implements IDurationWaiter {
    parentName: string = 'anim-parent';
    container: HTMLElement;
    isEnded: boolean = false;
    totalDuration: number = 0;
    constructor() {
        this.container = document.getElementById(this.parentName);
        if (!this.container) {
            console.error("[Effect] Failed to find effect parent");
            return;
        }
    }
}
