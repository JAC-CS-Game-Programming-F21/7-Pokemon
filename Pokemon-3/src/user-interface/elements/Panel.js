import { roundedRectangle } from "../../../lib/DrawingHelpers.js";
import Colour from "../../enums/Colour.js";
import { context } from "../../globals.js";
import UserInterfaceElement from "../UserInterfaceElement.js";

export default class Panel extends UserInterfaceElement {
	static BOTTOM_DIALOGUE = { x: 0, y: 8, width: 15, height: 3 };
	static TOP_DIALOGUE = { x: 0, y: 0, width: 15, height: 3 };
	static POKEMON_STATS = { x: 8.5, y: 4.5, width: 6, height: 6 };
	static BATTLE_PLAYER = { x: 8, y: 5.5, width: 6.5, height: 2 };
	static BATTLE_OPPONENT = { x: 1, y: 1, width: 6.5, height: 2 };
	static DEFAULT_PADDING = 20;
	static BORDER_WIDTH = 10;

	/**
	 * A UI element that is simply a rectangle that
	 * other UI elements are placed on top of.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {object} options
	 */
	constructor(x, y, width, height, options = {}) {
		super(x, y, width, height);

		this.borderColour = options.borderColour ?? Colour.Grey;
		this.panelColour = options.panelColour ?? Colour.White;
		this.padding = options.padding ?? Panel.DEFAULT_PADDING;
		this.isVisible = true;
	}

	render() {
		if (!this.isVisible) {
			return;
		}

		context.save();
		this.renderBackground();
		this.renderForeground();
		context.restore();
	}

	renderBackground() {
		context.fillStyle = this.borderColour;
		roundedRectangle(
			context,
			this.position.x,
			this.position.y,
			this.dimensions.x,
			this.dimensions.y,
			Panel.BORDER_WIDTH,
			true,
			false
		);
	}

	renderForeground() {
		context.fillStyle = this.panelColour;
		roundedRectangle(
			context,
			this.position.x + Panel.BORDER_WIDTH / 2,
			this.position.y + Panel.BORDER_WIDTH / 2,
			this.dimensions.x - Panel.BORDER_WIDTH,
			this.dimensions.y - Panel.BORDER_WIDTH,
			Panel.BORDER_WIDTH,
			true,
			false
		);
	}

	toggle() {
		this.isVisible = !this.isVisible;
	}
}