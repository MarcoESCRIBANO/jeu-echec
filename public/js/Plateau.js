class Plateau {
    constructor() {
        this.grid = new Array(8);
        for (let i=0; i<8; i++) {
            this.grid[i] = new Array(8);
        }
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                this.grid[i][j]=undefined;
            }
        }
        this.mort = [];
    }
    newDeath(pièce){
        this.mort.push(pièce);
    }
    resetDeath(){
        this.mort=[];
    }
    notDeath(){
        return this.mort.pop();
    }
    showDeath(){
        return this.mort;
    }
    getGrid(){
        return this.grid;
    }
    getPièce(X,Y){
        return this.grid[7-Y][X];
    }
    setCase(X,Y,pièce){
        this.grid[7-Y][X]=pièce;
    }
    getCaseName(X,Y){ // retourne le non de la case au échec (ex: H-8)
        let caseName = "";
        switch(X){
            case 0: caseName += "A-";	break;
            case 1: caseName += "B-";	break;
            case 2: caseName += "C-";	break;
            case 3: caseName += "D-"; 	break;
            case 4: caseName += "E-"; 	break;
            case 5: caseName += "F-"; 	break;
            case 6: caseName += "G-"; 	break;
            case 7: caseName += "H-"; 	break;
        }
        let num = Y+1;
        caseName += num;
        return caseName;
    }
    getCaseCouleur(X,Y){
        if((X+Y)%2==0){
            return "Blanche";
        }
        else{
            return "Noir";
        }
    }
}


