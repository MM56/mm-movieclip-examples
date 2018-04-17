import Agent from '@merci-michel/mm-agent';

export default class Button {

	constructor(target) {
		this._onMouseOver = this._onMouseOver.bind(this);
		this._onMouseOut = this._onMouseOut.bind(this);
		this.bind = this.bind.bind(this);
		this.unbind = this.unbind.bind(this);

		this.elt = target;

		this._enabled = true;

		if (!Agent.inspected) {
			Agent.inspect();
		}
	}

	bind() {
		if (Agent.hasTouchEvents) {
			this.elt.addEventListener('touchstart', this._onMouseOver);
			this.elt.addEventListener('touchend', this._onMouseOut);
		} else {
			this.elt.addEventListener('mouseover', this._onMouseOver);
			this.elt.addEventListener('mouseout', this._onMouseOut);
		}
	}

	unbind() {
		this.elt.removeEventListener('touchstart', this._onMouseOver);
		this.elt.removeEventListener('touchend', this._onMouseOut);
		this.elt.removeEventListener('mouseover', this._onMouseOver);
		this.elt.removeEventListener('mouseout', this._onMouseOut);
	}

	_onMouseOver() {
		if (!this._enabled) {
			return;
		}
	}

	_onMouseOut() {
		if (!this._enabled) {
			return;
		}
	}

	get enabled() {
		return this._enabled;
	}

	set enabled(value) {
		this._enabled = value;
	}

}