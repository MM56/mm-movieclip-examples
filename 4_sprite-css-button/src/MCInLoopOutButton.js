import Button from './Button';

export default class MCInLoopOutButton extends Button {

	constructor(target, mc, frames) {
		super(target);

		this._mc = mc;
		this._frames = frames;

		mc.addLabelToFrame('in', this._frames.in[ 0 ]);
		mc.addLabelToFrame('loop', this._frames.loop[ 0 ]);
		mc.addLabelToFrame('out', this._frames.out[ 0 ]);

		const lastOutFrame = this._frames.out[ 1 ];
		this._mc.addFrameScript(lastOutFrame, () => {
			this._mc.gotoAndStop(0);
		});
	}

	_onMouseOver() {
		super._onMouseOver();

		const lastOutFrame = this._frames.out[ 1 ];
		this._mc.removeFrameScript(lastOutFrame);

		const firstLoopFrame = this._frames.loop[ 0 ] + 1;
		this._mc.removeFrameScript(firstLoopFrame + 1);

		const lastLoopFrame = this._frames.loop[ 1 ] + 1;
		this._mc.addFrameScript(lastLoopFrame, () => {
			this._mc.gotoAndPlay('loop');
		});

		this._mc.play();
	}

	_onMouseOut() {
		super._onMouseOut();

		const lastLoopFrame = this._frames.loop[ 1 ] + 1;
		this._mc.removeFrameScript(lastLoopFrame);

		const lastOutFrame = this._frames.out[ 1 ];
		this._mc.addFrameScript(lastOutFrame, () => {
			this._mc.gotoAndStop(0);
		});

		const firstLoopFrame = this._frames.loop[ 0 ] + 1;
		if (this._mc.currentFrame < firstLoopFrame) {
			this._mc.addFrameScript(firstLoopFrame + 1, () => {
				this._mc.gotoAndPlay('out');
			});
		}
	}

}