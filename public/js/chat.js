let socket=io();

function scrollVersLeBas(){
    let messages= document.querySelector('#messages').lastElementChild; // prend sle dernier message
    messages.scrollIntoView(); //methode de javascript pour derouler la page
}


socket.on('connect', ()=>{

    console.log("Connecter au serveur");
    let searchQuery = window.location.search.substring(1); // permet de recuperer les paramatre entre puisque ce sont des variable de fenetre
    let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}'); // transforme et formate grace a une expression regex les donnes recupere

    socket.emit('join', params, function(err) {  // envoie au les donnes recuperer
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else {
            console.log('No Error');
        }
    })
    

});

socket.on('updateUsersList',(users)=>{
    console.log(users);
})


socket.on('newMessage',(message)=>{
    console.log("Nouveau message", message);
    let li =document.createElement('li');
    li.innerText=`${message.from} : ${message.text}`
    document.getElementById('messages').appendChild(li);
    scrollVersLeBas();
});


document.querySelector('#submit-btn').addEventListener('click',(event)=>{  // permet que lorsqu'on clique sur envoyer la page ne se raffraichit pas
    event.preventDefault();
    socket.emit("createMessage",{
        from:"User",
        text:document.querySelector('input[name=message]').value
        

    });
    document.querySelector('input[name=message]').value="";
});