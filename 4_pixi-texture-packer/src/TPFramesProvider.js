class TPFramesProvider {

	constructor(data, cheets) {
		this.data = data;
		this.cheets = [];
		this.frameTextures = [];

		for (let i = 0, l = cheets.length; i < l; i++) {
			this.cheets.push(new PIXI.BaseTexture(cheets[ i ]));
		}

		for (let i = 0, cheetsNb = this.cheets.length; i < cheetsNb; i++) {
			let cheetData = data[ i ];
			// In case texture packer output litteral keys...
			if (cheetData instanceof Array === false) {
				const tmpData = [];
				for (const key in cheetData) {
					tmpData[ parseInt(key, 10) ] = cheetData[ key ];
				}
				cheetData = tmpData;
			}
			// Extract texture wit texture packer coords from baseTexture
			for (let j = 0, framesNb = cheetData.length; j < framesNb; j++) {
				const frame = cheetData[ j ].frame;
				const frameTexture = new PIXI.Texture(
					this.cheets[ i ],
					new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h)
				);

				this.frameTextures.push(frameTexture);
			}
		}


		this.totalFrames = this.frameTextures.length;
	}

}
export default TPFramesProvider;