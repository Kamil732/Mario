class Silnik {
	constructor() {
		let canvas = {
			skyCtx: document.getElementById("sky-canvas").getContext("2d"),
			bgCtx: document.getElementById("bg-canvas").getContext("2d"),
			fgCtx: document.getElementById("fg-canvas").getContext("2d"),
		};

		let grafika = new Image();
		grafika.src = "img/stylesheet.png";
		grafika.addEventListener("load", function() {
			grafika = this;
		});

		this.dane = {
			nrKlatki: 0,
			canvas: canvas,
			grafika: grafika,
			audio: {
				melodia: new Audio("audio/theme_melody.mp3"),
				skok: new Audio("audio/jump_melody.mp3"),
				moneta: new Audio("audio/coin_melody.mp3")
			},
			kontroler: {}
		};

		this.dane.canvas.skyCtx.imageSmoothingEnabled = false;
		this.dane.canvas.bgCtx.imageSmoothingEnabled = false;
		this.dane.canvas.fgCtx.imageSmoothingEnabled = false;

		this.dane.audio.melodia.loop = false;
		this.dane.audio.melodia.play();

		this.dane.kontroler = {
			wejscie: new Wejscie(),
			obiekt: new Obiekty(this.dane),
			animacje: new Animacje(),
			fizyka: new Fizyka(),
			render: new Render(),
			poruszanie: new Poruszanie(),
			smierc: new Smierc()
		}
		this.start();
	}

	start() {

		let petla = () => {
			this.dane.kontroler.wejscie.aktualizacja(this.dane);
			this.dane.kontroler.poruszanie.aktualizacja(this.dane);
			this.dane.kontroler.animacje.aktualizacja(this.dane);
			this.dane.kontroler.fizyka.aktualizacja(this.dane);
			this.dane.kontroler.render.aktualizacja(this.dane);

			this.dane.nrKlatki++;
			window.requestAnimationFrame(petla);
		}
		petla();
	}
};
window.onload = new Silnik();