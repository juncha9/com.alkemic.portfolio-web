import FullpageHandler from './fullpageHandler';

export default class ProjectPageHandler{
    isInited: boolean = false;
    fullpageHandler: FullpageHandler = null;
    constructor() {
    }
    init(key: string) {
        if (this.isInited === true) {
            this.dispose();
        }
        this.fullpageHandler = new FullpageHandler(key, this.onPageChanged);
        this.isInited = true;
        console.log(`[ProjectPageHandler] Page has been inited`);
    }
    dispose() {
        this.isInited = false;
        if (this.fullpageHandler) {
            this.fullpageHandler.reset();
            this.fullpageHandler = null;
        }
        console.log(`[ProjectPageHandler] Page has been disposed`);
    }
    onPageChanged(origin, destination, direction) {
        var morph = window.morphHandler;
        if (morph) {
            morph.onPageChanged(destination.index);
        }
    }
}
