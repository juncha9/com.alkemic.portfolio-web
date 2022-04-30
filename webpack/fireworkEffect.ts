import anime from 'animejs/lib/anime.es';
import { type } from 'jquery';
import { IsString } from './extensions';
import Range from './range';
import Effect from './effect';

interface FireworkEffectOption {
    xPosRange?: Range;
    yPosRange?: Range;
    isAlt?: boolean;
    colors?: Array<string>;
}

export default class FireworkEffect extends Effect {

    parent: HTMLDivElement;
    child: HTMLDivElement;

    initTime: number;
    expTime: number;
    fadeTime: number;
    moveTimeRange: Range;
    moveTime: number;
    moveStepsValue: string;

    isAlt: boolean;
    xPosRange: Range;
    yPosRange: Range;
    targetXValue: string;
    targetYValue: string;
    expScaleRange: Range;
    endScaleRange: Range;

    originSize: number = 0;

    scaleExpValue: string;
    scaleEndValue: string;

    colors: string[];
    color: string;

    constructor(option: FireworkEffectOption) {
        super();
        this.isAlt = false;
        if (option.isAlt) {
            this.isAlt = option.isAlt;
        }
        /* size */

        if (window.innerWidth > 1024) {
            this.originSize = 200;
        }
        else if (window.innerWidth > 768) {
            this.originSize = 175;
        }
        else {
            this.originSize = 150;
        }

        /* Pos */
        this.xPosRange = new Range(0, 100);
        if (option.xPosRange) {
            this.xPosRange = option.xPosRange;
        }
        let xPos = this.xPosRange.value();
        this.yPosRange = new Range(0, 50);
        if (option.yPosRange) {
            this.yPosRange = option.yPosRange;
        }
        let yPos = this.yPosRange.value();
        this.targetXValue = `${xPos}vw`;
        this.targetYValue = this.isAlt === false ? `-${yPos}vh` : `${yPos}vh`;

        /* Time */
        
        this.initTime = 0;
        let expTimeRange = new Range(750, 1000);
        this.expTime = expTimeRange.value();
        let fadeTimeRange = new Range(750, 1250);
        this.fadeTime = fadeTimeRange.value();

        let moveSteps: number;
        let moveTimeRange: Range;
        if (yPos > 35) {
            moveTimeRange = new Range(2000, 2500);
            moveSteps = 12;
        }
        else if (yPos > 15) {
            moveTimeRange = new Range(1000, 1500);
            moveSteps = 8;
        }
        else {
            moveTimeRange = new Range(500, 750);
            moveSteps = 4;
        }
        this.moveStepsValue = `steps(${moveSteps})`;
        this.moveTime = moveTimeRange.value();
        this.totalDuration = this.initTime + this.moveTime + this.expTime + this.fadeTime;

        /* Scale */

        this.expScaleRange = new Range(0.90, 1.50);
        this.endScaleRange = new Range(0.50, 0.60);

        this.scaleExpValue = `${this.expScaleRange.value()}`;
        this.scaleEndValue = `${this.endScaleRange.value()}`;

        /* etc */
        this.colors = [
            '#F18200',
            '#DC381F',
            '#357EC7',
            '#8DB600',
            '#E5004C',
            '#8042FC',
            '#FF5E19',
            '#B9BF04'
        ];
        if (option.colors && Array.isArray(option.colors) === true) {
            let newColors = [];
            for (let __color in option.colors) {
                if (IsString(__color) === true) {
                    newColors.push(__color);
                }
            }
            this.colors = newColors;
        }

        this.color = "#FFFFFF";
        if (this.colors.length > 0) {
            this.color = this.colors[anime.random(0, this.colors.length - 1)];
        }

        this.parent = document.createElement("div");
        this.child = document.createElement("div");
        this.parent.appendChild(this.child);
        if (this.container) {
            this.container.appendChild(this.parent);
        }

        this.parent.style.position = "fixed";
        this.parent.style.width = "0";
        this.parent.style.height = "0";
        this.parent.style.left = "0";
        if (this.isAlt === false) {
            this.parent.style.bottom = "0";
        }
        else {
            this.parent.style.top = "0";
        }
        
        this.child.style.position = "relative";
        this.child.style.right = `${this.originSize / 2}px`;
        this.child.style.bottom = `${this.originSize / 2}px`;
        this.child.style.width = `${this.originSize}px`;
        this.child.style.height = `${this.originSize}px`;
        this.child.style.borderRadius = "100%";
        this.child.style.background = this.color;
    }
    run() {
        let me = this;
        let parentAnim = anime({
            targets: me.parent,
            keyframes: [
                /* Init */
                {   
                    left: me.targetXValue,
                    duration: me.initTime,
                    easing: 'linear',
                },
                {
                    translateY: me.targetYValue,
                    duration: me.moveTime,
                    //easing: 'easeOutCubic'
                    easing: me.moveStepsValue,
                },
                {
                    duration: me.expTime,
                },
                {
                    duration: me.fadeTime,
                }
            ],
            complete: function (anim) {
                if (me.parent) {
                    me.isEnded = true;
                    me.parent.remove();
                }
            }
        });
        parentAnim.suspendWhenDocumentHidden = false;

        let childAnim = anime({
            targets: me.child,
            keyframes: [
                /* Init */
                {
                    opacity: 1,
                    duration: me.initTime,
                    scale: 0.05,
                    easing: 'linear',

                },
                {
                    duration: me.moveTime,
                    //easing: 'easeOutCubic'
                    easing: me.moveStepsValue,
                },
                {
                    scale: me.scaleExpValue,
                    duration: me.expTime,
                    easing: 'easeOutElastic'
                },
                {
                    opacity: 0,
                    scale: me.scaleEndValue,
                    duration: me.fadeTime,
                    easing: 'easeInCirc'
                }
            ]
        });
        childAnim.suspendWhenDocumentHidden = false;
    }
}