class Jeu extends Plateau{
    constructor(){
        super();
        this.currentPlayer="Blanc";
        this.positionRB=[4,0];
        this.positionRN=[4,7];
    }
    show(){
        let grille = new Array(8);
        for (let i=0; i<8; i++) {
            grille[i] = new Array(8);
        }
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                if(this.getPièce(i,j)!=undefined){
                    grille[7-j][i]={piece:this.getPièce(i,j).getPiècesName(),
                        couleur:this.getPièce(i,j).getPiècesCouleur()}
                }
            }
        }
        return grille
    }

    newRoiPosition(X,Y){
        if(this.currentPlayer=="Blanc"){
            this.positionRB[0]=X;
            this.positionRB[1]=Y;
        }
        else{
            this.positionRN[0]=X;
            this.positionRN[1]=Y;
        }
    }

    getRoiPosition(couleur){
        if(couleur=="Blanc"){
            return this.positionRB;
        }
        else{
            return this.positionRN;
        }
    }

    enEchec(x,y,couleur){
        let mouvPossibilité = [];
        let i=y-1;
        while(i>=0 && this.getPièce(x,i)==undefined){
            i--;
        }
        if(i>=0 && this.getPièce(x,i).getPiècesCouleur()!=couleur && (this.getPièce(x,i).getPiècesName()=="Tour" || this.getPièce(x,i).getPiècesName()=="Reine" || (Math.abs(y-i)==1 && this.getPièce(x,i).getPiècesName()=="Roi"))){
            mouvPossibilité.push([x,i]);
            return true;
        }
        i=y+1;
        while(i<8 && this.getPièce(x,i)==undefined){
            i++;
        }
        if(i<8 && this.getPièce(x,i).getPiècesCouleur()!=couleur && (this.getPièce(x,i).getPiècesName()=="Tour" || this.getPièce(x,i).getPiècesName()=="Reine" || (Math.abs(y-i)==1 && this.getPièce(x,i).getPiècesName()=="Roi"))){
            mouvPossibilité.push([x,i]);
            return true;
        }    
        i=x-1;
        while(i>=0 && this.getPièce(i,y)==undefined){
            i--;
        }
        if(i>=0 && this.getPièce(i,y).getPiècesCouleur()!=couleur && (this.getPièce(i,y).getPiècesName()=="Tour" || this.getPièce(i,y).getPiècesName()=="Reine" || (Math.abs(x-i)==1 && this.getPièce(i,y).getPiècesName()=="Roi"))){
            mouvPossibilité.push([i,y]);
            return true;
        }
        i=x+1;
        while(i<8 && this.getPièce(i,y)==undefined){
            i++;
        }
        if(i<8 && this.getPièce(i,y).getPiècesCouleur()!=couleur && (this.getPièce(i,y).getPiècesName()=="Tour" || this.getPièce(i,y).getPiècesName()=="Reine" || (Math.abs(x-i)==1 && this.getPièce(i,y).getPiècesName()=="Roi"))){
            mouvPossibilité.push([i,y]);
            return true;
        }
        i=-1;
        while(x-i<8 && y+i>=0 && this.getPièce(x-i,y+i)==undefined){
            i--;
        }
        if(x-i<8 && y+i>=0 && this.getPièce(x-i,y+i).getPiècesCouleur()!=couleur && (this.getPièce(x-i,y+i).getPiècesName()=="Fou" || this.getPièce(x-i,y+i).getPiècesName()=="Reine" || (Math.abs(i)==1 && (this.getPièce(x-i,y+i).getPiècesName()=="Roi" || (this.getPièce(x-i,y+i).getPiècesName()=="Pion" && couleur=="Noir"))))){
            mouvPossibilité.push([x-i,y+i]);
            return true;
        }
        i=-1;
        while(x+i>=0 && y+i>=0 && this.getPièce(x+i,y+i)==undefined){
            i--;
        }
        if(x+i>=0 && y+i>=0 && this.getPièce(x+i,y+i).getPiècesCouleur()!=couleur && (this.getPièce(x+i,y+i).getPiècesName()=="Fou" || this.getPièce(x+i,y+i).getPiècesName()=="Reine" || (Math.abs(i)==1 && (this.getPièce(x+i,y+i).getPiècesName()=="Roi" || (this.getPièce(x+i,y+i).getPiècesName()=="Pion" && couleur=="Noir"))))){
            mouvPossibilité.push([x+i,y+i]);
            return true;
        }
        i=1;
        while(x-i>=0 && y+i<8 && this.getPièce(x-i,y+i)==undefined ){
            i++;
        }
        if(x-i>=0 && y+i<8 && this.getPièce(x-i,y+i).getPiècesCouleur()!=couleur && (this.getPièce(x-i,y+i).getPiècesName()=="Fou" || this.getPièce(x-i,y+i).getPiècesName()=="Reine" || (Math.abs(i)==1 && (this.getPièce(x-i,y+i).getPiècesName()=="Roi" || (this.getPièce(x-i,y+i).getPiècesName()=="Pion" && couleur=="Blanc"))))){
            mouvPossibilité.push([x-i,y+i]);
            return true;
        }
        i=1;
        while(x+i<8 && y+i<8 && this.getPièce(x+i,y+i)==undefined ){
            i++;
        }
        if(x+i<8 && y+i<8 && this.getPièce(x+i,y+i).getPiècesCouleur()!=couleur && (this.getPièce(x+i,y+i).getPiècesName()=="Fou" || this.getPièce(x+i,y+i).getPiècesName()=="Reine" || (Math.abs(i)==1 && (this.getPièce(x+i,y+i).getPiècesName()=="Roi" || (this.getPièce(x+i,y+i).getPiècesName()=="Pion" && couleur=="Blanc"))))){
            mouvPossibilité.push([x+i,y+i]);
            return true;
        }

        if(x+1<8 && y+2<8 && this.getPièce(x+1,y+2)!=undefined && this.getPièce(x+1,y+2).getPiècesCouleur()!=couleur && this.getPièce(x+1,y+2).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x+1,y+2]);
            return true;
        }
        if(x-1>=0 && y+2<8 && this.getPièce(x-1,y+2)!=undefined && this.getPièce(x-1,y+2).getPiècesCouleur()!=couleur && this.getPièce(x-1,y+2).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x-1,y+2]);
            return true;
        }
        if(x+1<8 && y-2>=0 && this.getPièce(x+1,y-2)!=undefined && this.getPièce(x+1,y-2).getPiècesCouleur()!=couleur && this.getPièce(x+1,y-2).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x+1,y-2]);
            return true;
        }
        if(x-1>=0 && y-2>=0 && this.getPièce(x-1,y-2)!=undefined && this.getPièce(x-1,y-2).getPiècesCouleur()!=couleur && this.getPièce(x-1,y-2).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x-1,y-2]);
            return true;
        }
        if(x+2<8 && y+1<8 && this.getPièce(x+2,y+1)!=undefined && this.getPièce(x+2,y+1).getPiècesCouleur()!=couleur && this.getPièce(x+2,y+1).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x+2,y+1]);
            return true;
        }
        if(x-2>=0 && y+1<8 && this.getPièce(x-2,y+1)!=undefined && this.getPièce(x-2,y+1).getPiècesCouleur()!=couleur && this.getPièce(x-2,y+1).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x-2,y+1]);
            return true;
        }
        if(x+2<8 && y-1>=0 && this.getPièce(x+2,y-1)!=undefined && this.getPièce(x+2,y-1).getPiècesCouleur()!=couleur && this.getPièce(x+2,y-1).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x+2,y-1]);
            return true;
        }
        if(x-2>=0 && y-1>=0 && this.getPièce(x-2,y-1)!=undefined && this.getPièce(x-2,y-1).getPiècesCouleur()!=couleur && this.getPièce(x-2,y-1).getPiècesName()=="Cavalier"){
            mouvPossibilité.push([x-2,y-1]);
            return true;
        }
        return false;
    }

    play(pièce,X,Y){
        if(pièce!=undefined){
            if(pièce.getPiècesCouleur()==this.currentPlayer){
                if(pièce.Mouv(X,Y)){
                    if(pièce.getPiècesName()=="Roi"){
                        this.newRoiPosition(X,Y);
                    }
                    if(this.currentPlayer=="Blanc"){
                        this.currentPlayer="Noir";
                    }
                    else{
                        this.currentPlayer="Blanc";
                    }
                    return true;
                }
            }
        }
        return false;
    }

    reset(){
        let couleur = "Blanc";
        for(let j=0; j<8; j++){
            for(let i=0; i<8; i++){
                if(j==2 || j== 3 || j==4 || j==5){
                    this.setCase(i,j,undefined);
                }
                if(j==1){
                    couleur="Blanc"
                    this.setCase(i,j,new Pions("Pions", this, i, j, couleur));

                }
                if(j==0){
                    couleur="Blanc";
                    switch(i){
                        case 0:
                        case 7:
                            this.setCase(i,j,new Tour("Tour", this, i, j, couleur));
                            break;
                        case 1:
                        case 6:
                            this.setCase(i,j,new Cavalier("Cavalier", this, i, j, couleur));
                            break;
                        case 2:
                        case 5:
                            this.setCase(i,j,new Fou("Fou", this, i, j, couleur));
                            break;
                        case 3:
                            this.setCase(i,j,new Reine("Reine", this, i, j, couleur));
                            break;
                        case 4:
                            this.setCase(i,j,new Roi("Roi", this, i, j, couleur));
                            break;
                    }
                }
                if(j==6){
                    couleur="Noir";
                    this.setCase(i,j,new Pions("Pions", this, i, j, couleur));
                }
                if(j==7){
                    couleur="Noir";
                    switch(i){
                        case 0:
                        case 7:
                            this.setCase(i,j,new Tour("Tour", this, i, j, couleur));
                            break;
                        case 1:
                        case 6:
                            this.setCase(i,j,new Cavalier("Cavalier", this, i, j, couleur));
                            break;
                        case 2:
                        case 5:
                            this.setCase(i,j,new Fou("Fou", this, i, j, couleur));
                            break;
                        case 3:
                            this.setCase(i,j,new Reine("Reine", this, i, j, couleur));
                            break;
                        case 4:
                            this.setCase(i,j,new Roi("Roi", this, i, j, couleur));
                            break;
                    }
                }
            }
        }
        this.currentPlayer="Blanc";
    }

    getCurrentPlayer(){
        return  this.currentPlayer;
    }

    pat(){
        let patBlanc = true;
        let patNoir = true;
        for(let i = 0; i<8; i++){
            for(let j = 0; j<8; j++){
                if(this.getPièce(j,i)!=undefined){
                    for(let u of this.getPièce(j,i).getMouvPossibilité()){
                        if(this.getPièce(j,i).testMouv(u[0],u[1])){
                            if(this.getPièce(j,i).getPiècesCouleur()=="Blanc"){
                                patBlanc=false;
                            }
                            else{
                                patNoir=false;
                            }
                        }
                    }
                }
            }
        }
        if(patBlanc||patNoir){
            return true;
        }
        return false;
    }

    mat(){
        if(this.enEchec(this.getRoiPosition("Blanc")[0],this.getRoiPosition("Blanc")[1],"Blanc") && this.pat()){
            return "matBlanc";
        }
        else if(this.enEchec(this.getRoiPosition("Noir")[0],this.getRoiPosition("Noir")[1],"Noir") && this.pat()){
            return "matNoir";
        }

    }

    isFinished(){
        if(this.mat()=="matNoir"|| this.mat()=="matBlanc" || this.pat()){
            return true;
        }
        else{
            return false;
        }
    }
    hasWinner(){
        if(this.isFinished() && (this.mat()=="matNoir"|| this.mat()=="matBlanc")){
            return true;
        }
        else{
            return false;
        }
    }
    getWinner(){
        if(this.hasWinner()){
            if(this.mat()=="matNoir"){
                return "Blancs";
            }
            else{
                return "Noirs";
            }
        }
        else{
            return undefined;
        }
    }
}