class Pocisk {
	constructor(img,x,y,w,h,p) {		
		
		this.obraz = new Obraz(img, 960+3, 336+3, 10, 10)
		this.animacja = {
			lot: {
				klatka: [new Obraz(img, 960+3, 336+3-16, 10, 10),
							new Obraz(img, 976+3, 336+3-16, 10, 10),
							new Obraz(img, 992+3, 336+3-16, 10, 10),
							new Obraz(img, 1008+3, 336+3-16, 10, 10)],
				obecnaKlatka: 0
			},
		};
		this.stan = {
			lot: {
				ruch: (dane) => { 
					this.x += this.pedX; 
				},
				animacja: (dane) => { 
					if(dane.nrKlatki % 5 == 0) {
							this.obraz = this.animacja.lot.klatka[this.animacja.lot.obecnaKlatka];
							this.animacja.lot.obecnaKlatka++;
						}
						
						if(this.animacja.lot.obecnaKlatka>3) {
							this.animacja.lot.obecnaKlatka=0;
						}		
				}
			}
		};
		this.obecnyStan = this.stan.lot;
		this.pedY = 0;
		this.pedX = p;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.typ = "pocisk";
	}
}