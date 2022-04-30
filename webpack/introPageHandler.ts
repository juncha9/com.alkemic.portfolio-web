import FullpageHandler from './fullpageHandler';
import anime from 'animejs/lib/anime.es';

export default class IntroPageHandler{
    isInited: boolean = false;

    bgElementID: string = "background-intro";
    bgElement: Element = null;
    fullpageHandler: FullpageHandler = null;
    anim: anime = null;
    color: string = "";
    colors: Array<string> = [
        "#E5004C",

        "#357EC7",
        "#7D8C46",
        "#F27405",
        "#DC381F",
        "#8042FC",
        "#FFA631",

    ];
    constructor() {
        if (this.colors.length > 0) {
            this.color = this.colors[0];
        }
    }
    
    init(key: string, useDonutSpace: boolean) {
        if (this.isInited === true) {
            this.dispose();
        }
        if (useDonutSpace === true) {
            this.fullpageHandler = new FullpageHandler(key, this.onPageChanged);
        }
        else {
            this.fullpageHandler = new FullpageHandler(key, this.onPageChanged_alt);
            this.bgElement = document.getElementById(this.bgElementID);
            this.anim = anime({
                targets: this.bgElement,
                backgroundColor: this.color,
                duration: 1000,
            });
        }
        this.isInited = true;
        console.log(`[IntroPageHandler] Page has been inited`);
    }
    dispose() {
        this.isInited = false;
        if (this.fullpageHandler) {
            this.fullpageHandler.reset();
            this.fullpageHandler = null;
        }
        if (this.anim) {
            this.anim.remove();
            this.anim = null;
        }
        if (this.bgElement) {
            this.bgElement = null;
        }
        console.log(`[IntroPageHandler] Page has been disposed`);
    }
    setNewBackgroundColor() {
        let _colors = this.colors.slice();
        if (_colors.length > 1) {
            let removeIndex = _colors.findIndex((item) => { return item === this.color; })
            if (removeIndex >= 0) {
                _colors.splice(removeIndex, 1);
                let index = anime.random(0, _colors.length - 1);
                this.color = _colors[index];
            }
            else {
                let index = anime.random(0, this.colors.length - 1);
                this.color = this.colors[index];
            }
        }
        if (this.anim) {
            this.anim.remove();
        }
        this.anim = anime({
            targets: this.bgElement,
            backgroundColor: this.color,
            duration: 1000,
        });
    }
    onPageChanged(origin, destination, direction) {
        var space = window.donutSpaceHandler;
        if (space) {
            space.onPageChanged();
        }
    }
    onPageChanged_alt(origin, destination, direction) {
        var intro = window.introPageHandler;
        if (intro) {
            intro.setNewBackgroundColor();
        }
    }
}