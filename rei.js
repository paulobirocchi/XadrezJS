class Rei extends Peca
{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }

    mover(tabuleiro, i, j)
    {
        let tipoPeca;
        if (!(Math.abs(this.posJ - j) > 1 || Math.abs(this.posI - i) > 1)) {
            tipoPeca = tabuleiro[i][j] <= 6 && tabuleiro[i][j] !== 0 ? WHITE : tipoPeca = tabuleiro[i][j] > 6 ? BLACK : EMPTY;
            if (tipoPeca === this.tipo)
                return false;
            this.posI = i;
            this.posJ = j;
            return true;
        }
        return false;
    }
}
