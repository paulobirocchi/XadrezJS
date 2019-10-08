function JogoXadrez() {
	// Identificador de cada peça!
	let tabuleiro;
	const W_KING = 1;  // "&#9812" ♔
	const W_QUEEN = 2;  // "&#9813" ♕
	const W_ROOK = 3;  // "&#9814" ♖
	const W_BISHOP = 4;  // "&#9815" ♗
	const W_KNIGHT = 5;  // "&#9816" ♘
	const W_PAWN = 6;  // "&#9817" ♙
	const B_KING = 7;  // "&#9818" ♚
	const B_QUEEN = 8;  // "&#9819" ♛
	const B_ROOK = 9;  // "&#9820" ♜
	const B_BISHOP = 10; // "&#9821" ♝
	const B_KNIGHT = 11; // "&#9822" ♞
	const B_PAWN = 12; // "&#9823" ♟

	const WHITE = 0;
	const BLACK = 1;


	tabuleiro = new Tabuleiro([]);
	const pecas = [];
	let pretas = 0, brancas = 0;
	this.reiPreto = 0;
	this.reiBranco = 0;
	this.turno = 0;

	this.getTabuleiro = function() {
		return tabuleiro.getRepresentacao();
	};

	this.reiniciar = function() {
		let i;
		tabuleiro.tabuleiro = new Array(8);
		for (i = 0; i < 8; i++) {
			tabuleiro.tabuleiro[i] = new Array(8);
			for(let j = 0; j < 8; j++)
			{		
				tabuleiro.tabuleiro[i][j] = 0;
			}
		}

		for(i = 0; i < 8; i++)
		{
			pecas.push( new Peao(WHITE, 1, i, W_PAWN));
			pecas.push( new Peao(BLACK, 6, i, B_PAWN));
		}
		for(i = 0; i < 2; i++)
		{
			pecas.push(new Torre(WHITE, 0, i*7, W_ROOK));
			pecas.push( new Torre(BLACK, 7, i*7, B_ROOK));
			pecas.push( new Cavalo(WHITE, 0, 1+i*5, W_KNIGHT));
			pecas.push( new Cavalo(BLACK, 7, 1+i*5, B_KNIGHT));
			pecas.push( new Bispo(WHITE, 0, 2+i*3, W_BISHOP));
			pecas.push( new Bispo(BLACK, 7, 2+i*3, B_BISHOP));
		}
		
		pecas.push( new Rainha(WHITE, 0, 4, W_QUEEN));
		pecas.push( new Rainha(BLACK, 7, 4, B_QUEEN));
		pecas.push( new Rei(WHITE, 0, 3, W_KING));
		pecas.push( new Rei(BLACK, 7, 3, B_KING));
		
		for(i = 0; i < 32; i++) {
			tabuleiro.addPeca(pecas[i], pecas[i].posI, pecas[i].posJ);
		}
	};

	this.getPeca = function(i, j) {
		return tabuleiro.getPeca(pecas,i,j);
	};

	this.moverPeca = function(peca, i, j) {
		
		let z;
		let x;
		let promocao;
		let Peca;
// Não pode mover uma peça para fora do tabuleiro.
		if (!(i > 7 || i < 0 || j > 7 || j < 0)) {
			if (peca.posI === i && peca.posJ === j)
				return false;
			if (tabuleiro.tabuleiro[i][j] !== 0) {
				Peca = tabuleiro.getPeca(pecas, i, j);
			} else {
				Peca = null;
			}
			if (!peca.mover(tabuleiro.tabuleiro, i, j)) {
				return false;
			}
			if (Peca == null) {
				if (Peca != null && Peca.tipo === WHITE) {
					Peca.posI = 7;
					Peca.posJ = pretas + 8;
					pretas++;
					if (Peca.id === 1)
						this.reiBranco = 1;
				}
			} else {
				if (Peca.tipo !== BLACK) {
					if (Peca.tipo === WHITE) {
						Peca.posI = 7;
						Peca.posJ = pretas + 8;
						pretas++;
						if (Peca.id === 1)
							this.reiBranco = 1;
					}
				} else {
					Peca.posI = 0;
					Peca.posJ = brancas + 8;
					brancas++;
					if (Peca.id === 7)
						this.reiPreto = 7;
				}
			}

			tabuleiro.rmPeca(peca.posI, peca.posJ);
			tabuleiro.addPeca(peca, i, j);
			this.turno = peca.tipo === BLACK ? 0 : 1;

			if (peca.id !== 6) {
				if (peca.id === 12 && i === 0) {
					do {
						promocao = prompt("Escolha um número para substituir o peão:\n1- Rainha\n2- Torre\n3-Cavalo\n4-Bispo");
						if (promocao !== 1 && promocao !== 2 && promocao !== 3 && promocao !== 4)
							alert("Entrada Inválida, tente novamente.");
					} while (promocao !== 1 && promocao !== 2 && promocao !== 3 && promocao !== 4);

					for (z = 0; z < 32; z++)
						if (pecas[z].posI === i && pecas[z].posJ === j) {
							x = z;
							z = 32;
						}
					pecas[x] = null;

					switch (promocao) {
						case '1':
							pecas[x] = new Rainha(BLACK, i, j, B_QUEEN);
							break;
						case '2':
							pecas[x] = new Torre(BLACK, i, j, B_ROOK);
							break;
						case '3':
							pecas[x] = new Cavalo(BLACK, i, j, B_KNIGHT);
							break;
						case '4':
							pecas[x] = new Bispo(BLACK, i, j, B_BISHOP);
							break;
					}
				}
			} else if (i === 7) {
				do {
					promocao = prompt("Promocao do Peao:\nEscolha uma peca para substitui-lo\nA- Rainha\nB- Torre\nC-Cavalo\nD-Bispo");
					if (!(promocao !== 'A' && promocao !== 'B' && promocao !== 'C' && promocao !== 'D')) {
						continue;
					}
					alert("Escolha novamente");
				} while (promocao !== 'A' && promocao !== 'B' && promocao !== 'C' && promocao !== 'D');

				for (z = 0; z < 0x20; z++)
					if (pecas[z].posI === i && pecas[z].posJ === j) {
						x = z;
						z = 32;
					}
				pecas[x] = null;

				if (!(promocao !== 'A')) {
					pecas[x] = new Rainha(WHITE, i, j, W_QUEEN);
				} else if (!(promocao !== 'B')) {
					pecas[x] = new Torre(WHITE, i, j, W_ROOK);
				} else if (!(promocao !== 'C')) {
					pecas[x] = new Cavalo(WHITE, i, j, W_KNIGHT);
				} else if (!(promocao !== 'D')) {
					pecas[x] = new Bispo(WHITE, i, j, W_BISHOP);
				}
			} else if (!(peca.id !== 12) && !(i !== 0)) {
				do {
					promocao = prompt("Promocao do Peao:\nEscolha uma peca para substitui-lo\nA- Rainha\nB- Torre\nC-Cavalo\nD-Bispo");
					if (promocao !== 'A' && promocao !== 'B' && promocao !== 'C' && promocao !== 'D')
						alert("Escolha novamente");
				} while (!(promocao === 'A') && !(promocao === 'B') && !(promocao === 'C') && !(promocao === 'D'));

				for (z = 0; z < 0o40; z++)
					if (!(pecas[z].posI !== i) && !(pecas[z].posJ !== j)) {
						x = z;
						z = 32;
					}
				pecas[x] = null;

				if (promocao === 'A') {
					pecas[x] = new Rainha(BLACK, i, j, B_QUEEN);
				} else if (promocao === 'B') {
					pecas[x] = new Torre(BLACK, i, j, B_ROOK);
				} else if (promocao === 'C') {
					pecas[x] = new Cavalo(BLACK, i, j, B_KNIGHT);
				} else if (promocao === 'D') {
					pecas[x] = new Bispo(BLACK, i, j, B_BISHOP);
				}
			}
			return true;
		}
		return false;

	}
}
