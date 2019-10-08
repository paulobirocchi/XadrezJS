class Cavalo extends Peca
{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }

    mover(tabuleiro, i, j){
        let tipoPeca;
        tipoPeca = tabuleiro[i][j] <= 6 && tabuleiro[i][j] !== 0 ? WHITE : tipoPeca = tabuleiro[i][j] > 6 ? BLACK : EMPTY;

        if (tipoPeca !== this.tipo) {
            const movimentoI = i - this.posI;
            const movimentoJ = j - this.posJ;
            if (Math.abs(movimentoI) !== 2 && Math.abs(movimentoJ) !== 2 || Math.abs(movimentoI) === 2 && Math.abs(movimentoJ) !== 1) return false;
            if (Math.abs(movimentoJ) === 2 && Math.abs(movimentoI) !== 1)
                return false;
            this.posI = i;
            this.posJ = j;
            return true;
        }
        return false;
    }
}

