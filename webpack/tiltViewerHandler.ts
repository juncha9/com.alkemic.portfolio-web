/*
 *  Copyright (c) 2022 juncha9@gmail.com
 *  All Rights Reserved.
 *
 */

import TiltViewer from "./tiltViewer";

export default class TiltViewerHandler {
	set(objectID: string) {
		var element = document.getElementById(objectID);
		if (!element) {
			console.error(`Cannot find element [${objectID}]`);
		}

		var newTilt = new TiltViewer(element);
	}
}
