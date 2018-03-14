class SpriteCSSFrameRenderer {

	constructor(elt) {
		this.render = this.render.bind(this);

		this.elt = elt;
	}

	render(mc) {
		const currentFrame = mc.currentFrame;
		const framesProvider = mc.framesProvider;
		const scale = framesProvider.scale;
		const { x, y } = framesProvider.getFrameCoordinates(currentFrame);
		this.elt.style.backgroundPosition = (-x * scale) + 'px ' + (-y * scale) + 'px';
	}

}
export default SpriteCSSFrameRenderer;