import TypewriteEffect from './typewriteEffect';
/* 
 *  *** Typewrite animation ***
 */

export default class TypewriteHandler {
    isStarted: boolean = false;

    instances: TypewriteEffect[] = [];
    constructor() {

    }
    start() {
        if (this.isStarted === true) {
            this.stop();
        }

        this.stop();
        let elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var texts = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (texts) {
                let typewrite = new TypewriteEffect(elements[i], JSON.parse(texts), period);
                typewrite.start();
                this.instances.push(typewrite);
            }
        }
        this.isStarted = true;
        console.log(`[TypewriteHandler] Typewrite has been started`);
    }
    stop() {
        this.isStarted = false;
        if (this.instances.length > 0) {
            this.instances.forEach((typewrite) => {
                typewrite.stop();
            });
            this.instances = [];
        }
        console.log(`[TypewriteHandler] Typewrite has been stoped`);
    };
}
