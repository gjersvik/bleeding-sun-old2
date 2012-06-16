GameTimerTest = TestCase("GameTimerTest");

GameTimerTest.prototype = {
    setUp: function () {
        this.clock = sinon.useFakeTimers();
    },
    tearDown: function () {
        this.clock.restore();
    },
    'test call tick ounce at start': function () {
        var game_timer = gj.gameTimer($.noop),
            call_num = 0;

        game_timer.addTick(function(){
            call_num += 1;
        });

        game_timer.start();
        game_timer.stop();

        assertSame(1,call_num);
    },
    'test call tick tow times after 17 ms': function () {
        var game_timer = gj.gameTimer($.noop),
            call_num = 0;

        game_timer.addTick(function(){
            call_num += 1;
        });

        game_timer.start();

        this.clock.tick(17);

        game_timer.stop();

        assertSame(2,call_num);

    },
    'test call tick tow times after 17 ms': function () {
        var game_timer = gj.gameTimer($.noop),
            call_num = 0;

        game_timer.addTick(function(){
            call_num += 1;
        });

        game_timer.start();

        this.clock.tick(17);

        game_timer.stop();

        assertSame(2,call_num);

    },
    'test do not call tick after stop': function () {
        var game_timer = gj.gameTimer($.noop),
            call_num = 0;

        game_timer.start();

        game_timer.addTick(function(){
            call_num += 1;
        });

        game_timer.stop();

        this.clock.tick(17);

        assertSame(0,call_num);
    },
    'test isRunning returns false after creation': function () {
        var game_timer = gj.gameTimer($.noop);
        assertFalse(game_timer.isRunning());
    },
    'test isRunning returns true after start': function () {
        var game_timer = gj.gameTimer($.noop);
        game_timer.start();
        assertTrue(game_timer.isRunning($.noop));
    },
    'test isRunning returns true after start': function () {
        var game_timer = gj.gameTimer($.noop);
        game_timer.start();
        assertTrue(game_timer.isRunning());
    },
    'test isRunning returns false after start and stop': function () {
        var game_timer = gj.gameTimer($.noop);
        game_timer.start();
        game_timer.stop();
        assertFalse(game_timer.isRunning());
    }
};