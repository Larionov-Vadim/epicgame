define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
	'views/scoreboard',
	'views/manager',
    'views/joystick'
], function(Backbone, mainScreen, gameScreen, loginScreen, scoreboardScreen, viewManager, joystickScreen) {

    var Router = Backbone.Router.extend({
	
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'joystick': 'joystickAction',
            '*default': 'defaultActions'
        },
		
		initialize: function() {
			viewManager.addView(gameScreen);
			viewManager.addView(scoreboardScreen);
			viewManager.addView(mainScreen);
			viewManager.addView(loginScreen);
            viewManager.addView(joystickScreen);
		},
		
        defaultActions: function() {
            mainScreen.show();
        },
		
        scoreboardAction: function() {
            scoreboardScreen.show();
        },
		
        gameAction: function() {
            gameScreen.show();
        },
		
        loginAction: function() {
            loginScreen.show();
        },

        joystickAction: function() {
            joystickScreen.show();
        }	
		
    });
	
    return new Router();
});