import 'pixi.js';

class SpritePixiFrameRenderer {

	constructor(framesProvider, container = new PIXI.DisplayObjectContainer()) {
		this.render = this.render.bind(this);

		this.framesProvider = framesProvider;
		this.container = container;

		const frameWidth = framesProvider.getFrameWidth();
		const frameHeight = framesProvider.getFrameHeight();

		this.sprites = [];
		for (let i = 0; i < framesProvider.totalFrames; i++) {
			const sprite = new PIXI.Sprite(new PIXI.Texture.fromImage(framesProvider.getFrameImg(i).src));
			sprite.scale.x = sprite.scale.y = framesProvider.scale;
			sprite.visible = false;
			this.sprites.push(sprite);
			this.container.addChild(sprite);
		}

		const mask = new PIXI.Graphics();
		mask.beginFill(0xff0000);
		mask.drawRect(0, 0, frameWidth, frameHeight);
		mask.endFill();

		this.container.addChild(mask);

		this.container.mask = mask;
	}

	render(mc) {
		if (typeof this.lastFrame !== 'undefined') {
			this.lastFrame.visible = false;
		}
		const currentFrame = mc.currentFrame;
		this.sprites[ currentFrame ].visible = true;
		this.lastFrame = this.sprites[ currentFrame ];
	}

}
export default SpritePixiFrameRenderer;