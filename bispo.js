class Bispo extends Peca
{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }

    mover(tabuleiro, i, j)
    {
        let tipoPeca;
        tipoPeca = tabuleiro[i][j] <= 6 && tabuleiro[i][j] !== 0 ? WHITE : tabuleiro[i][j] > 6 ? BLACK : EMPTY;

        if(tipoPeca === this.tipo)
            return false;

        const movimentoI = i - this.posI;
        const movimentoJ = j - this.posJ;
        if (Math.abs(movimentoI) === Math.abs(movimentoJ)) {
            for (var z = 1; z < Math.abs(movimentoI); z++) {
                if (movimentoI < 0) {
                    if (movimentoJ < 0) {
                        if (tabuleiro[this.posI - z][this.posJ - z] !== 0)
                            return false;
                    } else if (tabuleiro[this.posI - z][this.posJ + z] !== 0)
                        return false;
                } else {
                    if (movimentoJ < 0) {
                        if (tabuleiro[this.posI + z][this.posJ - z] !== 0)
                            return false;
                    } else if (tabuleiro[this.posI + z][this.posJ + z] !== 0)
                        return false;
                }
            }
            this.posI = i;
            this.posJ = j;
            return true;
        }
        return false;
    }
}
