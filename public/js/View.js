class View {
    constructor(plateau,couleur){
        this.plateau=plateau;
        this.couleur=couleur;
        this.reboot=false;
        this.vainqueur0=0;
        this.vainqueur1=0;
        this.moveTmp;
        this.posHaut = 1;
        this.posBas = 1;
        this.mortPrécédent;
        this.scoreBlanc=0;
        this.scoreNoir=0;
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
                    cellule.innerHTML='<img class="pieces" src="../img/'+this.plateau.show()[ligne][colonne].piece+this.plateau.show()[ligne][colonne].couleur+'.png" draggable="true" width="60" height="60">';
                }
                else{
                    cellule.innerHTML='';

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
                    cellule.innerHTML='<img class="pieces" src="../img/'+this.plateau.show()[7-ligne][7-colonne].piece+this.plateau.show()[7-ligne][7-colonne].couleur+'.png" draggable="true" width="60" height="60">';

                }
                else{
                    cellule.innerHTML='';

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


    affichPièceMorte(){

        if(this.plateau.showDeath().length!=0 && this.plateau.showDeath()[this.plateau.showDeath().length-1]!=this.mortPrécédent){
            if(this.plateau.showDeath()[this.plateau.showDeath().length-1].getPiècesCouleur()==this.couleur){
                let pionsMortHaut = document.getElementById("pionsMortHaut");
                let cellules = pionsMortHaut.getElementsByTagName("td");
                for(let cellule of cellules){
                    let numCase=cellule.getAttribute("data");
                    if(numCase==this.posHaut){
                        cellule.innerHTML='<img class="piecesMorte" src="../img/'+this.plateau.showDeath()[this.plateau.showDeath().length-1].getPiècesName()+this.plateau.showDeath()[this.plateau.showDeath().length-1].getPiècesCouleur()+'.png" width="60" height="60">';

                    }
                }
                this.posHaut++;
            }
            else{
                let pionsMortHaut = document.getElementById("pionsMortBas");
                let cellules = pionsMortHaut.getElementsByTagName("td");
                for(let cellule of cellules){
                    let numCase=cellule.getAttribute("data");
                    if(numCase==this.posBas){
                        cellule.innerHTML='<img class="piecesMorte" src="../img/'+this.plateau.showDeath()[this.plateau.showDeath().length-1].getPiècesName()+this.plateau.showDeath()[this.plateau.showDeath().length-1].getPiècesCouleur()+'.png" width="60" height="60">';
                        
                    }
                }
                this.posBas++;
            }
            this.mortPrécédent=this.plateau.showDeath()[this.plateau.showDeath().length-1];
        }
    }

    verifPlateau(){

        let grille = document.getElementById("echiquier");
        let cellules = grille.getElementsByTagName("td");
        for(let cellule of cellules){
            let numCase=cellule.getAttribute("data");
            if(numCase>=0){
                let ligne = Math.trunc((numCase-1)/8);
                let colonne = (numCase-1)%8;
                if(this.couleur=="Blanc"){
                    
                    if(this.plateau.show()[ligne][colonne]!=undefined){
                        
                        if(cellule.innerHTML!='<img class="pieces" src="../img/'+this.plateau.show()[ligne][colonne].piece+this.plateau.show()[ligne][colonne].couleur+'.png" draggable="true" width="60" height="60">'){
                            cellule.innerHTML='<img class="pieces" src="../img/'+this.plateau.show()[ligne][colonne].piece+this.plateau.show()[ligne][colonne].couleur+'.png" draggable="true" width="60" height="60">';
                            cellule.firstChild.addEventListener('drop',event =>{	
                                const target = event.target;
                                let target1=target.parentNode
                                const dragged = this.moveTmp;
                                let arriver= target.parentNode.getAttribute("data");
                                let depart = dragged.parentNode.getAttribute("data");
                                let dLigne = Math.trunc((depart-1)/8);
                                let dColonne = (depart-1)%8;
                                let aLigne = Math.trunc((arriver-1)/8);
                                let aColonne = (arriver-1)%8;
                                if(this.couleur=="Blanc"){
                                    if(this.plateau.play(this.plateau.getPièce(dColonne,7-dLigne),aColonne,7-aLigne)){
                                        socket.emit('jouer',{
                                            abscisseDepart:dColonne,
                                            ordonneDepart:7-dLigne,
                                            abscisseArrive:aColonne,
                                            ordonneArrive:7-aLigne
                                        });
                                        dragged.parentNode.removeChild(dragged);
                                        target1.appendChild(dragged);
                                        target1.removeChild(target);
                                    }
                                }
                                else{
                                    if(this.plateau.play(this.plateau.getPièce(7-dColonne,dLigne),7-aColonne,aLigne)){
                                        socket.emit('jouer',{
                                            abscisseDepart:7-dColonne,
                                            ordonneDepart:dLigne,
                                            abscisseArrive:7-aColonne,
                                            ordonneArrive:aLigne
                                        });
                                        dragged.parentNode.removeChild(dragged);
                                        target1.appendChild(dragged);
                                        target1.removeChild(target);
                                    }
                                }
                                event.preventDefault();
                            });
                        }
                    }
                    else{
                        if(cellule.innerHTML!=''){
                            cellule.innerHTML='';
                        }
                    }
                }
                else{
                    if(this.plateau.show()[7-ligne][7-colonne]!=undefined){
                       if (cellule.innerHTML!='<img class="pieces" src="../img/'+this.plateau.show()[7-ligne][7-colonne].piece+this.plateau.show()[7-ligne][7-colonne].couleur+'.png" draggable="true" width="60" height="60">'){
                            cellule.innerHTML='<img class="pieces" src="../img/'+this.plateau.show()[7-ligne][7-colonne].piece+this.plateau.show()[7-ligne][7-colonne].couleur+'.png" draggable="true" width="60" height="60">';
                            cellule.firstChild.addEventListener('drop',event =>{	
                                const target = event.target;
                                let target1=target.parentNode
                                const dragged = this.moveTmp;
                                let arriver= target.parentNode.getAttribute("data");
                                let depart = dragged.parentNode.getAttribute("data");
                                let dLigne = Math.trunc((depart-1)/8);
                                let dColonne = (depart-1)%8;
                                let aLigne = Math.trunc((arriver-1)/8);
                                let aColonne = (arriver-1)%8;
                                if(this.couleur=="Blanc"){
                                    if(this.plateau.play(this.plateau.getPièce(dColonne,7-dLigne),aColonne,7-aLigne)){
                                        socket.emit('jouer',{
                                            abscisseDepart:dColonne,
                                            ordonneDepart:7-dLigne,
                                            abscisseArrive:aColonne,
                                            ordonneArrive:7-aLigne
                                        });
                                        dragged.parentNode.removeChild(dragged);
                                        target1.appendChild(dragged);
                                        target1.removeChild(target);
                                    }
                                }
                                else{
                                    if(this.plateau.play(this.plateau.getPièce(7-dColonne,dLigne),7-aColonne,aLigne)){
                                        socket.emit('jouer',{
                                            abscisseDepart:7-dColonne,
                                            ordonneDepart:dLigne,
                                            abscisseArrive:7-aColonne,
                                            ordonneArrive:aLigne
                                        });
                                        dragged.parentNode.removeChild(dragged);
                                        target1.appendChild(dragged);
                                        target1.removeChild(target);
                                    }
                                }
                                event.preventDefault();
                            });
                       }
    
                    }
                    else{
                        if(cellule.innerHTML!=''){
                            cellule.innerHTML='';
                        }
                    }
                }
            }
        }
        this.affichPièceMorte();
        if(this.plateau.isFinished()){
            let body = document.getElementsByTagName("body");
            let h1 = document.createElement("h1");
            let p = document.createElement("p");
            h1.setAttribute("id","fin")
            p.setAttribute("id","BM")
            p.setAttribute("class","button")
            for(let pieces of this.plateau.showDeath()){
                if(pieces.getPiècesCouleur()=="Blanc"){
                    this.scoreBlanc+=100;
                }
                else{
                    this.scoreNoir+=100;
                }
            }
            this.scoreBlanc+=chronoStop();
            this.scoreNoir+=chronoStop();
            p.innerHTML='Menu'
            body[0].appendChild(p);
            let BM = document.getElementById("BM");
            BM.addEventListener('click', event =>{
                document.location.href="/menu"; 
            });
            if(this.plateau.hasWinner()){
                h1.innerHTML='Victoire des '+ this.plateau.getWinner();
                body[0].appendChild(h1);
                return this.scoreBlanc,this.scoreNoir; //fin du jeu
            }
            h1.innerHTML='Égalité';
            body[0].appendChild(h1);
            return this.scoreBlanc,this.scoreNoir; //fin du jeu
        }
        this.affichageJoueur();
        return true; //jeu continue
    }


    joueurAction(){
        let grille = document.getElementById("echiquier");
        let cellules = grille.getElementsByTagName("td");
        for(let cellule of cellules){
            let isCase=cellule.getAttribute("data");
            if(!isNaN(isCase) && isCase>=0){
                cellule.addEventListener('dragstart', event =>{
                    let target = event.target;
                    const imgSrc = target.src;
                    this.moveTmp = target;
                    event.dropEffect = 'linkMove';
                    event.dataTransfer.setData('text/plain', imgSrc);
                });
                cellule.addEventListener('dragover', event =>{
                    event.preventDefault();
                });
                if(cellule.hasChildNodes()){
                    cellule.firstChild.addEventListener('drop',event =>{
                        const target = event.target;
                        let target1=target.parentNode
                        const dragged = this.moveTmp;
                        let arriver= target.parentNode.getAttribute("data");
                        let depart = dragged.parentNode.getAttribute("data");
                        let dLigne = Math.trunc((depart-1)/8);
                        let dColonne = (depart-1)%8;
                        let aLigne = Math.trunc((arriver-1)/8);
                        let aColonne = (arriver-1)%8;
                        if(this.couleur=="Blanc"){
                            if(this.plateau.play(this.plateau.getPièce(dColonne,7-dLigne),aColonne,7-aLigne)){
                                socket.emit('jouer',{
                                    abscisseDepart:dColonne,
                                    ordonneDepart:7-dLigne,
                                    abscisseArrive:aColonne,
                                    ordonneArrive:7-aLigne
                                });
                                dragged.parentNode.removeChild(dragged);
                                target1.appendChild(dragged);
                                target1.removeChild(target);
                            }
                        }
                        else{
                            if(this.plateau.play(this.plateau.getPièce(7-dColonne,dLigne),7-aColonne,aLigne)){
                                socket.emit('jouer',{
                                    abscisseDepart:7-dColonne,
                                    ordonneDepart:dLigne,
                                    abscisseArrive:7-aColonne,
                                    ordonneArrive:aLigne
                                });
                                dragged.parentNode.removeChild(dragged);
                                target1.appendChild(dragged);
                                target1.removeChild(target);
                            }
                        }
                        event.preventDefault();
                    });
                }
                cellule.addEventListener('drop',event =>{	
                    const target = event.target;
                    const dragged = this.moveTmp;
                    let arriver= target.getAttribute("data");
                    let depart = dragged.parentNode.getAttribute("data");
                    let dLigne = Math.trunc((depart-1)/8);
                    let dColonne = (depart-1)%8;
                    let aLigne = Math.trunc((arriver-1)/8);
                    let aColonne = (arriver-1)%8;
                    if(this.couleur=="Blanc"){
                        if(this.plateau.play(this.plateau.getPièce(dColonne,7-dLigne),aColonne,7-aLigne)){
                            socket.emit('jouer',{
                                abscisseDepart:dColonne,
                                ordonneDepart:7-dLigne,
                                abscisseArrive:aColonne,
                                ordonneArrive:7-aLigne
                            });
                            dragged.parentNode.removeChild(dragged);
                            target.appendChild(dragged);
                            //this.verifPlateau();
                        }
                    }
                    else{
                        if(this.plateau.play(this.plateau.getPièce(7-dColonne,dLigne),7-aColonne,aLigne)){
                            socket.emit('jouer',{
                                abscisseDepart:7-dColonne,
                                ordonneDepart:dLigne,
                                abscisseArrive:7-aColonne,
                                ordonneArrive:aLigne
                            });
                            dragged.parentNode.removeChild(dragged);
                            target.appendChild(dragged);
                            //this.verifPlateau();
                        }
                    }
                    event.preventDefault();
                });
            }
        }
    }
}

socket.on('couleur',(data)=>{
    let jeu = new Jeu();
    let view = new View(jeu,data);
    view.initialisation();
    socket.on('chrono',(start)=>{
        if(start){
            view.joueurAction();
            chronoStart();
        }
    });
    socket.on('jouer',(data)=>{
        jeu.play(jeu.getPièce(data.abscisseDepart,data.ordonneDepart),data.abscisseArrive,data.ordonneArrive);
        view.verifPlateau();
  });
});

