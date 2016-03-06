$(window).on("load", function() {
    nodecg.sendMessage("loaded", "in-game");

    var $score = {"blue": [$("#blue-score"), $("#blue-score-text")], "red": [$("#red-score"), $("#red-score-text")]};
    var $inGameTexts = {
        "left": {
            "top": $("#bottom-center-left-text-upper"),
            "bottom": $("#bottom-center-left-text-lower")
        }, "right": $("#bottom-center-right-text")
    };

    var updateScore = function () {
        if (!comingUpReplicant.value) { // If the coming up replicant hasn't loaded yet, return.
            return
        }
        var blueScore = teamReplicant.value[comingUpReplicant.value["next_game"]]["blue"]["info"]["score"] + " - " + teamReplicant.value[comingUpReplicant.value["next_game"]]["blue"]["info"]["tag"];
        var redScore = teamReplicant.value[comingUpReplicant.value["next_game"]]["red"]["info"]["tag"] + " - " + teamReplicant.value[comingUpReplicant.value["next_game"]]["red"]["info"]["score"];
        var updateScore = function (team, newScore) {
            var scoreTimeline = new TimelineLite();
            scoreTimeline
                .to($score[team][0], 0.5, {
                    top: "-110%"
                })
                .call(function () {
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
        .on("change", function (oldVal, newVal) { // On change...
            updateScore()
        });

    var comingUpReplicant = nodecg.Replicant("coming-up")
        .on("change", function (oldVal, newVal) { // On change...
            updateScore()
        });

    var inGameReplicant = nodecg.Replicant("in-game")
        .on("change", function (oldVal, newVal) {
            $inGameTexts["left"]["top"].text(newVal["left"]["top"]);
            $inGameTexts["left"]["bottom"].text(newVal["left"]["bottom"]);
            $inGameTexts["right"].text(newVal["right"]);
        });

    var $scoreBoard = $("#score");
    var $bottomLeft = $("#bottom-left");
    var $bottomCenter = $("#bottom-center");
	var $bottomRight = $("#bottom-right");
	var toggle = function(element) {
		(element.is(":visible")) ? element.hide() : element.show();
	};
    nodecg.listenFor("lolEvent", function (key) {
		if (key == "H") {
			toggle($scoreBoard); toggle($bottomLeft); toggle($bottomCenter); toggle($bottomRight);
		} else if (key == "A") {
			toggle($scoreBoard); toggle($bottomLeft); toggle($bottomCenter);
		} else if (key == "Tab" || key == "O") {
			toggle($bottomCenter);
		} else if (key == "Reset") {
			$scoreBoard.show(); $bottomLeft.show(); $bottomCenter.show(); $bottomRight.show()
		}
    });

    function cycleImages() {
        var $current = $("#bottom-left-images.active");
        var $next = ($current.next().length > 0) ? $current.next() : $("#bottom-left-images img:first");
        $current.fadeOut(1000, function () {
            $current.removeClass("active"); // Reset z-index and unhide.
            $next.fadeIn(1000, function () {
                $next.addClass("active"); // Show next image
            });
        })
    }

    setInterval(function() { cycleImages() }, 8000);
});

nodecg.listenFor("refresh", function(graphic) {
    if (graphic == "in-game") { location.reload(true); }
});
