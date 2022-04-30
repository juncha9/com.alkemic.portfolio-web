import anime from 'animejs/lib/anime.es';

export default class Range {
	min: number;
	max: number;

	constructor(...args: number[])
	{
		//first arg is  min value
		//second arg  is max value
		if (args.length >= 2) {
			this.min = args[0];
			this.max = args[1];
		}
		else
		{
			this.min = args[0];
			this.max = args[0];
		}
	}
	value(): number {
		if (this.min === this.max) {
			return this.min;
		}
		else {
			let r = Math.random();
			return this.min + ((this.max - this.min) * r);
		}
			


		
	}
}


