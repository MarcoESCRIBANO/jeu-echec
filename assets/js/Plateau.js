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
    showDeath(){
        console.log(this.mort);
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
            return "Noir";
        }
        else{
            return "Blanche";
        }
    }
}


class Jeu extends Plateau{
    constructor(){
        super();
        this.currentPlayer=0;
    }
    show(){
        let grille = new Array(8);
        for (let i=0; i<8; i++) {
            grille[i] = new Array(8);
        }
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                if(this.getPièce(i,j)!=undefined){
                    grille[7-j][i]=this.getPièce(i,j).getPiècesName()+"/"+this.getPièce(i,j).getPiècesCouleur()
                }
            }
        }
        return grille
    }

    affichageJoueur(){
        let currentPlayer = document.getElementsByTagName("h3");
        currentPlayer[0].innerHTML = "C'est au "+'<span id="player_number">'+this.getCurrentPlayer()+'</span>';
        
    }
    

    
    affich(){
        let grille = document.getElementById("morpion");
        let cellules = grille.getElementsByTagName("td");
        for(let cellule of cellules){
            let numCase=cellule.getAttribute("data");
            let ligne = Math.trunc((numCase-1)/8);
            let colonne = (numCase-1)%8;
            for (let i=0; i<8; i++){
                for (let j=0; j<8; j++){
                    if(i==ligne && j==colonne){
                        if(this.show()[ligne][colonne]!=undefined){
                            cellule.innerHTML=this.show()[ligne][colonne];
                        }
                    }
                }
            }
        }
        this.affichageJoueur();
    }

    play(pièce,X,Y){
        if(pièce!=undefined){
            if(pièce.getPiècesCouleur()==this.currentPlayer){
                pièce.Mouv(X,Y);
                if(this.currentPlayer=="Blanc"){
                    this.currentPlayer="Noir";
                }
                else{
                    this.currentPlayer="Blanc";
                }
            }
        }
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
    getPièceState(X,Y){
        return this.grid[X][Y];
    }
    isFinished(){
        let finished = true;
        if(this.getPièceState(0, 0)!=undefined && this.getPièceState(0, 0)==this.getPièceState(1, 1) && this.getPièceState(0, 0)==this.getPièceState(2, 2)){ 
            return true;
        }
        if(this.getPièceState(0, 2)!=undefined && this.getPièceState(0, 2)==this.getPièceState(1, 1) && this.getPièceState(0, 2)==this.getPièceState(2, 0)){
            return true;
        }
        for(let x = 0; x < 3; ++x) {
            if(this.getPièceState(x, 0)!=undefined && this.getPièceState(x, 0)==this.getPièceState(x, 1) && this.getPièceState(x, 0)==this.getPièceState(x, 2)){
                return true;
            }
            if(this.getPièceState(0, x)!=undefined && this.getPièceState(0, x)==this.getPièceState(1, x) && this.getPièceState(0, x)==this.getPièceState(2, x)){
                return true;
            }
            for(let y = 0; y < 3; ++y) {
                if(this.getPièceState(x, y) == undefined){
                    finished = false;
                }
            }
        }
        
        return finished;
    }
    hasWinner(){
        if(this.isFinished()){
            if(this.getPièceState(0, 0)!=undefined && this.getPièceState(0, 0)==this.getPièceState(1, 1) && this.getPièceState(0, 0)==this.getPièceState(2, 2)){
                this.currentPlayer=this.getPièceState(0, 0);
                return true;
            }
            if(this.getPièceState(0, 2)!=undefined && this.getPièceState(0, 2)==this.getPièceState(1, 1) && this.getPièceState(0, 2)==this.getPièceState(2, 0)){
                this.currentPlayer=this.getPièceState(0, 2);
                return true;
            }
            for(let x = 0; x < 3; ++x) {
                if(this.getPièceState(x, 0)!=undefined && this.getPièceState(x, 0)==this.getPièceState(x, 1) && this.getPièceState(x, 0)==this.getPièceState(x, 2)){
                    this.currentPlayer=this.getPièceState(x, 0);
                    return true;
                }
                if(this.getPièceState(0, x)!=undefined && this.getPièceState(0, x)==this.getPièceState(1, x) && this.getPièceState(0, x)==this.getPièceState(2, x)){
                    this.currentPlayer=this.getPièceState(0, x);
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

let jeu = new Jeu();

jeu.reset();
/*console.log(jeu.getPièce(3,0).getPiècesName());
jeu.show()
jeu.affich()
jeu.play(jeu.getPièce(1,1),1,3)
jeu.show()
jeu.play(jeu.getPièce(6,1),6,3)
jeu.show()
jeu.play(jeu.getPièce(6,6),6,4)
jeu.show()
jeu.play(jeu.getPièce(1,3),1,4)
jeu.show()
jeu.play(jeu.getPièce(1,0),0,2)
jeu.show()
jeu.play(jeu.getPièce(2,0),1,1)
jeu.show()
jeu.play(jeu.getPièce(1,1),7,7)
jeu.show()
jeu.play(jeu.getPièce(7,7),3,3)
jeu.show()
jeu.play(jeu.getPièce(3,3),5,1)
jeu.show()
jeu.play(jeu.getPièce(2,1),2,3)
jeu.show()
jeu.play(jeu.getPièce(2,3),1,4)
jeu.show()
jeu.play(jeu.getPièce(2,6),2,5)
jeu.show()
jeu.play(jeu.getPièce(1,4),2,5)

jeu.show()
jeu.showDeath()
*/


jeu.play(jeu.getPièce(1,1),1,3)
jeu.play(jeu.getPièce(6,6),6,4)
jeu.play(jeu.getPièce(1,3),1,4)
jeu.play(jeu.getPièce(2,6),2,4)
jeu.play(jeu.getPièce(1,4),2,5)
jeu.play(jeu.getPièce(1,7),2,5)
jeu.affich()
jeu.showDeath()