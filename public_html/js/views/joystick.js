define([
    'backbone',
    'tmpl/joystick',
    'jquery'
], function(Backbone, tmpl, $){


    var View = Backbone.View.extend({

        template: tmpl,
        className: 'wrap',

        events: {
            "touchstart div#block": "touchstart",
            "touchend div#block": "touchend",
            "touchmove div#block": "touchmove"
        },

        initialize: function () {
            $('body').append(this.el);
            this.render();
            this.hide();
        },

        render: function () {
            this.$el.html(this.template);
            return this;
        },

        show: function () {
            this.$el.show();
            this.trigger("show", this);
        },

        hide: function () {
            this.$el.hide();
        },

        touchstart: function(event) {
            console.log("joystick.js: touchstart");
            event.preventDefault();
            block.className = 'touchstart';
            block.innerHTML = 'touchstart';
        },
        
        touchmove: function(event) {
            event.preventDefault();
            var x = event.originalEvent.touches[0].pageX;
            var y = event.originalEvent.touches[0].pageY;
            var clientWidth = block.clientWidth;
            var clientHeight = block.clientHeight;
            var docWidth = $(document).width();

            if (((x+clientWidth/2 <= docWidth)) && (x-clientWidth/2 >= 0)) {
                $("#block").css({
                    "left": x-block.clientWidth/2 + "px",
                });
            }

            if ((y+clientHeight/2 <= docWidth) && (y-clientHeight/2>= 0)) {
                $("#block").css({
                    "top": y-block.clientHeight/2+"px",
                });
            }

            block.innerHTML = 'touchmove';
        },

        touchend: function(event) {
            event.preventDefault();
            block.className = ' ';
            block.innerHTML = 'touchend';
            block.style = 'left: 500px; top: 200px;';
        }
        
    });

    return new View();
});