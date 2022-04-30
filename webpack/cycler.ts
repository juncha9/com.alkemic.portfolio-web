/*
 *  Copyright (c) 2022 juncha9@gmail.com
 *  All Rights Reserved.
 *
 */
import Range from './range';
import { IDurationWaiter } from './interfaces'

declare global {
    interface Window {
        isVisibleHidden: boolean;
    }
}

export interface CyclerOption {
    startDelayTimeRange?: Range;
    delayTimeRange?: Range;
    validFunc?: () => boolean;
}

export default class Cycler {
    createFunction: () => IDurationWaiter;
    loopInst: any = null;
    startDelayTimeRange: Range = new Range(0, 0);
    delayTimeRange:Range = new Range(500, 500);
    validFunc: () => boolean = null;
    isRunning: boolean = false;
    obj:any =  null;
    constructor(createFunction: () => any, option: CyclerOption) {
        if (!createFunction) {
            console.error("Failed to init Cycler, Func is not defined");
            return;
        }    
        this.createFunction = createFunction;

        if (option.startDelayTimeRange) {
            this.startDelayTimeRange = option.startDelayTimeRange;
        }

        if (option.validFunc) {
            this.validFunc = option.validFunc;
        }
    }
    check(me: Cycler) {
        if (me.isRunning === false) return;
        let isRunnable = true;
        if (window.isVisibleHidden === true)
        {
            isRunnable = isRunnable && false;
        }
        if (me.obj) {
            isRunnable = isRunnable && (me.obj.isEnded === true);
        }
        if (me.validFunc) {
            isRunnable = isRunnable && (me.validFunc() === true);
        }
        if (isRunnable === true) {
            me.cycle(me);
        }
        else {
            me.loopInst = setTimeout(me.check, 100, me);
        }
    }
    cycle(me: Cycler) {
        if (me.isRunning === false) return;
        let obj = me.createFunction();
        if (!obj || !(obj.totalDuration)) {
            console.error("Object is not exist or doesn't have Total duration");
            return;
        }
        me.obj = obj;
        let time = me.obj.totalDuration + me.delayTimeRange.value();
        me.loopInst = setTimeout(me.check, time, me);
    }
    start() {
        this.isRunning = true;
        this.loopInst = setTimeout(this.check, this.startDelayTimeRange.value(), this);
    }
    stop() {
        clearTimeout(this.loopInst);
        this.isRunning = false;
    }
}

