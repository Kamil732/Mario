class Moneta {
	constructor(img,x,y,w,h) {
		let wnetrze = this;

		this.obraz = new Obraz(img, 960, 256, 16, 16);
		this.animacja = {
			obrot: {
				klatka: [	new Obraz(img, 960, 256, 16, 16),
							new Obraz(img, 976, 256, 16, 16),
							new Obraz(img, 992, 256, 16, 16),
							new Obraz(img, 1008, 256, 16, 16)],
				obecnaKlatka: 0
			}
		};
		this.stan = {
			obrot: {
				animacja: function(dane) {
					if(dane.nrKlatki % 5 == 0) {
						wnetrze.obraz = wnetrze.animacja.obrot.klatka[wnetrze.animacja.obrot.obecnaKlatka];
						wnetrze.animacja.obrot.obecnaKlatka++;
					}
							
					if(wnetrze.animacja.obrot.obecnaKlatka > 3) {
						wnetrze.animacja.obrot.obecnaKlatka = 0;
					}
				}
			}
		};
		this.obecnyStan = wnetrze.stan.obrot;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.typ = "moneta";
	}
};	