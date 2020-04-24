document.forms["inscription"].addEventListener('input', function(){
    let erreur="";
    let inputs=this;
    let texte=document.getElementById("erreur");
    let envoyer=document.getElementById("envoyer");
    for(let i=0; i<inputs.length; i++){
        if(!inputs[i].value){
            erreur="*veuillez renseigner tous les champs";
            break;
        }
        if(i==4 && inputs[i].value!=inputs[i-1].value){
            erreur="*veuillez corriger votre mot de passe";
        }
    }
    if(erreur){
        texte.innerHTML=erreur;
        envoyer.setAttribute("disabled","disabled");
    }
    else{
        texte.innerHTML=erreur;
        envoyer.removeAttribute("disabled");
    }
});

document.forms["inscription"].addEventListener('submit', function(e){
    if(document.hasFocus()==true){
        let erreur=document.getElementById("erreur");
        erreur.innerHTML="*compte existant";
    }
    else{
        let erreur=document.getElementById("erreur");
        erreur.innerHTML="";
    }
});