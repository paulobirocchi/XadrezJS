class Torre extends Peca
{
    constructor(tipo, posI, posJ, id){
        super(tipo, posI, posJ, id);
    }

    mover(tabuleiro, i, j){
        if(j!= this.posJ && i!= this.posI)
            return false;
        if(tabuleiro[i][j] <=6 && tabuleiro[i][j]!= 0)
            var tipoPeca = WHITE;
        else
        {
            if (tabuleiro[i][j] > 6)
                var tipoPeca = BLACK;
            else
                var tipoPeca = EMPTY;
        }

        if(tipoPeca == this.tipo)
            return false;

        var movimentoI = i - this.posI;
        var movimentoJ = j - this.posJ;

        for(var z = 1; z < Math.abs(movimentoI + movimentoJ); z++)
        {
            if(movimentoI === 0)
            {
                if(movimentoJ < 0)
                {
                    if(tabuleiro[i][this.posJ - z] != 0)
                        return false;
                }
                else
                if(tabuleiro[i][this.posJ + z] != 0)
                    return false;
            }

            else
            {
                if(movimentoI < 0)
                {
                    if(tabuleiro[this.posI - z][j] != 0)
                        return false;
                }
                else
                if(tabuleiro[this.posI + z][j] != 0)
                    return false;
            }
        }
        this.posI = i;
        this.posJ = j;
        return true;
    }
}
