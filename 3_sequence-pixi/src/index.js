import Movieclip from '@merci-michel/mm-movieclip';
import Render from '@merci-michel/mm-render';
import 'pixi.js';
import createjs from 'preload-js';

import SequenceFramesProvider from './SequenceFramesProvider';
import SequencePixiFrameRenderer from './SequencePixiFrameRenderer';

const queue = new createjs.LoadQueue(false);

const onDataLoaded = () => {
	const imgs = [];
	for (let i = 0; i < 72; i++) {
		imgs.push(queue.getResult(`sprite_${i}`));
	}
	const framesProvider = new SequenceFramesProvider(
		imgs,
		321, 77,
		{
			scale: .75
		}
	);
	const frameRenderer = new SequencePixiFrameRenderer(framesProvider);

	const app = new PIXI.Application({
		// width: framesProvider.getFrameWidth(),
		// height: framesProvider.getFrameHeight(),
		width: 500,
		height: 600,
		transparent: true,
	});
	app.stage.addChild(frameRenderer.container);
	document.body.appendChild(app.view);

	const mc = new Movieclip({
		fps: 24,
		framesProvider: framesProvider,
		frameRenderer: frameRenderer.render,
		totalFrames: framesProvider.totalFrames,
	});

	Render.init();
	Render.add(mc.tick, mc.fps);

	mc.play();
};

queue.on('complete', onDataLoaded);
for (let i = 0; i < 72; i++) {
	queue.loadFile({ id: `sprite_${i}`, src: `./img/${i}.png` });
}