(function () {
    'use strict';
    gj.gameTimer = function (requestAnimationFrame) {
        var that = {},
            call_tick = $.Callbacks(''),
            call_render = $.Callbacks(''),
            call_fps= $.Callbacks(''),
            running = false,
            time = 0,
            tick_frames = 0,
            render_frames = 0,
            fps_tick = 0,
            fps_render = 0;

        function tick() {
            if (!running) {
                return;
            }
            call_tick.fire();
            tick_frames += 1;
            time += 17;
            setTimeout(tick, time - Date.now());
        }

        function render() {
            if (!running) {
                return;
            }
            call_render.fire();
            render_frames += 1;
            requestAnimationFrame(render);
        }

        function fps() {
            if (!running) {
                return;
            }
            setTimeout(fps, 1000);
            fps_tick = tick_frames;
            tick_frames = 0;
            fps_render = tick_frames;
            render_frames = 0;
            call_fps.fire();
        }

        that.start = function () {
            if (running) {
                return;
            }
            running = true;
            time = Date.now();
            tick();
            fps();
            requestAnimationFrame(render);
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
        that.addFps = call_render.add;
        that.addFps = call_render.remove;

        return that;
    };

    gj.gameTimerFactory = function () {
        return gj.gameTimer(requestAnimationFrame);
    };
}());