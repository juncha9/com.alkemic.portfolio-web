import anime from 'animejs/lib/anime.es';

interface DOMType {
	title?:any; 
	desc?:any
	desc_left?:any;
	desc_bottom?:any;
}

export default class TiltViewer{
	SEL_FRAME = '.content--frame';
	SEL_TITLE = '.content--title';
	SEL_DESC = '.content--desc';
	SEL_DESC_LEFT = '.content--desc-left';
	SEL_DESC_BOTTOM = '.content--desc-bottom';
	DOM: DOMType = {};
	el: HTMLElement;
	screenWidth: number = 0;
	movement = {
		title: { translation: { x: -5, y: -2 } },
		desc: { translation: { x: 5, y: 2 } },
		desc_left: { translation: { x: 15, y: 5 } },
		desc_bottom: { translation: { x: 15, y: 5 } },
	};
	constructor(element: HTMLElement) {
		this.el = element;
		this.DOM = {};
		this.DOM.title = this.el.querySelector(this.SEL_TITLE);
		this.DOM.desc = this.el.querySelector(this.SEL_DESC);
		this.DOM.desc_left = this.el.querySelector(this.SEL_DESC_LEFT);
		this.DOM.desc_bottom = this.el.querySelector(this.SEL_DESC_BOTTOM);
		this.init();
	
	}

	getMousePos(ev) {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) {
			posx = ev.pageX;
			posy = ev.pageY;
		}
		else if (ev.clientX || ev.clientY) {
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x: posx, y: posy };
	}
	init() {
		let mouseenterFn = (ev) => {
			anime.remove(this.DOM.title);
			anime.remove(this.DOM.desc);
			anime.remove(this.DOM.desc_left);
			anime.remove(this.DOM.desc_bottom);
		};

		let mousemoveFn = (ev) => {
			requestAnimationFrame(() => this.layout(ev));
		};

		let mouseleaveFn = (ev) => {
			requestAnimationFrame(() => {
				anime({
					targets: [this.DOM.title, this.DOM.desc, this.DOM.desc_left, this.DOM.desc_bottom],
					duration: 1500,
					easing: 'easeOutElastic',
					elasticity: 400,
					translateX: 0,
					translateY: 0
				});
			});
		};

		
		this.el.addEventListener('mousemove', mousemoveFn);
		this.el.addEventListener('mouseleave', mouseleaveFn);
		this.el.addEventListener('mouseenter', mouseenterFn);
	};
	layout(ev) {
		// Mouse position relative to the document.
		let mousepos = this.getMousePos(ev);
		
		// Document scrolls.
		const docScrolls = {
			left: document.body.scrollLeft + document.documentElement.scrollLeft,
			top: document.body.scrollTop + document.documentElement.scrollTop
		};
		const bounds = this.el.getBoundingClientRect();
		// Mouse position relative to the main element (this.DOM.el).
		const relmousepos = { x: mousepos.x - bounds.left - docScrolls.left, y: mousepos.y - bounds.top - docScrolls.top };

		// Movement settings for the animatable elements.
		let t;
		if (window.innerWidth > 768) {
			t = {
				title: this.movement.title.translation,
				desc: this.movement.desc.translation,
				desc_left: this.movement.desc_left.translation,
				desc_bottom: this.movement.desc_bottom.translation,
			};
		}
		else {
			t = {
				title: { x: 0, y: 0 },
				desc: { x: 0, y: 0 },
				desc_left: { x: 0, y: 0 },
				desc_bottom: { x: 0, y: 0 },
			}
		}
			
		const transforms = {
			title: {
				x: (-1 * t.title.x - t.title.x) / bounds.width * relmousepos.x + t.title.x,
				y: (-1 * t.title.y - t.title.y) / bounds.height * relmousepos.y + t.title.y
			},
			desc: {
				x: (-1 * t.desc.x - t.desc.x) / bounds.width * relmousepos.x + t.desc.x,
				y: (-1 * t.desc.y - t.desc.y) / bounds.height * relmousepos.y + t.desc.y
			},
			desc_left: {
				x: (-1 * t.desc_left.x - t.desc_left.x) / bounds.width * relmousepos.x + t.desc_left.x,
				y: (-1 * t.desc_left.y - t.desc_left.y) / bounds.height * relmousepos.y + t.desc_left.y
			},
			desc_bottom: {
				x: (-1 * t.desc_bottom.x - t.desc_bottom.x) / bounds.width * relmousepos.x + t.desc_bottom.x,
				y: (-1 * t.desc_bottom.y - t.desc_bottom.y) / bounds.height * relmousepos.y + t.desc_bottom.y
			}
		};
	
		this.DOM.title.style.WebkitTransform = this.DOM.title.style.transform = 'translateX(' + transforms.title.x + 'px) translateY(' + transforms.title.y + 'px)';
		this.DOM.desc.style.WebkitTransform = this.DOM.desc.style.transform = 'translateX(' + transforms.desc.x + 'px) translateY(' + transforms.desc.y + 'px)';
		this.DOM.desc_left.style.WebkitTransform = this.DOM.desc_left.style.transform = 'translateX(' + transforms.desc_left.x + 'px) translateY(' + transforms.desc_left.y + 'px)';
		this.DOM.desc_bottom.style.WebkitTransform = this.DOM.desc_bottom.style.transform = 'translateX(' + transforms.desc_bottom.x + 'px) translateY(' + transforms.desc_bottom.y + 'px)';
	};
}


