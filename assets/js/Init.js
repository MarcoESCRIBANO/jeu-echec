const gameState = {
	firstTime: true,
};

const config = {
	type: Phaser.AUTO,
	width: larg,
	height: haut,
	parent: 'jeu',
    dom: {
        createContainer: true
    },
	scene: [MainMenu,GameScene],

  
};

const game = new Phaser.Game(config);
