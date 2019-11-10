class Potwor {
	constructor(img, x, y, w, h) {
		let wnetrze = this;
		
		this.obraz = new Obraz(img, 960, 240, 16, 16);
		this.animacja = {
			poruszanie: {
				klatka: [	new Obraz(img, 960, 240, 16, 16),
							new Obraz(img, 976, 240, 16, 16),
							new Obraz(img, 992, 240, 16, 16),
							new Obraz(img, 1008, 240, 16, 16)],
				obecnaKlatka: 0
			},
			skok: new Obraz(img, 960, 240, 16, 16)
		};
		this.stan = {
			poruszanie: {
				ruch: function(dane) {
					wnetrze.x += wnetrze.pedX;
				},
				animacja: function(dane) {
					if(dane.nrKlatki % 5 == 0) {
						wnetrze.obraz = wnetrze.animacja.poruszanie.klatka[wnetrze.animacja.poruszanie.obecnaKlatka];
						wnetrze.animacja.poruszanie.obecnaKlatka++;
					}
					
					if(wnetrze.animacja.poruszanie.obecnaKlatka > 3) {
						wnetrze.animacja.poruszanie.obecnaKlatka = 0;
					}
				}
			},
			skakanie: {
				ruch: function(dane) {
					return;
				},
				animacja: function(dane) {
					wnetrze.obraz = wnetrze.animacja.skok;
				}
			}
		};
		this.obecnyStan = wnetrze.stan.poruszanie;
		this.pedY = 0;
		this.pedX = 2;
		this.x =x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.typ = "potwor";
	}
};