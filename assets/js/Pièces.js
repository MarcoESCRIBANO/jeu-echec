class Pièces {
    constructor(name,X,Y,couleur) {
        this.name=name; 
        this.couleur=couleur;
        this.posX=X;
        this.posY=Y;
        this.firstMouv=true;
    }
    getPiècesCouleur(){
        return this.couleur;
    }

    getPiècesName(){
        return this.name;
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

class Roi extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.getPiècesPosition()[0];
        let y = this.getPiècesPosition()[1];
        for(let i=x-1; i<=x+1; i++){
            for(let j=y-1; j<=y+1; j++){
                if(j!=y && i>=0 && i<8 && j>=0 && j<8){
                    if(this.plateau.getPièce(i,j)!=undefined){
                        if(this.plateau.getPièce(i,j).getPiècesCouleur()!=this.couleur){
                            mouvPossibilité.push([i,j]);
                        }
                    }
                    else{
                        mouvPossibilité.push([i,j]);
                    }
                }
                else if(i!=x && i>=0 && i<8 && j>=0 && j<8){
                    if(this.plateau.getPièce(i,j)!=undefined){
                        if(this.plateau.getPièce(i,j).getPiècesCouleur()!=this.couleur){
                            mouvPossibilité.push([i,j]);
                        }
                    }
                    else{
                        mouvPossibilité.push([i,j]);
                    }
                }
            }
        }
        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.setPiècesPosition(X,Y);
                this.plateau.setCase(X,Y,this);
            }
        }
    }
}


class Reine extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.getPiècesPosition()[0];
        let y = this.getPiècesPosition()[1];
        let i=y-1;
        while(i>=0 && !this.plateau.getPièce(x,i)!=undefined){
            mouvPossibilité.push([x,i]);
            i--;
        }
        if(this.plateau.getPièce(x,i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }
        i=y+1;
        while(i<8 && !this.plateau.getPièce(x,i)!=undefined){
            mouvPossibilité.push([x,i]);
            i++;
        }
        if(this.plateau.getPièce(x,i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }    
        i=x-1;
        while(i>=0 && !this.plateau.getPièce(i,y)!=undefined){
            mouvPossibilité.push([i,y]);
            i--;
        }
        if(this.plateau.getPièce(i,y).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        i=x+1;
        while(i<8 && !this.plateau.getPièce(i,y)!=undefined){
            mouvPossibilité.push([i,y]);
            i++;
        }
        if(this.plateau.getPièce(i,y).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        i=y-1;
        while(i>=0 && !this.plateau.getPièce(x-(i-y),y+(i-y))!=undefined && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i--;
        }
        if(this.plateau.getPièce(x-(i-y),y+(i-y)).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
        }
        i=y-1;
        while(i>=0 && !this.plateau.getPièce(x+(i-y),y+(i-y))!=undefined && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i--;
        }
        if(this.plateau.getPièce(x+(i-y),y+(i-y)).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
        }
        i=y+1;
        while(i<8 && !this.plateau.getPièce(x-(i-y),y+(i-y))!=undefined && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i++;
        }
        if(this.plateau.getPièce(x-(i-y),y+(i-y)).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
        }
        i=y+1;
        while(i<8 && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0 && !this.plateau.getPièce(x+(i-y),y+(i-y))!=undefined ){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i++;
        }
        if(this.plateau.getPièce(x+(i-y),y+(i-y)).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
        }
        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.setPiècesPosition(X,Y);
                this.plateau.setCase(X,Y,this);
            }
        }
    }
}


class Tour extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.getPiècesPosition()[0];
        let y = this.getPiècesPosition()[1];
        let i=y-1;
        while(i>=0 && !this.plateau.getPièce(x,i)!=undefined){
            mouvPossibilité.push([x,i]);
            i--;
        }
        mouvPossibilité.push([x,i]);
        i=y+1;
        while(i<8 && !this.plateau.getPièce(x,i)!=undefined){
            mouvPossibilité.push([x,i]);
            i++;
        }
        mouvPossibilité.push([x,i]);
        i=x-1;
        while(i>=0 && !this.plateau.getPièce(i,y)!=undefined){
            mouvPossibilité.push([i,y]);
            i--;
        }
        mouvPossibilité.push([i,y]);
        i=x+1;
        while(i<8 && !this.plateau.getPièce(i,y)!=undefined){
            mouvPossibilité.push([i,y]);
            i++;
        }
        mouvPossibilité.push([i,y]);
        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.setPiècesPosition(X,Y);
                this.plateau.setCase(X,Y,this);
            }
        }
    }
}


