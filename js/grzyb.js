class Grzyb {
	constructor(img,x,y,w,h,r,b) {		
		this.rodzaj = r;
		if(this.rodzaj === "zycie") {
			this.obraz = new Obraz(img, 976, 288, 16, 16);
			this.ruchomy = true;
		} else if(this.rodzaj === "powiekszenie") {
			this.obraz = new Obraz(img, 960, 288, 16, 16);
			this.ruchomy = true;
		} else {
			this.obraz = new Obraz(img, 992, 288, 16, 16);
			this.ruchomy = false;
		}
		this.animacja = {
			zycie: new Obraz(img, 960, 288, 16, 16),
			powiekszenie: new Obraz(img, 976, 288, 16, 16),
			strzelanie: new Obraz(img, 992, 288, 16, 16)
		};
		this.stan = {
			schowany: {
				ruch: (dane) => { return; },
				animacja: (dane) => { return; }
			},
			wyjscie: {
				licznik: 0,
				ruch: (dane) => {					
					this.obecnyStan.licznik++;
					if(this.obecnyStan.licznik<5) {
						this.y -= 5;
					} else if(this.obecnyStan.licznik<10){
						this.y -= 3;						
					} else if(this.obecnyStan.licznik<17) {
						this.y -= 2;						
					} else {
						this.y = this.sy - 48;
						if(this.rodzaj === "zycie") {
							this.obecnyStan = this.stan.zycie;
						} else if(this.rodzaj === "powiekszenie") {
							this.obecnyStan = this.stan.powiekszenie;
						} else {
							this.obecnyStan = this.stan.strzelanie;
						}
						this.odblokowany = true;
					}
				},
				animacja: (dane) => {
					return;
				}
			},
			zycie: {
				ruch: (dane) => {	
					this.x += this.pedX;
				},
				animacja: (dane) => {
					return;
				}
			},
			powiekszenie: {
				ruch: (dane) => {	
					this.x += this.pedX;
				},
				animacja:(dane) => {
					
				}
			},
			strzelanie: {
				ruch: (dane) => {	
					
				},
				animacja: (dane) => {
					
				}
			}
		};
		this.obecnyStan = this.stan.schowany;
		this.kierunek = "prawo";
		this.pedY = 0;
		this.pedX = 2;
		this.x = x;
		this.y = y;
		this.sy = y;
		this.w = w;
		this.h = h;
		this.typ = "grzyb";
		this.odblokowany = false;
		this.bloczek = b;
	}
};