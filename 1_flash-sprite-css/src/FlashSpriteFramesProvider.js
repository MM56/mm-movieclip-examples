class FlashSpriteFramesProvider {

	constructor(width, height, data) {
		const frames = data.frames;

		this.frames = frames;
		this.totalFrames = frames.length;
		this.frameWidth = frames[ 0 ].frame.w;
		this.frameHeight = frames[ 0 ].frame.h;
		this.scale = width / this.frameWidth;
		this.backgroundWidth = data.meta.size.w;
		this.backgroundHeight = data.meta.size.h;
	}

	getFrameWidth() {
		return this.frameWidth * this.scale;
	}

	getFrameHeight() {
		return this.frameHeight * this.scale;
	}

	getBackgroundWidth() {
		return this.backgroundWidth * this.scale;
	}

	getBackgroundHeight() {
		return this.backgroundHeight * this.scale;
	}

	getFrameCoordinates(frame) {
		const frameData = this.frames[ frame ].frame;
		const x = frameData.x;
		const y = frameData.y;
		return { x, y };
	}

}
export default FlashSpriteFramesProvider;