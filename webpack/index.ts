
import anime from 'animejs/lib/anime.es';
import * as Bootstrap from 'bootstrap';
import * as JQuery from 'jquery';

import VisibleChecker from './visibleChecker';
import FireworkHandler from './fireworkHandler';
import TypewriteHandler from './typewriteHandler';
import DonutSpaceHandler from './donutSpaceHandler';
import IntroPageHandler from './introPageHandler';
import MorphHandler from './morphHandler';
import ProjectPageHandler from './projectPageHandler';
import TiltViewerHandler from './tiltViewerHandler';

declare global {
    interface Window {
        isJSInited: boolean;
        InitJS: () => void;

        visibleChecker?: VisibleChecker;

        fireworkHandler?: FireworkHandler;
        typewriteHandler?: TypewriteHandler;

        donutSpaceHandler?: DonutSpaceHandler;
        introPageHandler?: IntroPageHandler;

        morphHandler?: MorphHandler;
        projectPageHandler?: ProjectPageHandler;
        tiltViewerHandler?: TiltViewerHandler;
    }
}


window.isJSInited = false;
//Common
window.visibleChecker = new VisibleChecker();
//IndexPage
window.fireworkHandler = new FireworkHandler();
window.typewriteHandler = new TypewriteHandler();
//IntroductionPage
window.donutSpaceHandler = new DonutSpaceHandler();
window.introPageHandler = new IntroPageHandler();
//ProjectPage
window.morphHandler = new MorphHandler();
window.projectPageHandler = new ProjectPageHandler();
window.tiltViewerHandler = new TiltViewerHandler();
window.isJSInited = true;
console.log('[Main] Javascript instances have been injected to window');



