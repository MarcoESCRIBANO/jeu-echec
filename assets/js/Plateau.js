class Pièces {
    constructor(name,X,Y,couleur) {
        this.name=name; 
        this.alive=true;
        this.id=
        this.couleur=couleur;
        this.posX=X;
        this.posY=Y;
        this.firstMouv=true;
    }
    getPiècesCouleur(){
        return this.couleur;
    }

    getPiècesCouleurName(){
        if(couleur==1){
            return "Blanc";
        }
        else{
            return "Noir";
        }
    }

    getPiècesName(){
        return this.name;
    }

    death(){
        this.alive=false;
    }

    getAlive(){
        return this.alive;
    }

    getPiècesPosition(){
        return [this.posX,this.posY];
    }

    setPiècesPosition(x,y){
        this.posX=x;
        this.posY=y;
    }

    isFirstMouv(){
        return this.firstMouv;
    }

    doFirstMouv(){
        this.firstMouv=false;
    }

}

class Roi {
    constructor(name,plateau,X,Y,couleur) {
        this.pièces= new Pièces(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.pièces.getPiècesPosition()[0];
        let y = this.pièces.getPiècesPosition()[1];
        for(let i=y-1; i<=y+1; i++){
            if(i!=y){
                if(plateau.getCase(x,i).getCaseStatus()){
                    if(plateau.getCase(x,i).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
                        mouvPossibilité.push([x,i]);
                    }
                }
                else{
                    mouvPossibilité.push([x,i]);
                }
            }
            if(i!=y && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
                if(plateau.getCase(x-(i-y),y+(i-y)).getCaseStatus()){
                    if(plateau.getCase(x-(i-y),y+(i-y)).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
                        mouvPossibilité.push([x-(i-y),y+(i-y)]);
                    }
                }
                else{
                    mouvPossibilité.push([x-(i-y),y+(i-y)]);
                }
            }
            if(i!=y && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
                if(plateau.getCase(x+(i-y),y+(i-y)).getCaseStatus()){
                    if(plateau.getCase(x+(i-y),y+(i-y)).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
                        mouvPossibilité.push([x+(i-y),y+(i-y)]);
                    }
                }
                else{
                    mouvPossibilité.push([x+(i-y),y+(i-y)]);
                }
            }
        }
        for(let i=x-1; i<=x+1; i++){
            if(i!=x){
                mouvPossibilité.push([i,y]);
                if(plateau.getCase(i,y).getCaseStatus()){
                    if(plateau.getCase(i,y).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
                        mouvPossibilité.push([i,y]);
                    }
                }
                else{
                    mouvPossibilité.push([i,y]);
                }
            }
        }
        return mouvPossibilité;
    }

    Mouv(Case){
        for(i in getMouvPossibilité()){
            if([Case.getRefCaseX(),Case.getRefCaseY()]==i){
                setPiècesPosition(Case.getRefCaseX(),Case.getRefCaseY());
            }
        }
    }
}


class Reine {
    constructor(name,plateau,X,Y,couleur) {
        this.pièces= new Pièces(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.pièces.getPiècesPosition()[0];
        let y = this.pièces.getPiècesPosition()[1];
        let i=y-1;
        while(i>=0 && !plateau.getCase(x,i).getCaseStatus()){
            mouvPossibilité.push([x,i]);
            i--;
        }
        if(plateau.getCase(x,i).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }
        i=y+1;
        while(i<8 && !plateau.getCase(x,i).getCaseStatus()){
            mouvPossibilité.push([x,i]);
            i++;
        }
        if(plateau.getCase(x,i).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }    
        i=x-1;
        while(i>=0 && !plateau.getCase(i,y).getCaseStatus()){
            mouvPossibilité.push([i,y]);
            i--;
        }
        if(plateau.getCase(i,y).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        i=x+1;
        while(i<8 && !plateau.getCase(i,y).getCaseStatus()){
            mouvPossibilité.push([i,y]);
            i++;
        }
        if(plateau.getCase(i,y).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        i=y-1;
        while(i>=0 && !plateau.getCase(x-(i-y),y+(i-y)).getCaseStatus() && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i--;
        }
        if(plateau.getCase(x-(i-y),y+(i-y)).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
        }
        i=y-1;
        while(i>=0 && !plateau.getCase(x+(i-y),y+(i-y)).getCaseStatus() && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i--;
        }
        if(plateau.getCase(x+(i-y),y+(i-y)).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
        }
        i=y+1;
        while(i<8 && !plateau.getCase(x-(i-y),y+(i-y)).getCaseStatus() && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i++;
        }
        if(plateau.getCase(x-(i-y),y+(i-y)).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
        }
        i=y+1;
        while(i<8 && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0 && !plateau.getCase(x+(i-y),y+(i-y)).getCaseStatus() ){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i++;
        }
        if(plateau.getCase(x+(i-y),y+(i-y)).getCasePièces().getPiècesCouleur()!=this.pièces.getPiècesCouleur()){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
        }
        return mouvPossibilité;
    }

    Mouv(Case){
        for(i in getMouvPossibilité()){
            if([Case.getRefCaseX(),Case.getRefCaseY()]==i){
                setPiècesPosition(Case.getRefCaseX(),Case.getRefCaseY());
            }
        }
    }
}


class Tour {
    constructor(name,plateau,X,Y,couleur) {
        this.pièces= new Pièces(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.pièces.getPiècesPosition()[0];
        let y = this.pièces.getPiècesPosition()[1];
        let i=y-1;
        while(i>=0 && !plateau.getCase(x,i).getCaseStatus()){
            mouvPossibilité.push([x,i]);
            i--;
        }
        mouvPossibilité.push([x,i]);
        i=y+1;
        while(i<8 && !plateau.getCase(x,i).getCaseStatus()){
            mouvPossibilité.push([x,i]);
            i++;
        }
        mouvPossibilité.push([x,i]);
        i=x-1;
        while(i>=0 && !plateau.getCase(i,y).getCaseStatus()){
            mouvPossibilité.push([i,y]);
            i--;
        }
        mouvPossibilité.push([i,y]);
        i=x+1;
        while(i<8 && !plateau.getCase(i,y).getCaseStatus()){
            mouvPossibilité.push([i,y]);
            i++;
        }
        mouvPossibilité.push([i,y]);
        return mouvPossibilité;
    }

    Mouv(Case){
        for(i in getMouvPossibilité()){
            if([Case.getRefCaseX(),Case.getRefCaseY()]==i){
                setPiècesPosition(Case.getRefCaseX(),Case.getRefCaseY());
            }
        }
    }
}


class Fou {
    constructor(name,plateau,X,Y,couleur) {
        this.pièces= new Pièces(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.pièces.getPiècesPosition()[0];
        let y = this.pièces.getPiècesPosition()[1];
        let i=y-1;
        while(i>=0 && !plateau.getCase(x-(i-y),y+(i-y)).getCaseStatus() && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i--;
        }
        mouvPossibilité.push([x-(i-y),y+(i-y)]);
        i=y-1;
        while(i>=0 && !plateau.getCase(x+(i-y),y+(i-y)).getCaseStatus() && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i--;
        }
        mouvPossibilité.push([x+(i-y),y+(i-y)]);
        i=y+1;
        while(i<8 && !plateau.getCase(x-(i-y),y+(i-y)).getCaseStatus() && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i++;
        }
        mouvPossibilité.push([x-(i-y),y+(i-y)]);
        i=y+1;
        while(i<8 && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0 && !plateau.getCase(x+(i-y),y+(i-y)).getCaseStatus() ){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i++;
        }
        mouvPossibilité.push([x+(i-y),y+(i-y)]);
        return mouvPossibilité;
    }

    Mouv(Case){
        for(i in getMouvPossibilité()){
            if([Case.getRefCaseX(),Case.getRefCaseY()]==i){
                setPiècesPosition(Case.getRefCaseX(),Case.getRefCaseY());
            }
        }
    }
}


class Pions {
    constructor(name,X,Y,couleur) {
        this.pièces= new Pièces(name,X,Y,couleur);
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.pièces.getPiècesPosition()[0];
        let y = this.pièces.getPiècesPosition()[1];
        if(!plateau.getCase(x,y+1).getCaseStatus()){
            mouvPossibilité.push([x,y+1]);
        }
        if(this.pièces.isFirstMouv() && !plateau.getCase(x,y+2).getCaseStatus()){
            mouvPossibilité.push([x,y+2]);
        }
        if(plateau.getCase(x+1,y+1).getCaseStatus()){
            mouvPossibilité.push([x+1,y+1]);
        }
        if(plateau.getCase(x-1,y+1).getCaseStatus()){
            mouvPossibilité.push([x-1,y+1]);
        }
        return mouvPossibilité;
    }

    Mouv(Case){
        for(i in getMouvPossibilité()){
            if([Case.getRefCaseX(),Case.getRefCaseY()]==i){
                setPiècesPosition(Case.getRefCaseX(),Case.getRefCaseY());
                if(isFirstMouv()){
                    doFirstMouv();
                }
            }
        }
    }
}


class Cavalier {
    constructor(name,X,Y,couleur) {
        this.pièces= new Pièces(name,X,Y,couleur);
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.pièces.getPiècesPosition()[0];
        let y = this.pièces.getPiècesPosition()[1];
        mouvPossibilité.push([x+1,y+2]);
        mouvPossibilité.push([x-1,y+2]);
        mouvPossibilité.push([x+1,y-2]);
        mouvPossibilité.push([x-1,y-2]);
        mouvPossibilité.push([x+2,y+1]);
        mouvPossibilité.push([x-2,y+1]);
        mouvPossibilité.push([x+2,y-1]);
        mouvPossibilité.push([x-2,y-1]);
        return mouvPossibilité;
    }

    Mouv(Case){
        for(i in getMouvPossibilité()){
            if([Case.getRefCaseX(),Case.getRefCaseY()]==i){
                setPiècesPosition(Case.getRefCaseX(),Case.getRefCaseY());
            }
        }
    }
}



class Case {
    constructor(X,Y,status) {
        this.refCaseX=X; 
        this.refCaseY=Y;
        this.status=status;
        this.pièces=undefined;
    }

    getCaseCouleur(){
        if((this.refCaseX+this.refCaseY)%2==0){
            return 0; // case noir
        }
        else{
            return 1; // case blanche
        }
    }
    getCaseName(){ // retourne le non de la case au échec (ex: H-8)
        let caseName = "";
        switch(this.refCaseX){
            case 0: caseName += "A-";	break;
            case 1: caseName += "B-";	break;
            case 2: caseName += "C-";	break;
            case 3: caseName += "D-"; 	break;
            case 4: caseName += "E-"; 	break;
            case 5: caseName += "F-"; 	break;
            case 6: caseName += "G-"; 	break;
            case 7: caseName += "H-"; 	break;
        }
        let num = this.refCaseY+1;
        caseName += num;
        return caseName;
    }
    changeCaseStatus(){
        if(this.status){
            this.status=false; // case non occupé
        }
        else{
            this.status=true; // case occupé
        }
    }
    getCaseStatus(){
        return this.status;
    }
    getRefCaseX(){
        return this.refCaseX;
    }
    getRefCaseY(){
        return this.refCaseY;
    }
    setCaseStatus(status){
        this.status=status;
    }
    setCasePièces(pièces){
        this.pièces=pièces;
    }
    getCasePièces(){
        return this.pièces;
    }
}





class Plateau {
    constructor() {
        this.grid = new Array(8);
        for (let i=0; i<8; i++) {
            this.grid[i] = new Array(8);
        }
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                this.grid[i][j]=new Case(j,7-i,false);
            }
        }
    }
    getGrid(){
        return this.grid;
    }
    getCase(X,Y){
        return this.grid[7-Y][X];
    }
}


class Jeu {
    constructor(){
        this.currentPlayer=0;
        this.plateau = new Plateau();
    }
    play(pièce,Case){
        pièce.Mouv(Case);
        this.currentPlayer=(this.currentPlayer+1)%2;
    }
    reset(){
        let couleur = 0;
        for(let j=0; j<8; j++){
            for(let i=0; i<8; i++){
                if(j==2 || j== 3 || j==4 || j==5){
                    this.plateau.getCase(i,j).setCasePièces(undefined);
                }
                if(j==1){
                    couleur=0
                    this.plateau.getCase(i,j).setCasePièces(new Pions("Pions", i, j, couleur));
                }
                if(j==0){
                    couleur=0;
                    switch(i){
                        case 0:
                        case 7:
                            this.plateau.getCase(i,j).setCasePièces(new Tour("Tour", i, j, couleur));
                            break;
                        case 1:
                        case 6:
                            this.plateau.getCase(i,j).setCasePièces(new Cavalier("Cavalier", i, j, couleur));
                            break;
                        case 2:
                        case 5:
                            this.plateau.getCase(i,j).setCasePièces(new Fou("Fou", i, j, couleur));
                            break;
                        case 3:
                            this.plateau.getCase(i,j).setCasePièces(new Reine("Reine", i, j, couleur));
                            break;
                        case 4:
                            this.plateau.getCase(i,j).setCasePièces(new Roi("Roi", i, j, couleur));
                            break;
                    }
                }
                if(j==6){
                    couleur=1;
                    this.plateau.getCase(i,j).setCasePièces(new Pions("Pions", i, j, couleur));
                }
                if(j==7){
                    couleur=1;
                    switch(i){
                        case 0:
                        case 7:
                            this.plateau.getCase(i,j).setCasePièces(new Tour("Tour", i, j, couleur));
                            break;
                        case 1:
                        case 6:
                            this.plateau.getCase(i,j).setCasePièces(new Cavalier("Cavalier", i, j, couleur));
                            break;
                        case 2:
                        case 5:
                            this.plateau.getCase(i,j).setCasePièces(new Fou("Fou", i, j, couleur));
                            break;
                        case 3:
                            this.plateau.getCase(i,j).setCasePièces(new Reine("Reine", i, j, couleur));
                            break;
                        case 4:
                            this.plateau.getCase(i,j).setCasePièces(new Roi("Roi", i, j, couleur));
                            break;
                    }
                }
            }
        }
        this.grid= [
            [undefined,undefined,undefined],
            [undefined,undefined,undefined],
            [undefined,undefined,undefined]
        ];
        this.currentPlayer=0;
    }
    getCurrentPlayer(){
        return  this.currentPlayer;
    }
    getCaseState(X,Y){
        return this.grid[X][Y];
    }
    isFinished(){
        let finished = true;
        if(this.getCaseState(0, 0)!=undefined && this.getCaseState(0, 0)==this.getCaseState(1, 1) && this.getCaseState(0, 0)==this.getCaseState(2, 2)){ 
            return true;
        }
        if(this.getCaseState(0, 2)!=undefined && this.getCaseState(0, 2)==this.getCaseState(1, 1) && this.getCaseState(0, 2)==this.getCaseState(2, 0)){
            return true;
        }
        for(let x = 0; x < 3; ++x) {
            if(this.getCaseState(x, 0)!=undefined && this.getCaseState(x, 0)==this.getCaseState(x, 1) && this.getCaseState(x, 0)==this.getCaseState(x, 2)){
                return true;
            }
            if(this.getCaseState(0, x)!=undefined && this.getCaseState(0, x)==this.getCaseState(1, x) && this.getCaseState(0, x)==this.getCaseState(2, x)){
                return true;
            }
            for(let y = 0; y < 3; ++y) {
                if(this.getCaseState(x, y) == undefined){
                    finished = false;
                }
            }
        }
        
        return finished;
    }
    hasWinner(){
        if(this.isFinished()){
            if(this.getCaseState(0, 0)!=undefined && this.getCaseState(0, 0)==this.getCaseState(1, 1) && this.getCaseState(0, 0)==this.getCaseState(2, 2)){
                this.currentPlayer=this.getCaseState(0, 0);
                return true;
            }
            if(this.getCaseState(0, 2)!=undefined && this.getCaseState(0, 2)==this.getCaseState(1, 1) && this.getCaseState(0, 2)==this.getCaseState(2, 0)){
                this.currentPlayer=this.getCaseState(0, 2);
                return true;
            }
            for(let x = 0; x < 3; ++x) {
                if(this.getCaseState(x, 0)!=undefined && this.getCaseState(x, 0)==this.getCaseState(x, 1) && this.getCaseState(x, 0)==this.getCaseState(x, 2)){
                    this.currentPlayer=this.getCaseState(x, 0);
                    return true;
                }
                if(this.getCaseState(0, x)!=undefined && this.getCaseState(0, x)==this.getCaseState(1, x) && this.getCaseState(0, x)==this.getCaseState(2, x)){
                    this.currentPlayer=this.getCaseState(0, x);
                    return true;
                }
            }
        }
        return false;
    }
    getWinner(){
        if(this.hasWinner()){
            return this.currentPlayer;
        }
        else{
            return undefined;
        }
    }
}

let plateau = new Plateau();
console.log(plateau.getCase(2,7).getCaseName())


/*let roi = new Roi("roi",plateau,3,5,1);
plateau.getCase(3,6).changeCaseStatus();
console.log(roi.getMouvPossibilité());
*/
let reine = new Reine("reine",plateau,4,3,1);
plateau.getCase(4,4).changeCaseStatus();
console.log(reine.getMouvPossibilité());

/*
let tour = new Tour("tour",plateau,4,3,1);

plateau.getCase(4,5).changeCaseStatus();
console.log(tour.getMouvPossibilité());

let fou = new Fou("fou",plateau,4,3,1);

plateau.getCase(6,5).changeCaseStatus();
console.log(fou.getMouvPossibilité());
*/
module.exports = Plateau;

