class SequenceFramesProvider {

	constructor(
		frames,
		frameWidth,
		frameHeight,
		{
			scale = 1,
		} = {}
	) {
		this.frameHeight = frameHeight;
		this.frames = frames;
		this.frameWidth = frameWidth;
		this.scale = scale;
		this.totalFrames = frames.length;
	}

	getFrameWidth() {
		return this.frameWidth * this.scale;
	}

	getFrameHeight() {
		return this.frameHeight * this.scale;
	}

	getFrameImg(frame) {
		return this.frames[ frame ];
	}

}
export default SequenceFramesProvider;