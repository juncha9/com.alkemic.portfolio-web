/*
 *  Copyright (c) 2022 juncha9@gmail.com
 *  All Rights Reserved.
 *
 */
declare global {
    interface Window {
        isVisibleHidden: boolean;
    }
}

import { log } from 'console';
import Cycler, { CyclerOption } from './cycler';
import FireworkEffect from './fireworkEffect';
import Range from './range';

export default class FireworkHandler {
    //const
    count: number = 3;
    delayGap: number = 1500;

    cyclers: Array<Cycler> = [];
    isStarted:boolean = false;
    createOnTop = () => {
        let obj = new FireworkEffect(
            {
                xPosRange: new Range(3, 97),
                yPosRange: new Range(3, 47),
                isAlt: true,
            });
        obj.run();
        return obj;
    };
    createOnBottom = () => {
        let obj = new FireworkEffect(
            {
                xPosRange: new Range(3, 97),
                yPosRange: new Range(3, 47),
                isAlt: false,
            });
        obj.run();
        return obj;
    };
    start() {
        if (this.isStarted === true) {
            this.stop();
        }   

        let options: Array<CyclerOption> = [];
        let gap = 0;
        for (let i = 0; i < this.count; i++) {
            options[i] = {
                startDelayTimeRange: new Range(gap, gap + 1000),
                delayTimeRange: new Range(1500, 2500),
            }
            let inst: Cycler;
            inst = new Cycler(this.createOnTop, options[i])
            this.cyclers.push(inst);
            inst.start();
            inst = new Cycler(this.createOnBottom, options[i]);
            this.cyclers.push(inst);
            inst.start();
            gap += this.delayGap;
        }

        this.isStarted = true;
        console.log(`[FireworkHandler] Firework has been started`);
    };
    stop() {
        this.isStarted = false;
        for (let i = 0; i < this.cyclers.length; i++) {
            this.cyclers[i].stop();
        }
        this.cyclers = [];
        console.log(`[FireworkHandler] Firework has been stoped`);
    };


}