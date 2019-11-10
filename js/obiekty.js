class Obiekty {
	constructor(dane) {
		
		let niebo = {
			obraz: new Obraz(dane.grafika, 0, 208, 960, 208),
			x: 0,
			y: 0,
			w: 2880,
			h: 624
		};
		
		let mapa = {
			obraz: new Obraz(dane.grafika, 0, 0, 1440, 208),
			x: 0, 
			y: 0,
			w: 4320,
			h: 624
		};
		
		let mario = new Mario(dane.grafika,0,0,48,48);		
		
		let sciany = [[0,528,1104,96],[960,480,144,48],[1008,432,96,48],[1056,384,48,48],[1296,528,480,96],[1296,480,144,48],[1296,432,96,48],[1296,384,48,48],[1776,480,48,144],[1920,432,48,192],[2064,384,48,240],[2208,336,48,288],[2352,336,528,96],[2352,432,384,96],[2352,528,1968,96],[3504,480,288,48],[3552,432,240,48],[3600,384,192,48],[3648,336,144,48],[3696,288,96,48],[3744,240,48,48],[-48,0,48,624],[4320,0,48,624]];
		
		let potwory = [[864 , 480], [1440, 480], [2880, 480]]; //
		
		let monety = [[528,240],[576,240],[624,240]];
		
		let bloczkiMonet = [[528, 144],[624, 144],[3024,336],[3216,336]];
		
		let bloczkiGrzybow = [[480, 336, "powiekszenie"],[672, 336, "zycie"],[3120,96, "powiekszenie"],[0, 336, "strzelanie"]];
		
		let bloczkiCegiel = [[528,336],[576,336],[624,336],[576,144],[2256,96],[2304,96],[2352,96],[2544,96],[2736,96],[2928,96]];
												
		dane.obiekty = {};
		dane.obiekty.niebo = niebo;
		dane.obiekty.mapa = mapa;
		dane.obiekty.mario = mario;		
		dane.obiekty.tabelaScian = [];
		dane.obiekty.tabelaPotworow = [];
		dane.obiekty.tabelaMonet = [];
		dane.obiekty.tabelaBloczkowMonet = [];
		dane.obiekty.tabelaBloczkowGrzybow = [];
		dane.obiekty.tabelaBloczkowCegiel = [];
		dane.obiekty.tabelaPociskow = [];
		dane.obiekty.tabelaFragmentowBloczkow = [];
		
		sciany.forEach(function(z) {
			dane.obiekty.tabelaScian.push(new  Sciana(z[0],z[1],z[2],z[3]));
		});
		
		potwory.forEach(function(p) {
			dane.obiekty.tabelaPotworow.push(new  Potwor(dane.grafika, p[0], p[1], 48, 48));
		});
    
		monety.forEach(function(m) {
			dane.obiekty.tabelaMonet.push(new  Moneta(dane.grafika, m[0], m[1], 48, 48));
		});
		
		bloczkiMonet.forEach(function(bm) {
			dane.obiekty.tabelaBloczkowMonet.push(new BloczekMonet(dane.grafika, bm[0], bm[1], 48, 48));
		});
		
		bloczkiGrzybow.forEach(function(bg) {
			dane.obiekty.tabelaBloczkowGrzybow.push(new BloczekGrzybkow(dane.grafika, bg[0], bg[1], 48, 48, bg[2]));
		});
		
		bloczkiCegiel.forEach(function(bc) {
			dane.obiekty.tabelaBloczkowCegiel.push(new BloczekCegiel(dane.grafika, bc[0], bc[1], 48, 48));
		});
		
	}
};





