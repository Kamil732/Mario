class Poruszanie {
	aktualizacja(dane) {
		this.mario(dane);
		this.potwor(dane);
		this.bloczekMonet(dane);
		this.bloczekGrzybow(dane);
		this.pocisk(dane);
		this.fragmentBloczkow(dane);
	}
	
	mario(dane) {
		dane.obiekty.mario.obecnyStan.ruch(dane);
	}
	
	potwor(dane) {
		dane.obiekty.tabelaPotworow.forEach((p) => {
			p.obecnyStan.ruch(dane);
		});
	}
	
	bloczekMonet(dane) {
		dane.obiekty.tabelaBloczkowMonet.forEach((bm) => {
			bm.obecnyStan.ruch(dane);
		});
	}
	
	bloczekGrzybow(dane) {
		dane.obiekty.tabelaBloczkowGrzybow.forEach((bg) => {
			if(bg.grzyb != null) bg.grzyb.obecnyStan.ruch(dane);
			bg.obecnyStan.ruch(dane);
		});
	}
	
	pocisk(dane) {
		dane.obiekty.tabelaPociskow.forEach((p) => {
			p.obecnyStan.ruch(dane);
		});
	}
	
	fragmentBloczkow(dane) {
		dane.obiekty.tabelaFragmentowBloczkow.forEach((fb) => {
			fb.obecnyStan.ruch(dane);
		});
	}
}
