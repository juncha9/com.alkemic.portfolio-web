import * as fullpage from 'fullpage.js/dist/fullpage';
declare const fullpage_api: any;

export default class FullpageHandler {
    fp: fullpage;
    constructor(key: string, onLeavePage?: (origin, destination, direction) => void)
    {
        let config = {
            navigation: true,
            licenseKey: key,
            scrollVertically: true,
        }
        if (onLeavePage) {
            config['onLeave'] = onLeavePage;
        }
        this.fp = new fullpage('#fullpage', config);
        console.log(`[FullpageHandler] Fullpage set`);
    }
    reset() {
        fullpage_api.destroy('all');
        console.log(`[FullpageHandler] Fullpage unset`);
    }
}