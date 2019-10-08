class Peao extends Peca
{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }

    mover(tabuleiro, i, j)
    {
        let tipoPeca;
        if (Math.abs(this.posJ - j) <= 1) {
            if (Math.abs(this.posJ - j) === 1 && tabuleiro[i][j] === 0)
                return false;
            switch (this.tipo) {
                case WHITE:
                    if (i - this.posI > 2 || i - this.posI < 1)
                        return false;
                    if (i - this.posI === 2 && (j !== this.posJ || this.posI !== 1 || tabuleiro[this.posI + 1][this.posJ] !== 0))
                        return false;
                    break;
                default:
                    if (this.posI - i > 2 || this.posI - i < 1)
                        return false;
                    if (this.posI - i === 2 && (j !== this.posJ || this.posI !== 6 || tabuleiro[this.posI - 1][this.posJ] !== 0))
                        return false;
                    break;
            }
            if (this.posJ === j && tabuleiro[i][j] !== 0)
                return false;
            if (tabuleiro[i][j] <= 6 && tabuleiro[i][j] !== 0) {
                tipoPeca = WHITE;
            } else {
                if (tabuleiro[i][j] > 6) {
                    tipoPeca = BLACK;
                } else {
                    tipoPeca = EMPTY;
                }
            }
            if (tipoPeca === this.tipo)
                return false;
            this.posI = i;
            this.posJ = j;
            return true;
        }
        return false;
    }
}