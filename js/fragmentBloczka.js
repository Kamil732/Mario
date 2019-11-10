class FragmentBloczka {
	constructor(img,x,y,w,h,t) {		
		
		if(t==1) {
			this.obraz = new Obraz(img, 960, 304, 8, 8);
			this.pedX = -3;		
			this.pedY = -5;
		} else if(t==2) {
			this.obraz = new Obraz(img, 968, 304, 8, 8);
			this.pedX = 3;		
			this.pedY = -5;
		} else if(t==3) {
			this.obraz = new Obraz(img, 960, 312, 8, 8);
			this.pedX = -3;		
			this.pedY = 5;
		} else if(t==4) {
			this.obraz = new Obraz(img, 968, 312, 8, 8);
			this.pedX = 3;		
			this.pedY = 5;
		}
		this.animacja = {
			lot: this.obraz
		};
		this.stan = {
			lot: {
				ruch: (dane) => { 
					this.x += this.pedX; 
				},
				animacja: (dane) => { 
					this.obraz = this.animacja.lot;	
				}
			}
		};
		this.obecnyStan = this.stan.lot;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.typ = "fragmentBloczka";
	}
}