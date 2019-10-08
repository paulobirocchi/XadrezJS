var jogo = new JogoXadrez();

function init() {
	gerar_tabuleiro();
	atualizar_jogo();
	jogo.reiniciar();
}

function select(i,j) {
	const tabuleiro = document.getElementById('tabuleiro');
	const obj = tabuleiro.rows[i].cells[j];

	if (select.obj_clicked === undefined) {
		const peca = jogo.getPeca(i, j);

		if (peca == null)
			return;

		select.obj_clicked = obj;
		select.obj_bgcolor = obj.style.backgroundColor;
		select.peca = peca;
		obj.style.backgroundColor = "pink";

		if (!(peca.tipo === 1 && jogo.turno === 0 || peca.tipo === 0 && jogo.turno === 1)) {
			return;
		}
		alert("Jogador errado!");
		select.obj_clicked.style.backgroundColor = select.obj_bgcolor;
		select.obj_clicked = null;
		atualizar_jogo();

	} else {
		if (select.obj_clicked !== null) {
			if (!jogo.moverPeca(select.peca, i, j)) {
				alert("Movimento invalido!");
				select.obj_clicked.style.backgroundColor = select.obj_bgcolor;
				select.obj_clicked = null;
				atualizar_jogo();
			} else {
				if (jogo.reiPreto === 7) {
					alert("Vitória das peças brancas!");
					alert("Reiniciar jogo!");
					reiniciar_jogo();
				} else {
					if (jogo.reiBranco === 1) {
						alert("Vitória das peças pretas!");
						alert("Reiniciar jogo!");
						reiniciar_jogo();
					}
					select.obj_clicked.style.backgroundColor = select.obj_bgcolor;
					select.obj_clicked = null;
					atualizar_jogo();
				}
			}
		} else {
			const peca = jogo.getPeca(i, j);

			if (peca == null)
				return;

			select.obj_clicked = obj;
			select.obj_bgcolor = obj.style.backgroundColor;
			select.peca = peca;
			obj.style.backgroundColor = "pink";

			if (!(peca.tipo === 1 && jogo.turno === 0 || peca.tipo === 0 && jogo.turno === 1)) {
				return;
			}
			alert("Jogador errado!");
			select.obj_clicked.style.backgroundColor = select.obj_bgcolor;
			select.obj_clicked = null;
			atualizar_jogo();

		}
	}
}

function atualizar_jogo() {
	let j, m;
	const pecas = ["", "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];
	jogo.reiniciar();
	let tabuleiro = document.getElementById('tabuleiro');
	let tabData = jogo.getTabuleiro();

	let i = 0, n = tabuleiro.rows.length;
	for (; i < n; i++) {
		j = 0;
		m = tabuleiro.rows[i].cells.length;
		for (; j < m; j++) {
			obj = tabuleiro.rows[i].cells[j];
				obj.innerHTML = pecas[tabData[i][j]];
		}
	}
}

function reiniciar_jogo() {
	jogo = null;
	jogo = new JogoXadrez();
	jogo.reiniciar();
	atualizar_jogo();
}

function gerar_tabuleiro() {
	let table, color;
	let i;
	table = "<table id=\"tabuleiro\">";
	color = false;
	for (i = 0; i < 8; i++) {
		table += "<tr>";
		for (let j = 0; j < 8; j++) {
			table += color ? "<td id=\"i" + i + "j" + j + "\" bgcolor=\"silver\" onclick=\"select(" + i + "," + j + ");\"></td>" : "<td id=\"i" + i + "j" + j + "\" bgcolor=\"white\" onclick=\"select(" + i + "," + j + ");\"></td>";

			color = !color;
		}
		table += "</tr>";
		color = !color;
	}
	table += "</table>";
	document.write(table);
}

init();
