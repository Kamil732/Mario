class Render {
	aktualizacja(dane) {
		this.rysuj(dane.obiekty.niebo, dane.canvas.skyCtx);

		dane.canvas.bgCtx.clearRect(0,0, dane.canvas.bgCtx.canvas.width, dane.canvas.bgCtx.canvas.height);
		this.rysuj(dane.obiekty.mapa, dane.canvas.bgCtx);

		dane.canvas.fgCtx.clearRect(0,0, dane.canvas.fgCtx.canvas.width, dane.canvas.fgCtx.canvas.height);

		this.pisz("Lives: " + dane.obiekty.mario.zycia, dane.canvas.fgCtx, 16, 32, "16px", "PixelEmulator");
		let s = "Score: " + dane.obiekty.mario.monety;
		this.pisz("Score: " + dane.obiekty.mario.monety, dane.canvas.fgCtx, dane.canvas.fgCtx.canvas.width - ((s.length - 1) * 16), 32, "16px", "PixelEmulator");

		if(dane.obiekty.mario.zycia<1) this.pisz("Game Over", dane.canvas.fgCtx, 200, 300, "72px", "PixelEmulator");
		dane.obiekty.tabelaPotworow.forEach((p) => {
			this.rysuj(p, dane.canvas.fgCtx);
		});

		dane.obiekty.tabelaMonet.forEach((m) => {
			this.rysuj(m, dane.canvas.fgCtx);
		});

		dane.obiekty.tabelaBloczkowMonet.forEach((bm) => {
			if(bm.monety > 0) this.rysuj(bm.moneta, dane.canvas.bgCtx);
			this.rysuj(bm, dane.canvas.bgCtx);
		});

		dane.obiekty.tabelaBloczkowGrzybow.forEach((bg) => {
			if(bg.grzyb != null) this.rysuj(bg.grzyb, dane.canvas.bgCtx);
			this.rysuj(bg, dane.canvas.bgCtx);
		});

		dane.obiekty.tabelaBloczkowCegiel.forEach((bc) => {
			this.rysuj(bc, dane.canvas.bgCtx);
		});

		dane.obiekty.tabelaPociskow.forEach((pc) => {
			this.rysuj(pc, dane.canvas.fgCtx);
		});

		dane.obiekty.tabelaFragmentowBloczkow.forEach((fb) => {
			this.rysuj(fb, dane.canvas.fgCtx);
		});

		this.rysuj(dane.obiekty.mario, dane.canvas.fgCtx);
	}

	rysuj(co, gdzie) {
		gdzie.drawImage(co.obraz.img,
						co.obraz.x, co.obraz.y,
						co.obraz.w, co.obraz.h,
						co.x, co.y, co.w, co.h);
	}

	pisz(tekst, gdzie, x, y, rozmiar, czcionka) {
		gdzie.font = rozmiar + " " + czcionka;
		gdzie.fillStyle = '#fff';
		gdzie.fillText(tekst,x,y);
	}
}