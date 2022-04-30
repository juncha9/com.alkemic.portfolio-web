
export default class TypewriteEffect {
    el: Element;
    toRotate: any[];
    period: number;
    loopNum = 0;
    txt = '';
    isDeleting = false;
    isStop = true;
    constructor(el: Element, toRotate: any[], period: string) {
        this.toRotate = toRotate;
        this.el = el;
        this.period = parseInt(period, 10) || 2000;
    }
    start() {
        this.txt = '';
        this.loopNum = 0;
        this.isDeleting = false;
        this.isStop = false;
        this.tick(this);
    }
    stop() {
        this.isStop = true;
    }
    tick(me: TypewriteEffect) {
        var i = me.loopNum % me.toRotate.length;
        var fullTxt = me.toRotate[i];

        if (me.isDeleting) {
            me.txt = fullTxt.substring(0, me.txt.length - 1);
        } else {
            me.txt = fullTxt.substring(0, me.txt.length + 1);
        }

        me.el.innerHTML = '<span id="wrap">' + me.txt + '</span>';
        var delta = 120 - Math.random() * 65;

        if (me.isDeleting) { delta /= 2; }

        if (!me.isDeleting && me.txt === fullTxt) {
            delta = me.period;
            me.isDeleting = true;
        } else if (me.isDeleting && me.txt === '') {
            me.isDeleting = false;
            me.loopNum++;
            delta = 500;
        }

        if (me.isStop == false) {
            setTimeout(function () {
                if (me.isStop == false) {
                    me.tick(me);
                }
            }, delta);
        }
        else {
            me.el.innerHTML = '<span id="wrap"></span>';
        }
    }
}
