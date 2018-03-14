import 'pixi.js';

class SpritePixiFrameRenderer {

	constructor(img, framesProvider, container = new PIXI.DisplayObjectContainer()) {
		this.render = this.render.bind(this);

		this.framesProvider = framesProvider;
		this.container = container;

		const frameWidth = framesProvider.getFrameWidth();
		const frameHeight = framesProvider.getFrameHeight();

		this._sprite = new PIXI.Sprite(new PIXI.Texture.fromImage(img.src));
		this._sprite.scale.x = this._sprite.scale.y = framesProvider.scale;

		const mask = new PIXI.Graphics();
		mask.beginFill(0xff0000);
		mask.drawRect(0, 0, frameWidth, frameHeight);
		mask.endFill();

		this.container.addChild(this._sprite);
		this.container.addChild(mask);

		this.container.mask = mask;
	}

	render(mc) {
		const currentFrame = mc.currentFrame;
		const framesProvider = this.framesProvider;
		const scale = framesProvider.scale;
		const { x, y } = framesProvider.getFrameCoordinates(currentFrame);

		this._sprite.position.x = -x * scale;
		this._sprite.position.y = -y * scale;
	}

}
export default SpritePixiFrameRenderer;