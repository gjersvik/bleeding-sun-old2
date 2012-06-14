(function ($, g) {
    'use strict';
    g.gameTimer = function (timeout,animeTimeout) {
        var that = {},
            call_tick = $.Callbacks(''),
            call_render = $.Callbacks(''),
            running = false,
            time = 0,
            tick_frames = 0,
            render_frames = 0;

        function tick() {
            if (!running) {
                return;
            }
            call_tick.fire(tick_frames);
            tick_frames += 1;
            time += 17;
            timeout(tick, time - Date.now());
        }

        function render() {
            if (!running) {
                return;
            }
            call_render.fire();
            render_frames += 1;
            animeTimeout(render);
        }


        that.start = function () {
            if (running) {
                return;
            }
            running = true;
            time = Date.now();
            tick();
            animeTimeout(render);
        };

        that.stop = function () {
            running = false;
        };

        that.isRunning = function() {
            return running;
        }

        that.addTick = call_tick.add;
        that.removeTick = call_tick.remove;
        that.addRender = call_render.add;
        that.removeRender = call_render.remove;

        return that;
    };

    g.gameTimerFactory = function () {
        return g.gameTimer(window.setTimeout, window.requestAnimationFrame);
    };
}(jQuery,gj));


        function fps() {
            fpstick = tickframes;
            tickframes = 0;
            fpsrender = renderframes;
            renderframes = 0;
            that.fire('fps');
        }

        Y.AnimLoop.on('beforedraw', render);
        setInterval(fps, 1000);

        that.isRunning = function () {
            return timeout !== null;
        };
        that.getTickFps = function () {
            return fpstick;
        };
        that.getRenderFps = function () {
            return fpsrender;
        };
    };
}, '0.1', {
    requires: ['event', 'gallery-animloop']
});