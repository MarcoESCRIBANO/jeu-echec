class Pièces {
    constructor(name,X,Y,couleur) {
        this.name=name; 
        this.couleur=couleur;
        this.posX=X;
        this.posY=Y;
        this.firstMouv=true;
        this.death=false;
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
    isDeath(){
        this.death=true;
    }
    resetDeath(){
        this.death=false;
    }
    haveDeath(){
        if(this.death==true){
            this.death=false;
            return true;
        }
        else{
            return this.death;
        }
    }

}

class Roi extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.plateau = plateau;
        this.echec=false;
    }
    setEchec(){
        this.echec=true;
    }

    testEchec(){
        return this.echec;
    }

    getMouvPossibilité(){
        let mouvPossibilité = [];
        let x = this.getPiècesPosition()[0];
        let y = this.getPiècesPosition()[1];
        for(let i=x-1; i<=x+1; i++){
            for(let j=y-1; j<=y+1; j++){
                if(j!=y && i>=0 && i<8 && j>=0 && j<8){
                    if(this.plateau.getPièce(i,j)!=undefined){
                        if(this.plateau.getPièce(i,j).getPiècesCouleur()!=this.getPiècesCouleur()){
                            mouvPossibilité.push([i,j]);
                        }
                    }
                    else{
                        mouvPossibilité.push([i,j]);
                    }
                }
                else if(i!=x && i>=0 && i<8 && j>=0 && j<8){
                    if(this.plateau.getPièce(i,j)!=undefined){
                        if(this.plateau.getPièce(i,j).getPiècesCouleur()!=this.getPiècesCouleur()){
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
        if(this.plateau.enEchec(X,Y,this.getPiècesCouleur())){
            console.log("coup non autorisé");
            return false;
        }
        else{
            for(let i of this.getMouvPossibilité()){
                if(X==i[0] && Y==i[1]){
                    if(this.plateau.getPièce(X,Y)!=undefined){
                        this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    }
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                    this.setPiècesPosition(X,Y);
                    this.plateau.setCase(X,Y,this);
                    return true;
                }
            }
        }
        return false;
    }

    testMouv(X,Y){
        if(this.plateau.enEchec(X,Y,this.getPiècesCouleur())){
            return false;
        }
        else{
            for(let i of this.getMouvPossibilité()){
                if(X==i[0] && Y==i[1]){
                    return true;
                }
            }
        }
        return false;
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
        while(i>=0 && this.plateau.getPièce(x,i)==undefined){
            mouvPossibilité.push([x,i]);
            i--;
        }
        if(i>=0 && this.plateau.getPièce(x,i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }
        i=y+1;
        while(i<8 && this.plateau.getPièce(x,i)==undefined){
            mouvPossibilité.push([x,i]);
            i++;
        }
        if(i<8 && this.plateau.getPièce(x,i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }    
        i=x-1;
        while(i>=0 && this.plateau.getPièce(i,y)==undefined){
            mouvPossibilité.push([i,y]);
            i--;
        }
        if(i>=0 && this.plateau.getPièce(i,y).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        i=x+1;
        while(i<8 && this.plateau.getPièce(i,y)==undefined){
            mouvPossibilité.push([i,y]);
            i++;
        }
        if(i<8 && this.plateau.getPièce(i,y).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        i=-1;
        while(x-i<8 && y+i>=0 && this.plateau.getPièce(x-i,y+i)==undefined){
            mouvPossibilité.push([x-i,y+i]);
            i--;
        }
        if(x-i<8 && y+i>=0 && this.plateau.getPièce(x-i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x-i,y+i]);
        }

        i=-1;
        while(x+i>=0 && y+i>=0 && this.plateau.getPièce(x+i,y+i)==undefined){
            mouvPossibilité.push([x+i,y+i]);
            i--;
        }
        if(x+i>=0 && y+i>=0 && this.plateau.getPièce(x+i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x+i,y+i]);
        }

        i=1;
        while(x-i>=0 && y+i<8 && this.plateau.getPièce(x-i,y+i)==undefined){
            mouvPossibilité.push([x-i,y+i]);
            i++;
        }
        if(x-i>=0 && y+i<8 && this.plateau.getPièce(x-i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x-i,y+i]);
        }

        i=1;
        while(x+i<8 && y+i<8 && this.plateau.getPièce(x+i,y+i)==undefined ){
            mouvPossibilité.push([x+i,y+i]);
            i++;
        }
        if(x+i<8 && y+i<8 && this.plateau.getPièce(x+i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x+i,y+i]);
        }
        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    console.log("coup non autorisé")
                    this.resetDeath();
                    return false;
                }
                else{
                    this.setPiècesPosition(X,Y);
                }
                for(let j of this.getMouvPossibilité()){
                    if(this.plateau.getPièce(j[0],j[1])!=undefined && this.plateau.getPièce(j[0],j[1]).getPiècesName()=="Roi" && this.plateau.getPièce(j[0],j[1]).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(j[0],j[1]).setEchec();
                    }
                }
                this.resetDeath();
                return true;
            }
        }
        return false;
    }

    testMouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    this.resetDeath();
                    return false;
                }
                else{
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                }
                this.resetDeath();
                return true;
            }
        }
        return false;
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
        while(i>=0 && this.plateau.getPièce(x,i)==undefined){
            mouvPossibilité.push([x,i]);
            i--;
        }
        if(i>=0 && this.plateau.getPièce(x,i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }
        i=y+1;
        while(i<8 && this.plateau.getPièce(x,i)==undefined){
            mouvPossibilité.push([x,i]);
            i++;
        }
        if(i<8 && this.plateau.getPièce(x,i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x,i]);
        }    
        i=x-1;
        while(i>=0 && this.plateau.getPièce(i,y)==undefined){
            mouvPossibilité.push([i,y]);
            i--;
        }
        if(i>=0 && this.plateau.getPièce(i,y).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        i=x+1;
        while(i<8 && this.plateau.getPièce(i,y)==undefined){
            mouvPossibilité.push([i,y]);
            i++;
        }
        if(i<8 && this.plateau.getPièce(i,y).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([i,y]);
        }
        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    console.log("coup non autorisé")
                    this.resetDeath();
                    return false;
                }
                else{
                    this.setPiècesPosition(X,Y);
                }
                for(let j of this.getMouvPossibilité()){
                    if(this.plateau.getPièce(j[0],j[1])!=undefined && this.plateau.getPièce(j[0],j[1]).getPiècesName()=="Roi" && this.plateau.getPièce(j[0],j[1]).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(j[0],j[1]).setEchec();
                    }
                }
                this.resetDeath();
                return true;
            }
        }
        return false;
    }

    testMouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    this.resetDeath();
                    return false;
                }
                else{
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                }
                this.resetDeath();
                return true;
            }
        }
        return false;
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
        let i=-1;
        while(x-i<8 && y+i>=0 && this.plateau.getPièce(x-i,y+i)==undefined){
            mouvPossibilité.push([x-i,y+i]);
            i--;
        }
        if(x-i<8 && y+i>=0 && this.plateau.getPièce(x-i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x-i,y+i]);
        }

        i=-1;
        while(x+i>=0 && y+i>=0 && this.plateau.getPièce(x+i,y+i)==undefined){
            mouvPossibilité.push([x+i,y+i]);
            i--;
        }
        if(x+i>=0 && y+i>=0 && this.plateau.getPièce(x+i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x+i,y+i]);
        }

        i=1;
        while(x-i>=0 && y+i<8 && this.plateau.getPièce(x-i,y+i)==undefined){
            mouvPossibilité.push([x-i,y+i]);
            i++;
        }
        if(x-i>=0 && y+i<8 && this.plateau.getPièce(x-i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x-i,y+i]);
        }

        i=1;
        while(x+i<8 && y+i<8 && this.plateau.getPièce(x+i,y+i)==undefined ){
            mouvPossibilité.push([x+i,y+i]);
            i++;
        }
        if(x+i<8 && y+i<8 && this.plateau.getPièce(x+i,y+i).getPiècesCouleur()!=this.getPiècesCouleur()){
            mouvPossibilité.push([x+i,y+i]);
        }

        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    console.log("coup non autorisé")
                    this.resetDeath();
                    return false;
                }
                else{
                    this.setPiècesPosition(X,Y);
                }
                for(let j of this.getMouvPossibilité()){
                    if(this.plateau.getPièce(j[0],j[1])!=undefined && this.plateau.getPièce(j[0],j[1]).getPiècesName()=="Roi" && this.plateau.getPièce(j[0],j[1]).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(j[0],j[1]).setEchec();
                    }
                }
                this.resetDeath();
                return true;
            }
        }
        return false;
    }

    testMouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    this.resetDeath();
                    return false;
                }
                else{
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                }
                this.resetDeath();
                return true;
            }
        }
        return false;
    }
}


