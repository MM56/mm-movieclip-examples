import Movieclip from '@merci-michel/mm-movieclip';
import Render from '@merci-michel/mm-render';
import createjs from 'preload-js';

import FlashSpriteFramesProvider from './FlashSpriteFramesProvider';
import SpriteCSSFrameRenderer from './SpriteCSSFrameRenderer';

const queue = new createjs.LoadQueue(false);

const onDataLoaded = () => {
	const elt = document.querySelector('.sprite');
	const frameRenderer = new SpriteCSSFrameRenderer(elt);
	const spriteData = queue.getResult('spriteData');
	const framesProvider = new FlashSpriteFramesProvider(137, 180, spriteData);

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

	mc.play();
};

queue.on('complete', onDataLoaded);
queue.loadFile({ id: 'spriteData', src: './img/sprite.json' });