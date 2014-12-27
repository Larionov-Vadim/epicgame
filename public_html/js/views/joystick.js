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
            "touchmove div#block": "touchmove",
            "touchcancel div#block": "touchcancel"
        },

        initialize: function () {
            $('body').append(this.el);
            this.el.addEventListener('orientationchange', this.orientationchange, false);
            this.render();
            this.hide();
        },

        render: function () {
            this.$el.html(this.template);
            this.initorientation();
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
            event.preventDefault();
            block.className = 'touchstart';
            block.innerHTML = 'touchstart';
        },

        touchmove: function(event) {
            if (event.originalEvent.touches.length > 1)
                return;
            event.preventDefault();
            var x = event.originalEvent.touches[0].pageX;
            var y = event.originalEvent.touches[0].pageY;
            var clientWidth = block.clientWidth;
            var clientHeight = block.clientHeight;

            if ( ((x+clientWidth/2 <= $(document).width())) && (x-clientWidth/2 >= 0)) {
                $("#block").css({
                    "left": x-clientWidth/2 + "px",
                });
            }

            if ( (y+clientHeight/2 <= $(document).height()) && (y-clientHeight/2>= 0) ) {
                $("#block").css({
                    "top": y-clientHeight/2+"px",
                });
            }

            block.innerHTML = "touchmove";
        },

        touchend: function(event) {
            event.preventDefault();
            block.className = " ";
            block.innerHTML = "touchend";
        },

        touchcancel: function(event) {
            event.preventDefault();
            block.className = " ";
            block.innerHTML = "cancel";
        },

        orientationchange: function(event) {
            event.preventDefault();
            
            if (window.orientation%180===0) {
                document.getElementById("orientation").innerHTML = "This device is in Portrait mode";
            } else {
                document.getElementById("orientation").innerHTML = "This device is in Landscape mode";
            }
        },

        initorientation: function(event) {
            if (window.orientation%180===0) {
                document.getElementById("orientation").innerHTML = "This device is in Portrait mode";
            } else {
                document.getElementById("orientation").innerHTML = "This device is in Landscape mode";
            }
        }

    });

    return new View();
});