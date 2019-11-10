class BloczekGrzybkow {
	constructor(img,x,y,w,h,g) {	
		this.obraz = new Obraz(img, 960, 272, 16, 16);
		this.animacja = {
			pelny: new Obraz(img, 960, 272, 16, 16) ,
			pusty: new Obraz(img, 976, 272, 16, 16)
		};
		this.stan = {
			drganie: {
				licznik: 0,
				ruch: (dane) => {
					this.obecnyStan.licznik++;
					if(this.obecnyStan.licznik<5) {
						this.y -= 2;
					} else if(this.obecnyStan.licznik<10){
						this.y += 2;						
					} else {
						this.obecnyStan.licznik = 0;	
						this.obecnyStan = this.stan.spoczynek;					
					}
					if(this.pelny) {
						if(this.grzyb != null) this.grzyb.obecnyStan = this.grzyb.stan.wyjscie;
						this.pelny = false;
					}
					return;
				},
				animacja: (dane) => {
					if(this.pelny) {
						this.obraz = this.animacja.pelny;						
					} else {
						this.obraz = this.animacja.pusty;	
					}
				}
			},
			spoczynek: {
				ruch: (dane) => {					
					this.y = this.sy;
					return;
				},
				animacja: (dane) => {
					if(this.pelny) {
						this.obraz = this.animacja.pelny;						
					} else {
						this.obraz = this.animacja.pusty;	
					}
				}
			},
		};
		this.obecnyStan = this.stan.spoczynek;
		this.x = x;
		this.y = y;
		this.sy = y;
		this.w = w;
		this.h = h;
		this.grzyb = new Grzyb(img, x, y, w, h, g, this); 	// 1 <- życie
															// 2 <- powiekszenie
															// 3 <- strzelanie
		this.typ = "bloczekGrzybow";
		this.pelny = true;
	}
};