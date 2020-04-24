document.forms["connect"].addEventListener('submit',function(e){
    let erreur=document.getElementById("erreur");
    if(document.hasFocus()==true){
        erreur.innerHTML="*pseudo ou mot de passe invalid";
    }
    else{
        erreur.innerHTML="";
    }
});