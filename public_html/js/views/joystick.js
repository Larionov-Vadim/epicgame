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
            //"orientationchange div#block": "orientationchange"
        },

        initialize: function () {
            $('body').append(this.el);
            //this.el.addEventListener('orientationchange', this.orientationchange, false);
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

            if (((x+clientWidth/2 <= $(document).width())) && (x-clientWidth/2 >= 0)) {
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
        }

        /*orientationchange: function(event) {
            event.preventDefault();
            console.log("yo!");
            /*
            var a = document.getElementById('orientation');
            if (window.orientation%180===0) {
                block.innerHTML = "Portrait";
            } else {
                block.innerHTML = "Landscape";
            }

            alert("yo!");
            console.log("yo!");
        }
        */
    });

    return new View();
});