class Pions extends Pièces{
    constructor(name,plateau,X,Y,couleur) {
        super(name,X,Y,couleur);
        this.priseEnPassant=undefined;
        this.deathEnPassant=false;
        this.plateau = plateau;
    }
    isDeathEnPassant(){
        this.deathEnPassant=true;
    }
    haveDeathEnPassant(){
        return this.deathEnPassant;
    }
    resetDeathEnPassant(){
        this.deathEnPassant=false;
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
            if(this.plateau.getPièce(x+1,y+1)!=undefined && this.plateau.getPièce(x+1,y+1).getPiècesCouleur()!=this.getPiècesCouleur()){
                mouvPossibilité.push([x+1,y+1]);
            }
            if(this.plateau.getPièce(x-1,y+1)!=undefined && this.plateau.getPièce(x-1,y+1).getPiècesCouleur()!=this.getPiècesCouleur()){
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
            if(this.plateau.getPièce(x+1,y-1)!=undefined && this.plateau.getPièce(x+1,y-1).getPiècesCouleur()!=this.getPiècesCouleur()){
                mouvPossibilité.push([x+1,y-1]);
            }
            if(this.plateau.getPièce(x-1,y-1)!=undefined && this.plateau.getPièce(x-1,y-1).getPiècesCouleur()!=this.getPiècesCouleur()){
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
                    this.isDeath();
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
                    this.isDeathEnPassant();
                    if(this.getPiècesCouleur()=="Blanc"){
                        this.plateau.newDeath(this.plateau.getPièce(X,Y-1));
                        this.plateau.setCase(X,Y-1,undefined);
                    }
                    else{
                        this.plateau.newDeath(this.plateau.getPièce(X,Y+1));
                        this.plateau.setCase(X,Y+1,undefined);
                    }
                    this.setPriseEnPassant(undefined);
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else if(this.haveDeathEnPassant()){
                        if(this.getPiècesCouleur()=="Blanc"){
                            this.plateau.setCase(X,Y-1,this.plateau.notDeath());
                        }
                        else{
                            this.plateau.setCase(X,Y+1,this.plateau.notDeath());
                        }
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    console.log("coup non autorisé")
                    this.resetDeath();
                    this.resetDeathEnPassant();
                    return false;
                }
                else{
                    this.setPiècesPosition(X,Y);
                }
                if(this.isFirstMouv()){
                    this.doFirstMouv();
                }
                for(let j of this.getMouvPossibilité()){
                    if(this.plateau.getPièce(j[0],j[1])!=undefined && this.plateau.getPièce(j[0],j[1]).getPiècesName()=="Roi" && this.plateau.getPièce(j[0],j[1]).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(j[0],j[1]).setEchec();
                    }
                }
                this.resetDeath();
                this.resetDeathEnPassant();
                return true;
            }
        }
        return false;
    }
    testMouv(X,Y){

        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                if(this.peutPrendreEnPassant()!=undefined && ((this.getPiècesCouleur=="Blanc" && ((this.peutPrendreEnPassant()=="droite" && X==this.getPiècesPosition()[0]+1 && Y==this.getPiècesPosition()[1]+1)||(this.peutPrendreEnPassant()=="gauche" && X==this.getPiècesPosition()[0]-1 && Y==this.getPiècesPosition()[1]+1)))||(this.getPiècesCouleur=="Noir" && ((this.peutPrendreEnPassant()=="droite" && X==this.getPiècesPosition()[0]+1 && Y==this.getPiècesPosition()[1]-1)||(this.peutPrendreEnPassant()=="gauche" && X==this.getPiècesPosition()[0]-1 && Y==this.getPiècesPosition()[1]-1))))){
                    this.isDeathEnPassant();
                    this.plateau.newDeath(this.plateau.getPièce(X,Y-1));
                    this.plateau.setCase(X,Y-1,undefined);
                }
                /*if(this.peutPrendreEnPassant()!=undefined){
                    if(this.getPiècesCouleur=="Blanc"){
                        if(this.peutPrendreEnPassant()=="droite" && X==this.getPiècesPosition()[0]+1 && Y==this.getPiècesPosition()[1]+1){
                            this.isDeathEnPassant();
                            this.plateau.newDeath(this.plateau.getPièce(X,Y-1));
                            this.plateau.setCase(X,Y-1,undefined);
                        }
                        else if(this.peutPrendreEnPassant()=="gauche" && X==this.getPiècesPosition()[0]-1 && Y==this.getPiècesPosition()[1]+1){
                            this.isDeathEnPassant();
                            this.plateau.newDeath(this.plateau.getPièce(X,Y-1));
                            this.plateau.setCase(X,Y-1,undefined);
                        }
                    }
                    else{
                        if(this.peutPrendreEnPassant()=="droite" && X==this.getPiècesPosition()[0]+1 && Y==this.getPiècesPosition()[1]-1){
                            this.isDeathEnPassant();
                            this.plateau.newDeath(this.plateau.getPièce(X,Y-1));
                            this.plateau.setCase(X,Y-1,undefined);
                        }
                        else if(this.peutPrendreEnPassant()=="gauche" && X==this.getPiècesPosition()[0]-1 && Y==this.getPiècesPosition()[1]-1){
                            this.isDeathEnPassant();
                            this.plateau.newDeath(this.plateau.getPièce(X,Y-1));
                            this.plateau.setCase(X,Y-1,undefined);
                        }    
                    }
                }*/
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else if(this.haveDeathEnPassant()){
                        if(this.getPiècesCouleur()=="Blanc"){
                            this.plateau.setCase(X,Y-1,this.plateau.notDeath());
                        }
                        else{
                            this.plateau.setCase(X,Y+1,this.plateau.notDeath());
                        }
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    this.resetDeath();
                    this.resetDeathEnPassant();
                    return false;
                }
                else{
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else if(this.haveDeathEnPassant()){
                        if(this.getPiècesCouleur()=="Blanc"){
                            this.plateau.setCase(X,Y-1,this.plateau.notDeath());
                        }
                        else{
                            this.plateau.setCase(X,Y+1,this.plateau.notDeath());
                        }
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                }
                for(let j of this.getMouvPossibilité()){
                    if(this.plateau.getPièce(j[0],j[1])!=undefined && this.plateau.getPièce(j[0],j[1]).getPiècesName()=="Roi" && this.plateau.getPièce(j[0],j[1]).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(j[0],j[1]).setEchec();
                    }
                }
                this.resetDeath();
                this.resetDeathEnPassant();
                return true;
            }
        }
        return false;
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
        if(x+1<8 && y+2<8 && (this.plateau.getPièce(x+1,y+2)==undefined || this.plateau.getPièce(x+1,y+2).getPiècesCouleur()!=this.getPiècesCouleur())){
            mouvPossibilité.push([x+1,y+2]);
        }
        if(x-1>=0 && y+2<8 && (this.plateau.getPièce(x-1,y+2)==undefined || this.plateau.getPièce(x-1,y+2).getPiècesCouleur()!=this.getPiècesCouleur())){
            mouvPossibilité.push([x-1,y+2]);
        }
        if(x+1<8 && y-2>=0 && (this.plateau.getPièce(x+1,y-2)==undefined || this.plateau.getPièce(x+1,y-2).getPiècesCouleur()!=this.getPiècesCouleur())){
            mouvPossibilité.push([x+1,y-2]);
        }
        if(x-1>=0 && y-2>=0 && (this.plateau.getPièce(x-1,y-2)==undefined || this.plateau.getPièce(x-1,y-2).getPiècesCouleur()!=this.getPiècesCouleur())){
            mouvPossibilité.push([x-1,y-2]);
        }
        if(x+2<8 && y+1<8 && (this.plateau.getPièce(x+2,y+1)==undefined || this.plateau.getPièce(x+2,y+1).getPiècesCouleur()!=this.getPiècesCouleur())){
            mouvPossibilité.push([x+2,y+1]);
        }
        if(x-2>=0 && y+1<8 && (this.plateau.getPièce(x-2,y+1)==undefined || this.plateau.getPièce(x-2,y+1).getPiècesCouleur()!=this.getPiècesCouleur())){
            mouvPossibilité.push([x-2,y+1]);
        }
        if(x+2<8 && y-1>=0 && (this.plateau.getPièce(x+2,y-1)==undefined || this.plateau.getPièce(x+2,y-1).getPiècesCouleur()!=this.getPiècesCouleur())){
            mouvPossibilité.push([x+2,y-1]);
        }
        if(x-2>=0 && y-1>=0 && (this.plateau.getPièce(x-2,y-1)==undefined || this.plateau.getPièce(x-2,y-1).getPiècesCouleur()!=this.getPiècesCouleur())){
                mouvPossibilité.push([x-2,y-1]);
        }
        return mouvPossibilité;
    }

    Mouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    console.log("coup non autorisé")
                    this.resetDeath();
                    return false;
                }
                else{
                    this.setPiècesPosition(X,Y);
                }
                for(let j of this.getMouvPossibilité()){
                    if(this.plateau.getPièce(j[0],j[1])!=undefined && this.plateau.getPièce(j[0],j[1]).getPiècesName()=="Roi" && this.plateau.getPièce(j[0],j[1]).getPiècesCouleur()!=this.getPiècesCouleur()){
                        this.plateau.getPièce(j[0],j[1]).setEchec();
                    }
                }
                this.resetDeath();
                return true;
            }
        }
        return false;
    }

    testMouv(X,Y){
        for(let i of this.getMouvPossibilité()){
            if(X==i[0] && Y==i[1]){
                if(this.plateau.getPièce(X,Y)!=undefined){
                    this.plateau.newDeath(this.plateau.getPièce(X,Y));
                    this.isDeath();
                }
                this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],undefined);
                this.plateau.setCase(X,Y,this);
                if(this.plateau.enEchec(this.plateau.getRoiPosition(this.getPiècesCouleur())[0],this.plateau.getRoiPosition(this.getPiècesCouleur())[1],this.getPiècesCouleur())){
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                    this.resetDeath();
                    return false;
                }
                else{
                    this.plateau.setCase(this.getPiècesPosition()[0],this.getPiècesPosition()[1],this);
                    if(this.haveDeath()){
                        this.plateau.setCase(X,Y,this.plateau.notDeath());
                    }
                    else{
                        this.plateau.setCase(X,Y,undefined);
                    }
                }
                this.resetDeath();
                
                return true;
            }
        }
        return false;
    }
}







