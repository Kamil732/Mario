class Mario {
	constructor(img, x, y, w, h) {
		this.obraz= new Obraz(img, 1056, 208, 16, 16);
		this.animacja = {
			poruszaniePrawo: {
				klatka: [new Obraz(img,976,208,16,16),
						new Obraz(img,960,208,16,16),
						new Obraz(img,976,208,16,16),
						new Obraz(img,992,208,16,16)],
				obecnaKlatka: 0
			},
			poruszanieLewo: {
				klatka: [new  Obraz(img,976,224,16,16),
						new Obraz(img,960,224,16,16),
						new Obraz(img,976,224,16,16),
						new Obraz(img,992,224,16,16)],
				obecnaKlatka: 0
			},
			staniePrawo: new Obraz(img,1056,208,16,16),
			stanieLewo: new Obraz(img,1056,224,16,16),
			skokPrawo: new Obraz(img,1024,208,16,16),
			skokLewo: new Obraz(img,1024,224,16,16),
			smierc: new Obraz(img, 1040, 208, 16, 16),
			powiekszeniePoruszaniePrawo: {
				klatka: [new Obraz(img,1072,208,16,32),
						new Obraz(img,1088,208,16,32),
						new Obraz(img,1104,208,16,32),
						new Obraz(img,1088,208,16,32)],
				obecnaKlatka: 0
			},
			powiekszeniePoruszanieLewo: {
				klatka: [new Obraz(img,1168,208,16,32),
						new Obraz(img,1184,208,16,32),
						new Obraz(img,1200,208,16,32),
						new Obraz(img,1184,208,16,32)],
				obecnaKlatka: 0
			},
			powiekszenieStaniePrawo: new Obraz(img,1152,208,16,32),
			powiekszenieStanieLewo: new Obraz(img,1248,208,16,32),
			powiekszenieSkokPrawo: new Obraz(img,1136,208,16,32),
			powiekszenieSkokLewo: new Obraz(img,1232,208,16,32),
			strzelaniePoruszaniePrawo: {
				klatka: [new Obraz(img,1072,240,16,32),
						new Obraz(img,1088,240,16,32),
						new Obraz(img,1104,240,16,32),
						new Obraz(img,1088,240,16,32)],
				obecnaKlatka: 0
			},
			strzelaniePoruszanieLewo: {
				klatka: [new Obraz(img,1168,240,16,32),
						new Obraz(img,1184,240,16,32),
						new Obraz(img,1200,240,16,32),
						new Obraz(img,1184,240,16,32)],
				obecnaKlatka: 0
			},
			strzelanieStaniePrawo: new Obraz(img,1152,240,16,32),
			strzelanieStanieLewo: new Obraz(img,1248,240,16,32),
			strzelanieSkokPrawo: new Obraz(img,1136,240,16,32),
			strzelanieSkokLewo: new Obraz(img,1232,240,16,32)			
		};
		this.stan = {
			stanie: {
				ruch: (dane) => {},
				animacja: (dane) => {
					if(this.kierunek === "prawo") {
						if(this.strzelanie) {
							this.obraz = this.animacja.strzelanieStaniePrawo;	
						} else if(this.powiekszenie) {
							this.obraz = this.animacja.powiekszenieStaniePrawo;	
						} else {
							this.obraz = this.animacja.staniePrawo;							
						}
					} else {
						if(this.strzelanie) {
							this.obraz = this.animacja.strzelanieStanieLewo;	
						} else if(this.powiekszenie) {
							this.obraz = this.animacja.powiekszenieStanieLewo;	
						} else {
							this.obraz = this.animacja.stanieLewo;
						}
					}
					
				}
			},
			skakanie: {
				ruch: (dane) => {
					if(this.pedY==0) {
						this.pedY-=23.5;						
					}
					
					if(((this.x - this.pedX <= dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX < dane.canvas.fgCtx.canvas.width - dane.obiekty.mapa.w) && this.kierunek === "prawo") || ((this.x - this.pedX > dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX >= 0) && this.kierunek === "lewo")) {
						this.x += this.pedX;
					} else {
						dane.obiekty.mapa.x -= this.pedX;
						for( let i = 0; i<dane.obiekty.tabelaScian.length; i++) {
							dane.obiekty.tabelaScian[i].x -= this.pedX;
						}	
						for( let i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
							dane.obiekty.tabelaPotworow[i].x -= this.pedX;
						}	
						for( let i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
							dane.obiekty.tabelaMonet[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaBloczkowMonet.length; i++) {
							dane.obiekty.tabelaBloczkowMonet[i].moneta.x -= this.pedX;
							dane.obiekty.tabelaBloczkowMonet[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaBloczkowGrzybow.length; i++) {
							if(dane.obiekty.tabelaBloczkowGrzybow[i].grzyb != null) 
								dane.obiekty.tabelaBloczkowGrzybow[i].grzyb.x -= this.pedX;
							dane.obiekty.tabelaBloczkowGrzybow[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaBloczkowCegiel.length; i++) {
							dane.obiekty.tabelaBloczkowCegiel[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaPociskow.length; i++) {
							dane.obiekty.tabelaPociskow[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaFragmentowBloczkow.length; i++) {
							dane.obiekty.tabelaFragmentowBloczkow[i].x -= this.pedX;
						}
					}					
				},
				animacja: (dane) => {
					if(this.kierunek === "prawo") {
						if(this.strzelanie) {
							this.obraz = this.animacja.strzelanieSkokPrawo;	
						} else if(this.powiekszenie) {
							this.obraz = this.animacja.powiekszenieSkokPrawo;		
						} else {
							this.obraz = this.animacja.skokPrawo;														
						}
					} else {
						if(this.strzelanie) {
							this.obraz = this.animacja.strzelanieSkokLewo;	
						} else if(this.powiekszenie) {
							this.obraz = this.animacja.powiekszenieSkokLewo;		
						} else {
							this.obraz = this.animacja.skokLewo;														
						}
					}
				}
			},
			poruszanie: {
				ruch: (dane) => {
					if(((this.x - this.pedX <= dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX < dane.canvas.fgCtx.canvas.width - dane.obiekty.mapa.w) && this.kierunek === "prawo") || ((this.x - this.pedX > dane.canvas.fgCtx.canvas.width/2 || dane.obiekty.mapa.x - this.pedX >= 0) && this.kierunek === "lewo")) {
						this.x += this.pedX;
					} else {
						dane.obiekty.mapa.x -= this.pedX;
						for( let i = 0; i<dane.obiekty.tabelaScian.length; i++) {
							dane.obiekty.tabelaScian[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaPotworow.length; i++) {
							dane.obiekty.tabelaPotworow[i].x -= this.pedX;
						}	
						for( let i = 0; i<dane.obiekty.tabelaMonet.length; i++) {
							dane.obiekty.tabelaMonet[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaBloczkowMonet.length; i++) {
							dane.obiekty.tabelaBloczkowMonet[i].moneta.x -= this.pedX;
							dane.obiekty.tabelaBloczkowMonet[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaBloczkowGrzybow.length; i++) {
							if(dane.obiekty.tabelaBloczkowGrzybow[i].grzyb != null) 
								dane.obiekty.tabelaBloczkowGrzybow[i].grzyb.x -= this.pedX;
							dane.obiekty.tabelaBloczkowGrzybow[i].x -= this.pedX;
						}
						for( let i = 0; i<dane.obiekty.tabelaBloczkowCegiel.length; i++) {
							dane.obiekty.tabelaBloczkowCegiel[i].x -= this.pedX;
						}	
						for( let i = 0; i<dane.obiekty.tabelaPociskow.length; i++) {
							dane.obiekty.tabelaPociskow[i].x -= this.pedX;
						}	
						for( let i = 0; i<dane.obiekty.tabelaFragmentowBloczkow.length; i++) {
							dane.obiekty.tabelaFragmentowBloczkow[i].x -= this.pedX;
						}						
					}	
				},
				animacja: (dane) => {
					if(this.kierunek === "prawo") {						
						if(this.strzelanie) {
							var typPoruszanie = this.animacja.strzelaniePoruszaniePrawo;
						} else if(this.powiekszenie) {
							var typPoruszanie = this.animacja.powiekszeniePoruszaniePrawo;
						} else {
							var typPoruszanie = this.animacja.poruszaniePrawo;
						}
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = typPoruszanie.klatka[typPoruszanie.obecnaKlatka];
							typPoruszanie.obecnaKlatka++;
						}
						
						if(typPoruszanie.obecnaKlatka>3) {
							typPoruszanie.obecnaKlatka=0;
						}											
					} else {
						if(this.strzelanie) {
							var typPoruszanie = this.animacja.strzelaniePoruszanieLewo;
						} else if(this.powiekszenie) {
							var typPoruszanie = this.animacja.powiekszeniePoruszanieLewo;
						} else {
							var typPoruszanie = this.animacja.poruszanieLewo;
						}
						
						if(dane.nrKlatki % 5 == 0) {
							this.obraz = typPoruszanie.klatka[typPoruszanie.obecnaKlatka];
							typPoruszanie.obecnaKlatka++;
						}
						
						if(typPoruszanie.obecnaKlatka>3) {
							typPoruszanie.obecnaKlatka=0;
						}
					}
				}
			},
			smierc: {
				ruch: (dane) => {
					this.pedX = 0;
				},
				animacja: (dane) => {
					this.obraz = this.animacja.smierc;
				}
			}
		};
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.sh = h;
		this.pedY = 1;
		this.pedX = 0;
		this.zycia = 3;
		this.monety = 0;
		this.typ = "mario";
		this.kierunek = "prawo";
		this.powiekszenie = false;
		this.strzelanie = false;
		this.naladowany = true;
		this.momentSmierci = false;
		this.obecnyStan = this.stan.stanie;
	}
};