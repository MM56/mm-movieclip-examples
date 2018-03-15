import Movieclip from '@merci-michel/mm-movieclip';
import Render from '@merci-michel/mm-render';
import 'pixi.js';
import createjs from 'preload-js';

import TPFramesProvider from './TPFramesProvider';
import TPPixiFrameRenderer from './TPPixiFrameRenderer';

const queue = new createjs.LoadQueue(false);

const onDataLoaded = () => {
	const sheets = [];
	for (let i = 0; i < 4; i++) {
		sheets.push(queue.getResult(`sprite_${i}`));
	}

	const data = queue.getResult(`spritesheet_data`);

	const framesProvider = new TPFramesProvider(data, sheets);
	const frameRenderer = new TPPixiFrameRenderer(framesProvider);

	const app = new PIXI.Application({
		// width: framesProvider.getFrameWidth(),
		// height: framesProvider.getFrameHeight(),
		width: 500,
		height: 600,
		transparent: true,
	});

	app.stage.addChild(frameRenderer.sprite);
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
for (let i = 0; i < 4; i++) {
	queue.loadFile({ id: `sprite_${i}`, src: `./img/${i}.png` });
	queue.loadFile({ id: `spritesheet_data`, src: `./data/spritesheet.json` });
}