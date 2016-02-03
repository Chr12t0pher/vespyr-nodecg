var $score = {"blue": [$("#blue-score"), $("#blue-score-text")], "red": [$("#red-score"), $("#red-score-text")]};
var $inGameTexts = {"left": {"top": $("#bottom-center-left-text-upper"), "bottom": $("#bottom-center-left-text-lower")}, "right": $("#bottom-center-right-text")};

var updateScore = function() {
    if(!comingUpReplicant.value) { // If the coming up replicant hasn't loaded yet, return.
        return
    }
    var blueScore = teamReplicant.value[comingUpReplicant.value["next_game"]]["blue"]["info"]["score"] + " - " + teamReplicant.value[comingUpReplicant.value["next_game"]]["blue"]["info"]["tag"];
    var redScore = teamReplicant.value[comingUpReplicant.value["next_game"]]["red"]["info"]["tag"] + " - " + teamReplicant.value[comingUpReplicant.value["next_game"]]["red"]["info"]["score"];
    var updateScore = function(team, newScore) {
        var scoreTimeline = new TimelineLite();
        scoreTimeline
            .to($score[team][0], 0.5, {
                top: "-110%"
            })
            .call(function() {
                $score[team][1].text(newScore)
            })
            .to($score[team][0], 0.5, {
                top: "0%"
            });
    };
    if ($score["blue"][1].text() != blueScore) {
        updateScore("blue", blueScore)
    }
    if ($score["red"][1].text() != redScore) {
        updateScore("red", redScore)
    }
};

var teamReplicant = nodecg.Replicant("team-data")
    .on("change", function(oldVal, newVal) { // On change...
        updateScore()
    });

var comingUpReplicant = nodecg.Replicant("coming-up")
    .on("change", function(oldVal, newVal) { // On change...
        updateScore()
    });

var inGameReplicant = nodecg.Replicant("in-game")
    .on("change", function(oldVal, newVal) {
        $inGameTexts["left"]["top"].text(newVal["left"]["top"]);
        $inGameTexts["left"]["bottom"].text(newVal["left"]["bottom"]);
        $inGameTexts["right"].text(newVal["right"]);
    });

var $scoreBoard = $("#score");
var $bottomLeft = $("#bottom-left");
var $bottomCenter = $("#bottom-center");

nodecg.listenFor("lolEvent", function(key) {
    if (key == "A") { // If teamfight.
        ($scoreBoard.is(":visible")) ? $scoreBoard.hide() : $scoreBoard.show(); // Toggle score.
        ($bottomLeft.is(":visible")) ? $bottomLeft.hide() : $bottomLeft.show(); // Toggle info box.
        ($bottomCenter.is(":visible")) ? $bottomCenter.hide() : $bottomCenter.show(); // Toggle text bar.
    }
});
