define([
    'backbone',
    'tmpl/joystick'
], function(Backbone, tmpl){


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
            // var block = document.getElementById('block');
            console.log("x=%d, y=%d", x, y);
             //console.log($(document).width());
             //console.log(block.clientWidth)
             //console.log($(document).width() - block.clientWidth);
             console.log(block.style);
            if (x < $(document).width() && x >= 0)
            block.className = ' ';
            block.style = 'left: 500px; top: 200px;';
            //block.style.background = 'red';
            //if (y < $(document).height() && y >= 0)
            block.style.top = y - 50;
            // block.className = 'touchmove';
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