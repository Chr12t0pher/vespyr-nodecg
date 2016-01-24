var $game = {"game1": $("#game-1"), "game2": $("#game-2"), "game3": $("#game-3")};
var $gameInfo = {"game1": $("#game-1-info"), "game2": $("#game-2-info"), "game3": $("#game-3-info")};
var timer = "";

var comingUpReplicant = nodecg.Replicant("coming-up")
    .on("change", function(oldVal, newVal) { // On change...
        if (!newVal["next_game"].is(":visible")) { // If the next game has changed...
            $(".info:visible").slideUp(); // Slide the currently visible game up.
            $gameInfo[newVal["next_game"]].slideDown(); // Slide the new game down.
        }
        if (newVal["time"] != timer) { // If the countdown time has changed...
            timer = newVal["time"];
            $("#timer").countdown(timer, function(e) {
                $(this).text(e.strftime("%H:%M:%S"))
            });
        }
    });


var x = ["game1", "game2", "game3"];
var y = 1;
(function loop() {
    setTimeout(function() {
        $(".info:visible").slideUp(); // Slide the currently visible game up.
        $gameInfo[x[y]].slideDown(); // Slide the new game down.
        y += 1;
        if (y == 3) {
            y = 0
        }
        loop()
    }, 3000)
})();

$("#timer").countdown("2016/01/24/ 16:34:00", function(e) {
    $(this).text(e.strftime("%H:%M:%S"))
});

