class Fizyka {
	constructor() {}

	aktualizacja(dane) {
		this.grawitacja(dane.obiekty.mario);
		dane.obiekty.tabelaPotworow.forEach((p) => {
			this.grawitacja(p);
		});
		dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
			if(bloczekGrzybow.grzyb != null && bloczekGrzybow.grzyb.odblokowany && bloczekGrzybow.grzyb.ruchomy) this.grawitacja(bloczekGrzybow.grzyb);
		});
		dane.obiekty.tabelaPociskow.forEach((pocisk) => {
			this.grawitacja(pocisk);
		});

		dane.obiekty.tabelaFragmentowBloczkow.forEach((fragmentBloczka) => {
			this.grawitacja(fragmentBloczka);
		});

		this.wykrywanieKolizji(dane);

		this.czyszczeniePociskow(dane);

		this.smierc(dane);
	}

	grawitacja(obiekt) {
		if(obiekt.typ=="mario" && !obiekt.momentSmierci) obiekt.obecnyStan = obiekt.stan.skakanie;
		obiekt.pedY+=1;
		obiekt.y+=obiekt.pedY;
	}

	wykrywanieKolizji(dane) {
		let WykrywanieKolizji = (obiekt1, obiekt2) => {
			if( obiekt1.x < obiekt2.x + obiekt2.w &&
				obiekt1.x + obiekt1.w > obiekt2.x &&
				obiekt1.y < obiekt2.y + obiekt2.h &&
				obiekt1.y + obiekt1.h > obiekt2.y) {
					this.kolizja(obiekt1, obiekt2, dane);
			}
		};

		let mario = dane.obiekty.mario;

		if(!mario.momentSmierci) {
			dane.obiekty.tabelaScian.forEach((sciana) => {
				WykrywanieKolizji(mario, sciana);
			});

			dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
				WykrywanieKolizji(mario, bloczekMonet);
			});

			dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
				if(bloczekGrzybow.grzyb != null) WykrywanieKolizji(mario, bloczekGrzybow.grzyb);
				WykrywanieKolizji(mario, bloczekGrzybow);
			});

			dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
				WykrywanieKolizji(mario, bloczekCegiel);
			});

			dane.obiekty.tabelaMonet.forEach((moneta) => {
				WykrywanieKolizji(mario, moneta);
			});
		}

		dane.obiekty.tabelaPotworow.forEach((potwor) => {
			if(!mario.momentSmierci) WykrywanieKolizji(mario, potwor);

			dane.obiekty.tabelaScian.forEach((sciana) => {
				WykrywanieKolizji(potwor, sciana);
			});
			dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
				WykrywanieKolizji(potwor, bloczekMonet);
			});
			dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
				WykrywanieKolizji(potwor, bloczekCegiel);
			});
			dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
				WykrywanieKolizji(potwor, bloczekGrzybow);
			});
		});

		dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
			if(bloczekGrzybow.grzyb != null && bloczekGrzybow.grzyb.odblokowany && bloczekGrzybow.grzyb.ruchomy) {
				dane.obiekty.tabelaScian.forEach((sciana) => {
					WykrywanieKolizji(bloczekGrzybow.grzyb, sciana);
				});
				dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
					WykrywanieKolizji(bloczekGrzybow.grzyb, bloczekMonet);
				});
				dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybowWew) => {
					WykrywanieKolizji(bloczekGrzybow.grzyb, bloczekGrzybowWew);
				});
				dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
					WykrywanieKolizji(bloczekGrzybow.grzyb, bloczekCegiel);
				});
			}
		});

		dane.obiekty.tabelaPociskow.forEach((pocisk) => {
			dane.obiekty.tabelaScian.forEach((sciana) => {
					WykrywanieKolizji(pocisk, sciana);
				});
				dane.obiekty.tabelaBloczkowMonet.forEach((bloczekMonet) => {
					WykrywanieKolizji(pocisk, bloczekMonet);
				});
				dane.obiekty.tabelaBloczkowGrzybow.forEach((bloczekGrzybow) => {
					WykrywanieKolizji(pocisk, bloczekGrzybow);
				});
				dane.obiekty.tabelaBloczkowCegiel.forEach((bloczekCegiel) => {
					WykrywanieKolizji(pocisk, bloczekCegiel);
				});
				dane.obiekty.tabelaPotworow.forEach((potwor) => {
					WykrywanieKolizji(pocisk, potwor);
				});
		});

	}

	kolizja(obiekt1, obiekt2, dane) {
		if(obiekt1.typ === "mario") {
			let mario = obiekt1;
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekGrzybow" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "bloczekCegiel") {
				let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);

				if(stronaKolizji[0]) {
					mario.obecnyStan = mario.stan.stanie;
					mario.y = obiekt2.y - mario.h;
					mario.pedY = 0;
				}
				if(stronaKolizji[2]) {
					mario.y = obiekt2.y + obiekt2.h - 1;
					if(mario.pedY < 0) mario.pedY = 0.5;
					if(obiekt2.typ === "bloczekCegiel" && mario.powiekszenie) {

						dane.obiekty.tabelaFragmentowBloczkow.push(new FragmentBloczka(dane.grafika, obiekt2.x, obiekt2.y, 24, 24, 1));
						dane.obiekty.tabelaFragmentowBloczkow.push(new FragmentBloczka(dane.grafika, obiekt2.x+obiekt2.w/2, obiekt2.y, 24, 24, 2));
						dane.obiekty.tabelaFragmentowBloczkow.push(new FragmentBloczka(dane.grafika, obiekt2.x, obiekt2.y, 24, 24, 3));
						dane.obiekty.tabelaFragmentowBloczkow.push(new FragmentBloczka(dane.grafika, obiekt2.x+obiekt2.w/2, obiekt2.y, 24, 24, 4));
					}
					if(obiekt2.typ === "bloczekMonet") {
						obiekt2.obecnyStan = obiekt2.stan.drganie;
						obiekt2.obecnyStan.licznik = 0;
						obiekt2.y = obiekt2.sy;
						obiekt2.moneta.y = obiekt2.sy;
						if(obiekt2.monety > 0) mario.monety++;
						obiekt2.monety--;
					}
					if(obiekt2.typ === "bloczekGrzybow") {
						obiekt2.obecnyStan = obiekt2.stan.drganie;
					}
					if(obiekt2.typ === "bloczekCegiel") {
						if(mario.powiekszenie) {
							let nrBloczku = dane.obiekty.tabelaBloczkowCegiel.indexOf(obiekt2);
							dane.obiekty.tabelaBloczkowCegiel.splice(nrBloczku, 1);
						} else {
							obiekt2.obecnyStan = obiekt2.stan.drganie;
						}
					}
				}
				if(stronaKolizji[3]) {
					mario.x = obiekt2.x - mario.w;
					mario.pedX = 0;
				}
				if(stronaKolizji[1]) {
					mario.x = obiekt2.x + obiekt2.w;
					mario.pedX = 0;
				}
			} else if(obiekt2.typ === "potwor") {
				let stronaKolizji = this.stronaKolizji(mario, obiekt2);

				if(stronaKolizji[0]) {
					let nrPotwora = dane.obiekty.tabelaPotworow.indexOf(obiekt2);
					dane.obiekty.tabelaPotworow.splice(nrPotwora, 1);
					mario.obecnyStan = mario.stan.skakanie;
					mario.pedY = -20.5;
				}
				if(stronaKolizji[1] || stronaKolizji[3] || stronaKolizji[2]) {
					if(mario.strzelanie) {
						setTimeout(() => {
							mario.strzelanie = false;
						}, 200);
					} else if(mario.powiekszenie) {
						setTimeout(() => {
							mario.powiekszenie = false;
							mario.h = mario.sh;
						}, 200);
					} else {
						mario.obecnyStan = mario.stan.smierc;
						mario.pedY = -10.5;
						mario.momentSmierci = true;
						setTimeout(() => {
							dane.kontroler.smierc.strataZycia(dane);
						}, 750);
					}
				}
			}
			else if(obiekt2.typ === "grzyb") {
				if(obiekt2.odblokowany) {
					if(obiekt2.rodzaj === "zycie") {
						mario.zycia++;
						obiekt2.bloczek.grzyb = null;
					} else if(obiekt2.rodzaj === "powiekszenie") {
						mario.h = mario.sh*2;
						mario.powiekszenie = true;
						obiekt2.bloczek.grzyb = null;
					} else if(obiekt2.rodzaj === "strzelanie") {
						if(mario.powiekszenie) {
							mario.h = mario.sh*2;
							mario.strzelanie = true;
							obiekt2.bloczek.grzyb = null;
						}
					}
				}
			} else if(obiekt2.typ === "moneta") {
				let nrMonety = dane.obiekty.tabelaMonet.indexOf(obiekt2);
				dane.obiekty.tabelaMonet.splice(nrMonety, 1);
				mario.monety++;
			}
		} else if(obiekt1.typ === "potwor") {
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekGrzybow" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "bloczekCegiel") {
				let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);

				if(stronaKolizji[0]) {
					obiekt1.obecnyStan = obiekt1.stan.poruszanie;
					obiekt1.y = obiekt2.y - obiekt1.h;
					obiekt1.pedY = 0;
				}
				if(stronaKolizji[1]) {
					obiekt1.x = obiekt2.x + obiekt2.w;
					obiekt1.pedX = 2;
				}
				if(stronaKolizji[3]) {
					obiekt1.x = obiekt2.x - obiekt1.w;
					obiekt1.pedX = -2;
				}
			}
		} else if(obiekt1.typ === "grzyb") {
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekGrzybow" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "bloczekCegiel") {
				let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);

				if(stronaKolizji[0]) {
					obiekt1.y = obiekt2.y - obiekt1.h;
					obiekt1.pedY = 0;
				}
				if(stronaKolizji[1]) {
					obiekt1.x = obiekt2.x + obiekt2.w;
					obiekt1.pedX = 2;
				}
				if(stronaKolizji[3]) {
					obiekt1.x = obiekt2.x - obiekt1.w;
					obiekt1.pedX = -2;
				}
			}
		} else if(obiekt1.typ === "pocisk") {
			if(obiekt2.typ === "sciana" || obiekt2.typ === "bloczekGrzybow" || obiekt2.typ === "bloczekMonet" || obiekt2.typ === "bloczekCegiel") {
				let stronaKolizji = this.stronaKolizji(obiekt1, obiekt2);

				if(stronaKolizji[0]) {
					obiekt1.y = obiekt2.y - obiekt1.h;
					obiekt1.pedY = -12;
				}
				if(stronaKolizji[2]) {
					obiekt1.y = obiekt2.y - obiekt1.h;
					obiekt1.pedY = 0;
				}
				if(stronaKolizji[1] || stronaKolizji[3]) {
					let nrPocisku = dane.obiekty.tabelaPociskow.indexOf(obiekt1);
					dane.obiekty.tabelaPociskow.splice(nrPocisku, 1);
				}
			} else if(obiekt2.typ === "potwor") {
				let nrPotwora = dane.obiekty.tabelaPotworow.indexOf(obiekt2);
				dane.obiekty.tabelaPotworow.splice(nrPotwora, 1);
			}
		}
	}

	stronaKolizji(obiekt1, obiekt2) {
		let maksymalnaOdlegloscX = obiekt1.w/2 + obiekt2.w/2,
			maksymalnaOdlegloscY = obiekt1.h/2 + obiekt2.h/2;

		let katLewyGorny = Math.atan2(maksymalnaOdlegloscY, maksymalnaOdlegloscX) * 180 / Math.PI,
			katPrawyGorny = 180 - katLewyGorny;

		let odlegloscX = (obiekt2.x + obiekt2.w/2) - (obiekt1.x + obiekt1.w/2 ),
			odlegloscY = (obiekt2.y + obiekt2.h/2) - (obiekt1.y + obiekt1.h/2 - obiekt1.pedY);

		let katObiektow = Math.atan2(odlegloscY, odlegloscX) * 180 / Math.PI;

		let stronaKolizji = [false, false, false, false];
		if(katObiektow > katLewyGorny && katObiektow < katPrawyGorny) { // gora
			stronaKolizji[0] = true;
		} else if(katObiektow > katPrawyGorny || katObiektow < -katPrawyGorny) { // prawo
			stronaKolizji[1] = true;
		} else if(katObiektow > -katPrawyGorny && katObiektow < -katLewyGorny) { // doł
			stronaKolizji[2] = true;
		} else if(katObiektow > -katLewyGorny && katObiektow < katLewyGorny) { // lewo
			stronaKolizji[3] = true;
		}

		return stronaKolizji;
	}

	czyszczeniePociskow(dane) {
		dane.obiekty.tabelaFragmentowBloczkow.forEach((fragmentBloczka) => {
			if(fragmentBloczka.y > 624) {
				let nrFragmentu = dane.obiekty.tabelaFragmentowBloczkow.indexOf(fragmentBloczka);
				dane.obiekty.tabelaFragmentowBloczkow.splice(nrFragmentu, 1);
			}
		});
	}

	smierc(dane) {
		if(dane.obiekty.mario.y > 624) {
			dane.obiekty.mario.momentSmierci = true;
			dane.kontroler.smierc.strataZycia(dane);
		}
	}
}