class View {
    constructor(plateau,couleur){
        this.plateau=plateau;
        this.couleur=couleur;
        this.reboot=false;
        this.vainqueur0=0;
        this.vainqueur1=0;
        this.moveTmp;
    }

    initialisation(){
        this.plateau.reset();
        if(this.couleur=="Blanc"){
            this.affichBlanc();
        }
        else{
            this.affichNoir();
        }

    }

    affichageJoueur(){
        let currentPlayer = document.getElementsByTagName("h3");
        currentPlayer[0].innerHTML = "C'est au "+'<span id="player_number">'+this.plateau.getCurrentPlayer()+'</span>';
        
    }

    affichBlanc(){
        let grille = document.getElementById("echiquier");
        let cellules = grille.getElementsByTagName("td");
        for(let cellule of cellules){
            let numCase=cellule.getAttribute("data");
            if(isNaN(numCase)){
                if(numCase=='X'){
                    numCase='';
                }
                cellule.innerHTML=numCase;
            }
            else if(numCase>=0){
                let ligne = Math.trunc((numCase-1)/8);
                let colonne = (numCase-1)%8;
                if(this.plateau.show()[ligne][colonne]!=undefined){
                    cellule.innerHTML='<img src="../img/'+this.plateau.show()[ligne][colonne].piece+this.plateau.show()[ligne][colonne].couleur+'.png" draggable="true" width="60" height="60">';
                }
                if(this.plateau.getCaseCouleur(ligne,colonne)=="Blanche"){
                    cellule.className = 'caseBlanche'
                }
                else{
                    cellule.className = 'caseNoir'
                }
            }
            else{
                cellule.innerHTML=9-Math.abs(numCase);
            }
        }
        this.affichageJoueur();
    }

    affichNoir(){
        let grille = document.getElementById("echiquier");
        let cellules = grille.getElementsByTagName("td");
        for(let cellule of cellules){
            let numCase=cellule.getAttribute("data");
            if(isNaN(numCase)){
                switch(numCase){
                    case 'A':
                        numCase='H';
                        break;
                    case 'B':
                        numCase='G';
                        break;
                    case 'C':
                        numCase='F';
                        break;
                    case 'D':
                        numCase='E';
                        break;
                    case 'E':
                        numCase='D';
                        break;
                    case 'F':
                        numCase='C';
                        break;
                    case 'G':
                        numCase='B';
                        break;
                    case 'H':
                        numCase='A';
                        break;
                    case 'X':
                        numCase='';
                        break;
                }
                cellule.innerHTML=numCase;
            }
            else if(numCase>=0){
                let ligne = Math.trunc((numCase-1)/8);
                let colonne = (numCase-1)%8;
                if(this.plateau.show()[7-ligne][7-colonne]!=undefined){
                    cellule.innerHTML='<img src="../img/'+this.plateau.show()[7-ligne][7-colonne].piece+this.plateau.show()[7-ligne][7-colonne].couleur+'.png" draggable="true" width="60" height="60">';

                }
                if(this.plateau.getCaseCouleur(ligne,colonne)=="Blanche"){
                    cellule.className = 'caseBlanche'
                }
                else{
                    cellule.className = 'caseNoir'
                }
            }
            else{
                cellule.innerHTML=Math.abs(numCase);
            }
        }
        this.affichageJoueur();
    }

    /*affichageVainqueur(aVainqueur){
        let vainqueur = document.getElementsByTagName("h3");
        if(aVainqueur){
            vainqueur[1].innerHTML = 'Le joueur '+this.game.getWinner()+' a gagné';
            if(this.game.getWinner()==0){
                this.vainqueur0++;
                
                console.log("nbVic0: "+this.vainqueur0)
            }
            else{
                this.vainqueur1++;
                console.log("nbVic1: "+this.vainqueur1)
            }
            vainqueur[3].innerHTML = this.vainqueur0+' / '+this.vainqueur1;

        }
        else{
            vainqueur[1].innerHTML = 'Égalité';
        }
    }

    affichageJoueur(){
        let currentPlayer = document.getElementsByTagName("h3");
        currentPlayer[0].innerHTML = "C'est au joueur "+'<span id="player_number">'+this.game.getCurrentPlayer()+'</span>';
        
    }
    

    affichageCellule(cellulejoué,celluleAffichage, cellules){
        console.log(cellulejoué)
        if(cellulejoué==1){
            celluleAffichage.innerHTML='⭕️';
        }
        else{
            celluleAffichage.innerHTML='❌';
        }
        if(this.game.isFinished()){
            this.reboot=true;
            this.affichageVainqueur(this.game.hasWinner());
            let currentPlayer = document.getElementsByTagName("h3");
            currentPlayer[0].innerHTML = "CLIQUEZ SUR LA GRILLE POUR REJOUER";
        }
        else{
            this.affichageJoueur();
        }
    }

    réinitialiser(cellules){
        for(let cellule of cellules){
            cellule.innerHTML='';
        }
        this.game.reset();
        this.affichageJoueur();
        this.reboot=false;
    }*/
    
    joueurAction(){
        let grille = document.getElementById("echiquier");
        let cellules = grille.getElementsByTagName("td");
        this.initialisation();
        for(let cellule of cellules){
            let isCase=cellule.getAttribute("data");
            if(!isNaN(isCase) && isCase>=0){
                
                    cellule.addEventListener('dragstart', event =>{
                        let target = event.target;
                        // Store a ref. on the dragged elem
                        const imgSrc = target.src;
                        this.moveTmp = target;
                        event.dropEffect = 'linkMove';
                        event.dataTransfer.setData("text", imgSrc);
                    });
                    cellule.addEventListener('dragover', event =>{
                        event.preventDefault();
                    });
                    cellule.addEventListener('drop',event =>{	
                        const target = event.target;
                        const dragged = this.moveTmp;
                        let arriver= target.getAttribute("data");
                        let depart = dragged.parentNode.getAttribute("data");
                        let dLigne = Math.trunc((depart-1)/8);
                        let dColonne = (depart-1)%8;
                        let aLigne = Math.trunc((arriver-1)/8);
                        let aColonne = (arriver-1)%8;
                        if(this.plateau.play(this.plateau.getPièce(dColonne,dLigne),aColonne,aLigne)){
                            event.preventDefault();
                        // Get the id of the target and add the moved element to the target's DOM
                        dragged.parentNode.removeChild(dragged);
                        target.innerHTML='';;
                        target.appendChild(dragged);
                        }
                    });

                
            }
        }
    }
}

let jeu = new Jeu();
let view = new View(jeu,"Blanc");
view.joueurAction();