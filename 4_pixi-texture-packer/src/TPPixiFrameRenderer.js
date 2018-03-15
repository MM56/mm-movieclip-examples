class TPFrameRenderer {

	constructor(framesProvider) {
		this.render = this.render.bind(this);

		this.framesProvider = framesProvider;

		this.sprite = new PIXI.Sprite();
	}

	render(mc) {
		const currentFrame = mc.currentFrame;
		const framesProvider = this.framesProvider;
		this.sprite.texture = framesProvider.frameTextures[ currentFrame ];
	}

}
export default TPFrameRenderer;