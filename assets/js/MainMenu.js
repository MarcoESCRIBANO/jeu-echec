var larg = (window.innerWidth);
var haut = (window.innerHeight);

class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key:'MainMenu'});
    }


    preload(){
        this.load.image('fond','../img/fond.jpeg');
        this.load.css('style','../css/styleMM.css');
        //this.load.audio('Gangsta', ["../audio/Gangsta's paradise.mp3"]);

    }

    create() {
        if(gameState.firstTime){
            //this.music();
        }
        this.background();
        this.menu();
    }

    music(){
        //this.sound.add('Gangsta');
        //this.sound.play('Gangsta',{loop:true, seek: 22.5});
        //let test = this.sound.add('Gangsta');
        //test.addMarker({name:'test',start:3,duration:19,config:{loop:true}});
        //test.play({loop:true, seek: 22.5})
        
            
        gameState.firstTime=false;
        let test = this.sound.add('Gangsta');
        test.play({loop:true, seek: 4})
        gameState.music=test;
       
    }
    
    background(){
        let image=this.add.image(larg / 2, haut/2,'fond');
        let scaleX = larg / image.width;
        let scaleY = haut / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
    }
    menu(){
        let h1=this.add.dom(larg/2,0,'h1',null,'Shadow Kings Chess');
        let newPartie=this.add.dom(larg/2,3*haut/4,'NewPartie',null,'Nouvelle Partie');
        let scores=this.add.dom(larg/2,3*haut/4,'Scores',null,'Scores');
        let info = this.add.dom(larg/2,3*haut/4, 'info',null,'Documentation');
        let quitter=this.add.dom(larg/2,3*haut/4,'quitter',null,'Quitter');
        h1.setClassName('title1');
        newPartie.setClassName('button BNewPartie');
        scores.setClassName('button BScores');
        info.setClassName('button BInfo');
        quitter.setClassName('button BQuitter');
        newPartie.addListener('click');
        newPartie.on('click', function (event) {
            game.scene.stop('MainMenu');
			game.scene.start('choixperso');
        });

        scores.addListener('click');
        scores.on('click', function (event) {
            game.scene.stop('MainMenu');
			game.scene.start('Accueil');
        });

        info.addListener('click');
        info.on('click', function (event) {
            game.scene.stop('MainMenu');
			game.scene.start('OptionMenu');
        });

        quitter.addListener('click');
        quitter.on('click', function (event) {
            gameState.music.stop();
            game.scene.stop('MainMenu');
            alert('Vous allez quitter le jeu');
            window.close();
        });
    }
}