class Fou extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.getPiècesPosition()[0];
        let y = this.getPiècesPosition()[1];
        let i=y-1;
        while(i>=0 && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0 && !this.plateau.getPièce(x-(i-y),y+(i-y))!=undefined){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i--;
        }
        mouvPossibilité.push([x-(i-y),y+(i-y)]);
        i=y-1;
        while(i>=0 && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0 && !this.plateau.getPièce(x+(i-y),y+(i-y))!=undefined){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i--;
        }
        mouvPossibilité.push([x+(i-y),y+(i-y)]);
        i=y+1;
        while(i<8 && x-(i-y)<8 && x-(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0 && !this.plateau.getPièce(x-(i-y),y+(i-y))!=undefined){
            mouvPossibilité.push([x-(i-y),y+(i-y)]);
            i++;
        }
        mouvPossibilité.push([x-(i-y),y+(i-y)]);
        i=y+1;
        while(i<8 && x+(i-y)<8 && x+(i-y)>=0 && y+(i-y)<8 && y+(i-y)>=0 && !this.plateau.getPièce(x+(i-y),y+(i-y))!=undefined ){
            mouvPossibilité.push([x+(i-y),y+(i-y)]);
            i++;
        }
        mouvPossibilité.push([x+(i-y),y+(i-y)]);
        return mouvPossibilité;
    }
    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.setPiècesPosition(X,Y);
                this.plateau.setCase(X,Y,this);
            }
        }
    }
}


class Pions extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.priseEnPassant=undefined;
        this.plateau = plateau;
    }
    setPriseEnPassant(direction){
        this.priseEnPassant=direction;
    }

    peutPrendreEnPassant(){
        return this.priseEnPassant;
    }

    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.getPiècesPosition()[0];
        let y = this.getPiècesPosition()[1];
        if(this.couleur=="Blanc"){
            if(this.peutPrendreEnPassant()=="droite"){
                mouvPossibilité.push([x+1,y+1]);
            }
            if(this.peutPrendreEnPassant()=="gauche"){
                mouvPossibilité.push([x-1,y+1]);
            }
            if(this.plateau.getPièce(x,y+1)==undefined){
                mouvPossibilité.push([x,y+1]);
            }
            if(this.isFirstMouv() && this.plateau.getPièce(x,y+2)==undefined){
                mouvPossibilité.push([x,y+2]);
            }
            if(this.plateau.getPièce(x+1,y+1)!=undefined && this.plateau.getPièce(x+1,y+1).getPiècesCouleur()!=this.couleur){
                mouvPossibilité.push([x+1,y+1]);
            }
            if(this.plateau.getPièce(x-1,y+1)!=undefined && this.plateau.getPièce(x-1,y+1).getPiècesCouleur()!=this.couleur){
                mouvPossibilité.push([x-1,y+1]);
            }
        }
        else{
            if(this.peutPrendreEnPassant()=="droite"){
                mouvPossibilité.push([x+1,y-1]);
            }
            if(this.peutPrendreEnPassant()=="gauche"){
                mouvPossibilité.push([x-1,y-1]);
            }
            if(this.plateau.getPièce(x,y-1)==undefined){
                mouvPossibilité.push([x,y-1]);
            }
            if(this.isFirstMouv() && this.plateau.getPièce(x,y-2)==undefined){
                mouvPossibilité.push([x,y-2]);
            }
            if(this.plateau.getPièce(x+1,y-1)!=undefined && this.plateau.getPièce(x+1,y-1).getPiècesCouleur()!=this.couleur){
                mouvPossibilité.push([x+1,y-1]);
            }
            if(this.plateau.getPièce(x-1,y-1)!=undefined && this.plateau.getPièce(x-1,y-1).getPiècesCouleur()!=this.couleur){
                mouvPossibilité.push([x-1,y-1]);
            }
        }
        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                }
                if(Math.abs(Y-this.getPiècesPosition()[1])==2){
                    if(X+1<8 && this.plateau.getPièce(X+1,Y)!=undefined && this.plateau.getPièce(X+1,Y).getPiècesName()=="Pions" && this.plateau.getPièce(X+1,Y).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(X+1,Y).setPriseEnPassant("gauche");
                    }
                    if(X-1>=0 && this.plateau.getPièce(X-1,Y)!=undefined && this.plateau.getPièce(X-1,Y).getPiècesName()=="Pions" && this.plateau.getPièce(X-1,Y).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(X-1,Y).setPriseEnPassant("droite");
                    }
                }
                if(this.peutPrendreEnPassant()!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y-1));
                    this.plateau.setCase(X,Y-1,undefined);
                    this.setPriseEnPassant(undefined);
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.setPiècesPosition(X,Y);
                this.plateau.setCase(X,Y,this);
                if(this.isFirstMouv()){
                    this.doFirstMouv();
                }
            }
        }
    }
}


class Cavalier extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.plateau = plateau;
    }
    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.getPiècesPosition()[0];
        let y = this.getPiècesPosition()[1];
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

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.setPiècesPosition(X,Y);
                this.plateau.setCase(X,Y,this);
            }
        }
    }
}







