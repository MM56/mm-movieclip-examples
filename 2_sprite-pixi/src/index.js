import Movieclip from '@merci-michel/mm-movieclip';
import Render from '@merci-michel/mm-render';
import 'pixi.js';
import createjs from 'preload-js';

import SpriteFramesProvider from './SpriteFramesProvider';
import SpritePixiFrameRenderer from './SpritePixiFrameRenderer';

const queue = new createjs.LoadQueue(false);

const onDataLoaded = () => {
	const framesProvider = new SpriteFramesProvider(
		10,
		137, 180,
		{
			columns: 3,
			scale: .75
		}
	);
	const frameRenderer = new SpritePixiFrameRenderer(queue.getResult('sprite'), framesProvider);

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
}

queue.on('complete', onDataLoaded);
queue.loadFile({ id: 'sprite', src: './img/sprite.png' });