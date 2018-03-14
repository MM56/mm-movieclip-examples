class SpriteFramesProvider {

	constructor(
		frames,
		frameWidth,
		frameHeight,
		{
			borderPadding = 0,
			columns = -1,
			framePadding = 0,
			rows = -1,
			scale = 1,
		} = {}
	) {
		if (columns !== -1) {
			rows = Math.ceil(frames / columns);
		} else if (rows !== -1) {
			columns = Math.ceil(frames / rows);
		} else {
			columns = 1;
			rows = frames;
		}

		this.borderPadding = borderPadding;
		this.columns = columns;
		this.frameHeight = frameHeight;
		this.framePadding = framePadding;
		this.frameWidth = frameWidth;
		this.rows = rows;
		this.scale = scale;
		this.totalFrames = frames;
	}

	getFrameWidth() {
		return this.frameWidth * this.scale;
	}

	getFrameHeight() {
		return this.frameHeight * this.scale;
	}

	getBackgroundWidth() {
		return (this.columns * (this.frameWidth + this.framePadding) - this.framePadding + this.borderPadding * 2) * this.scale;
	}

	getBackgroundHeight() {
		return (this.rows * (this.frameHeight + this.framePadding) - this.framePadding + this.borderPadding * 2) * this.scale;
	}

	getFrameCoordinates(frame) {
		const borderPadding = this.borderPadding;
		const columns = this.columns;
		const framePadding = this.framePadding;
		const i = frame % columns;
		const j = Math.floor(frame / columns);
		const x = borderPadding + i * (this.frameWidth + framePadding);
		const y = borderPadding + j * (this.frameHeight + framePadding);
		return { x, y };
	}

}
export default SpriteFramesProvider;