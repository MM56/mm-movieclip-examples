import Movieclip from '@merci-michel/mm-movieclip';
import Render from '@merci-michel/mm-render';

import MCInLoopOutButton from './MCInLoopOutButton';
import SpriteFramesProvider from './SpriteFramesProvider';
import SpriteCSSFrameRenderer from './SpriteCSSFrameRenderer';

const elt = document.querySelector('.sprite');
const frameRenderer = new SpriteCSSFrameRenderer(elt);
const framesProvider = new SpriteFramesProvider(
	72,
	88, 88,
	{
		columns: 24,
		scale: .75
	}
);

elt.style.width = framesProvider.getFrameWidth() + 'px';
elt.style.height = framesProvider.getFrameHeight() + 'px';
elt.style.backgroundSize = framesProvider.getBackgroundWidth() + 'px ' + framesProvider.getBackgroundHeight() + 'px';

const mc = new Movieclip({
	fps: 24,
	framesProvider: framesProvider,
	frameRenderer: frameRenderer.render,
	totalFrames: framesProvider.totalFrames,
});

Render.init();
Render.add(mc.tick, mc.fps);

const button = new MCInLoopOutButton(elt, mc, {
	in: [ 0, 23 ],
	loop: [ 24, 47 ],
	out: [ 48, 71 ],
});
button.bind();