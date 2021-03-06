import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { keys, timer } from "../../globals.js";
import Tile from "../../services/Tile.js";

export default class PlayerWalkingState extends State {
	/**
	 * In this state, the player can move around using the
	 * directional keys. From here, the player can go idle
	 * if no keys are being pressed. The player can also swing
	 * their sword if they press the spacebar.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([12, 13, 14, 15], 0.2),
			[Direction.Down]: new Animation([0, 1, 2, 3], 0.2),
			[Direction.Left]: new Animation([4, 5, 6, 7], 0.2),
			[Direction.Right]: new Animation([8, 9, 10, 11], 0.2),
		};

		this.isMoving = false;
	}

	update(dt) {
		this.player.currentAnimation = this.animation[this.player.direction];

		this.handleMovement();
	}

	handleMovement() {
		/**
		 * Unlike Zelda, the Player's movement in Pokemon is locked to
		 * the grid. To restrict them from moving freely, we set a flag
		 * to track if they're currently moving from one tile to another,
		 * and reject input if so.
		 */
		if (this.isMoving) {
			return;
		}

		if (!keys.w && !keys.a && !keys.s && !keys.d) {
			this.player.changeState(PlayerStateName.Idling);
			return;
		}

		this.updateDirection();
		this.move();
	}

	updateDirection() {
		if (keys.s || keys.ArrowDown) {
			this.player.direction = Direction.Down;
		}
		else if (keys.d || keys.ArrowRight) {
			this.player.direction = Direction.Right;
		}
		else if (keys.w || keys.ArrowUp) {
			this.player.direction = Direction.Up;
		}
		else if (keys.a || keys.ArrowLeft) {
			this.player.direction = Direction.Left;
		}
	}

	move() {
		let x = this.player.position.x;
		let y = this.player.position.y;

		if (this.player.direction === Direction.Up) {
			y--;
		}
		else if (this.player.direction === Direction.Down) {
			y++;
		}
		else if (this.player.direction === Direction.Left) {
			x--;
		}
		else if (this.player.direction === Direction.Right) {
			x++;
		}

		this.player.position.x = x;
		this.player.position.y = y;

		this.tweenMovement(x, y);
	}

	tweenMovement(x, y) {
		this.isMoving = true;

		timer.tween(
			this.player.canvasPosition,
			['x', 'y'],
			[x * Tile.SIZE, y * Tile.SIZE],
			0.25,
			() => this.isMoving = false
		);
	}
}
