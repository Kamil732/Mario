class Animacje {
	aktualizacja(dane) {
		this.niebo(dane);
		this.mario(dane);
		this.potwor(dane);
		this.moneta(dane);
		this.bloczekMonet(dane);
		this.bloczekGrzybow(dane);
		this.pocisk(dane);
		this.fragmentBloczkow(dane);
	}
	
	niebo(dane) {
		dane.obiekty.niebo.x -=1;
		
		if(dane.obiekty.niebo.x < -1440) {
			dane.obiekty.niebo.x = 0;
		}
	}
	
	mario(dane) {
		dane.obiekty.mario.obecnyStan.animacja(dane);
	}
	
	potwor(dane) {
		dane.obiekty.tabelaPotworow.forEach((p) => {
			p.obecnyStan.animacja(dane);
		});
	}
    
    moneta(dane) {
		dane.obiekty.tabelaMonet.forEach((m) => {
			m.obecnyStan.animacja(dane);
		});
    }
	
	bloczekMonet(dane) {
		dane.obiekty.tabelaBloczkowMonet.forEach((bm) => {
			bm.moneta.obecnyStan.animacja(dane);
			bm.obecnyStan.animacja(dane);
		});
	}
	
	bloczekGrzybow(dane) {
		dane.obiekty.tabelaBloczkowGrzybow.forEach((bg) => {
			if(bg.grzyb != null) bg.grzyb.obecnyStan.animacja(dane);
			bg.obecnyStan.animacja(dane);
		});
	}
	
	pocisk(dane) {
		dane.obiekty.tabelaPociskow.forEach((p) => {
			p.obecnyStan.animacja(dane);
		});
	}
	
	fragmentBloczkow(dane) {
		dane.obiekty.tabelaFragmentowBloczkow.forEach((fb) => {
			fb.obecnyStan.animacja(dane);
		});
	}
}