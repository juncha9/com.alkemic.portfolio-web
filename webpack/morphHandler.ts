/*
 *  Copyright (c) 2022 juncha9@gmail.com
 *  All Rights Reserved.
 *
 */

import anime from 'animejs/lib/anime.es';

export default class MorphHandler {
	//const
	SEL_MORPH: string = 'morph';
	SEL_PATH: string = 'path';
	SHAPES: any[] = [
		{
			path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			scaleX: 1,
			scaleY: 1,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				color: '#F18200',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutElastic',
					elasticity: 600
				},
				svg: {
					duration: 2000,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			path: 'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
			pathAlt: 'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
			scaleX: 0.4,
			scaleY: 1.5,
			rotate: 0,
			tx: 300,
			ty: 0,
			fill: {
				color: '#DC381F',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 2000,
					easing: 'easeOutElastic',
					elasticity: 600
				},
				svg: {
					duration: 2000,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			path: 'M 383.8,163.4 C 335.8,352.3 591.6,317.1 608.7,420.8 625.8,524.5 580.5,626 647.3,688 714,750 837.1,760.5 940.9,661.5 1044,562.3 1041,455.8 975.8,393.6 909.8,331.5 854.2,365.4 784.4,328.1 714.6,290.8 771.9,245.2 733.1,132.4 694.2,19.52 431.9,-25.48 383.8,163.4 Z',
			pathAlt: 'M 383.8,163.4 C 345.5,324.9 591.6,317.1 608.7,420.8 625.8,524.5 595.1,597 647.3,688 699.5,779 837.1,760.5 940.9,661.5 1044,562.3 1068,444.4 975.8,393.6 884,342.8 854.2,365.4 784.4,328.1 714.6,290.8 820.3,237.2 733.1,132.4 645.9,27.62 422.1,1.919 383.8,163.4 Z',
			scaleX: 1.7,
			scaleY: 1.2,
			rotate: -20,
			tx: 0,
			ty: 50,
			fill: {
				color: '#357EC7',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutElastic',
					elasticity: 600
				},
				svg: {
					duration: 2500,
					easing: 'easeOutElastic'
				}
			}
		},


		//new thing start
		{
			path: 'M 415.6,206.3 C 407.4,286.6 438.1,373.6 496.2,454.8 554.3,536.1 497,597.2 579.7,685.7 662.4,774.1 834.3,731.7 898.5,653.4 962.3,575 967.1,486 937.7,370 909.3,253.9 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
			pathAlt: 'M 415.6,206.3 C 407.4,286.6 415.5,381.7 473.6,462.9 531.7,544.2 482.5,637.6 579.7,685.7 676.9,733.8 826.2,710.7 890.4,632.4 954.2,554 926.8,487.6 937.7,370 948.6,252.4 937.7,201.5 833.4,105.4 729.3,9.338 602.2,13.73 530.6,41.91 459,70.08 423.9,126.1 415.6,206.3 Z',
			scaleX: 2.5,
			scaleY: 0.4,
			rotate: 0,
			tx: 50,
			ty: 500,
			fill: {
				color: '#8DB600',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 2000,
					easing: 'easeOutElastic',
					elasticity: 400
				},
				svg: {
					duration: 2000,
					easing: 'easeOutQuad'
				}
			}
		},
		{
			path: 'M 383.8,163.4 C 335.8,352.3 591.6,317.1 608.7,420.8 625.8,524.5 580.5,626 647.3,688 714,750 837.1,760.5 940.9,661.5 1044,562.3 1041,455.8 975.8,393.6 909.8,331.5 854.2,365.4 784.4,328.1 714.6,290.8 771.9,245.2 733.1,132.4 694.2,19.52 431.9,-25.48 383.8,163.4 Z',
			pathAlt: 'M 383.8,163.4 C 345.5,324.9 591.6,317.1 608.7,420.8 625.8,524.5 595.1,597 647.3,688 699.5,779 837.1,760.5 940.9,661.5 1044,562.3 1068,444.4 975.8,393.6 884,342.8 854.2,365.4 784.4,328.1 714.6,290.8 820.3,237.2 733.1,132.4 645.9,27.62 422.1,1.919 383.8,163.4 Z',
			scaleX: 1.9,
			scaleY: 1.1,
			rotate: 40,
			tx: -75,
			ty: 0,
			fill: {
				color: '#E5004C',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 1000,
					easing: 'easeInOutQuad'
				},
				svg: {
					duration: 1000,
					easing: 'easeInOutQuad'
				}
			}
		},
		{
			path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			scaleX: 1.3,
			scaleY: 1.8,
			rotate: 70,
			tx: 0,
			ty: 0,
			fill: {
				color: '#04ADBF',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 1000,
					easing: 'easeInOutQuad'
				},
				svg: {
					duration: 1000,
					easing: 'easeInOutQuad'
				}
			}
		},


		//new thing end
		{
			path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			scaleX: 1.5,
			scaleY: 1,
			rotate: -20,
			tx: 0,
			ty: 150,
			fill: {
				color: '#8042FC',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutQuad',
					elasticity: 600
				},
				svg: {
					duration: 3000,
					easing: 'easeOutElastic'
				}
			}
		},
		/*
	
		{
			path: 'M 247.6,239.6 C 174.3,404.5 245.5,601.9 358.5,624.3 471.5,646.6 569.1,611.6 659.7,655.7 750.4,699.7 1068,687.6 1153,534.4 1237,381.1 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 928.4,393.8 706.8,283.5 485.2,173.1 320.8,74.68 247.6,239.6 Z',
			pathAlt: 'M 247.6,239.6 C 174.3,404.5 271.3,550.3 358.5,624.3 445.7,698.3 569.1,611.6 659.7,655.7 750.4,699.7 1145,699 1153,534.4 1161,369.8 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 894.5,431 706.8,283.5 519.1,136 320.8,74.68 247.6,239.6 Z',
			scaleX: 1.8,
			scaleY: 1.5,
			rotate: 0,
			tx: 200,
			ty: 50,
			fill: {
				color: '#FF5E19',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutElastic',
					elasticity: 600
				},
				svg: {
					duration: 2000,
					easing: 'easeOutExpo'
				}
			}
		},
	
		*/

		// footer shape:
		{
			path: 'M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			pathAlt: 'M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z',
			scaleX: 2.5,
			scaleY: 1.5,
			rotate: 0,
			tx: 0,
			ty: 50,
			fill: {
				color: '#B9BF04',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutQuad',
					elasticity: 600
				},
				svg: {
					duration: 3000,
					easing: 'easeOutElastic'
				}
			}
		}
	];

	isInited: boolean = false;
	svg: HTMLElement = null;
	shapeEl: HTMLElement = null;

	constructor() {
	}

	init() {
		if (this.isInited === true) {
			this.dispose();
		}

		this.svg = document.getElementById(this.SEL_MORPH);
		this.shapeEl = document.getElementById(this.SEL_PATH);

		this.animShape();
		this.isInited = true;
		console.log(`[MorphHandler] MorphAnimation has been started`);
	}

	dispose() {
		this.isInited = false;
		this.svg = null;
		this.shapeEl = null;

		console.log(`[MorphHandler] MorphAnimation has been stoped`);
	}

	animShape = function () {
		if (this.svg) {
			anime.remove(this.svg);
			anime({
				targets: this.svg,
				duration: 1,
				easing: 'linear',
				scaleX: this.SHAPES[0].scaleX,
				scaleY: this.SHAPES[0].scaleY,
				translateX: this.SHAPES[0].tx + 'px',
				translateY: this.SHAPES[0].ty + 'px',
				rotate: this.SHAPES[0].rotate + 'deg'
			});
		}
		this.animShapeLoop(0);
	};

	animShapeLoop = function (pos) {
		pos = pos || 0;
		if (this.shapeEl) {
			anime.remove(this.shapeEl);
			anime({
				targets: this.shapeEl,
				easing: 'linear',
				d: [{ value: this.SHAPES[pos].pathAlt, duration: 3500 }, { value: this.SHAPES[pos].path, duration: 3500 }],
				loop: true,
				fill: {
					value: this.SHAPES[pos].fill.color,
					duration: this.SHAPES[pos].fill.duration,
					easing: this.SHAPES[pos].fill.easing
				},
				direction: 'alternate'
			});
		}
	};



	onPageChanged(destIndex: number) {
		let me = window.morphHandler;
		if (!me) return;
		var i = destIndex;
		if (me.shapeEl) {
			anime.remove(me.shapeEl);
			anime({
				targets: me.shapeEl,
				duration: me.SHAPES[i].animation.path.duration,
				easing: me.SHAPES[i].animation.path.easing,
				elasticity: me.SHAPES[i].animation.path.elasticity || 0,
				d: me.SHAPES[i].path,
				fill: {
					value: me.SHAPES[i].fill.color,
					duration: me.SHAPES[i].fill.duration,
					easing: me.SHAPES[i].fill.easing
				},
				complete: function () {
					let me = window.morphHandler;
					me.animShapeLoop(i);
				}
			});
		}
		if (me.svg) {
			anime.remove(me.svg);
			anime({
				targets: me.svg,
				duration: me.SHAPES[i].animation.svg.duration,
				easing: me.SHAPES[i].animation.svg.easing,
				elasticity: me.SHAPES[i].animation.svg.elasticity || 0,
				scaleX: me.SHAPES[i].scaleX,
				scaleY: me.SHAPES[i].scaleY,
				translateX: me.SHAPES[i].tx + 'px',
				translateY: me.SHAPES[i].ty + 'px',
				rotate: me.SHAPES[i].rotate + 'deg'
			});
		}
	}

	
}