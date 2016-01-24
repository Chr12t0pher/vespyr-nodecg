var $score = {"blue": [$("#blue-score"), $("#blue-score-text")], "red": [$("#red-score"), $("#red-score-text")]};


var teamReplicant = nodecg.Replicant("teams")
    .on("change", function(oldVal, newVal) { // On change...
        var blueScore = newVal["blue"]["team"]["score"] + " - " + newVal["blue"]["team"]["tag"];
        var redScore = newVal["red"]["team"]["tag"] + " - " + newVal["red"]["team"]["score"];
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
    });
