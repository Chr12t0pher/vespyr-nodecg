var $comingUpInfo = {
    "game1": {
        "left": {
            "name": $("#game1-left-name"),
            "tag": $("#game1-left-tag"),
            "score": $("#game1-left-score"),
            "position": $("#game1-left-position"),
            "form": $("#game1-left-form"),
            "roster": {
                "top": $("#game1-left-top"),
                "jungle": $("#game1-left-jungle"),
                "mid": $("#game1-left-mid"),
                "adc": $("#game1-left-adc"),
                "support": $("#game1-left-support")
            }
        },
        "right": {
            "name": $("#game1-right-name"),
            "tag": $("#game1-right-tag"),
            "score": $("#game1-right-score"),
            "position": $("#game1-right-position"),
            "form": $("#game1-right-form"),
            "roster": {
                "top": $("#game1-right-top"),
                "jungle": $("#game1-right-jungle"),
                "mid": $("#game1-right-mid"),
                "adc": $("#game1-right-adc"),
                "support": $("#game1-right-support")
            }
        }
    },
    "game2": {
        "left": {
            "name": $("#game2-left-name"),
            "tag": $("#game2-left-tag"),
            "score": $("#game2-left-score"),
            "position": $("#game2-left-position"),
            "form": $("#game2-left-form"),
            "roster": {
                "top": $("#game2-left-top"),
                "jungle": $("#game2-left-jungle"),
                "mid": $("#game2-left-mid"),
                "adc": $("#game2-left-adc"),
                "support": $("#game2-left-support")
            }
        },
        "right": {
            "name": $("#game2-right-name"),
            "tag": $("#game2-right-tag"),
            "score": $("#game2-right-score"),
            "position": $("#game2-right-position"),
            "form": $("#game2-right-form"),
            "roster": {
                "top": $("#game2-right-top"),
                "jungle": $("#game2-right-jungle"),
                "mid": $("#game2-right-mid"),
                "adc": $("#game2-right-adc"),
                "support": $("#game2-right-support")
            }
        }
    },
    "game3": {
        "left": {
            "name": $("#game3-left-name"),
            "tag": $("#game3-left-tag"),
            "score": $("#game3-left-score"),
            "position": $("#game3-left-position"),
            "form": $("#game3-left-form"),
            "roster": {
                "top": $("#game3-left-top"),
                "jungle": $("#game3-left-jungle"),
                "mid": $("#game3-left-mid"),
                "adc": $("#game3-left-adc"),
                "support": $("#game3-left-support")
            }
        },
        "right": {
            "name": $("#game3-right-name"),
            "tag": $("#game3-right-tag"),
            "score": $("#game3-right-score"),
            "position": $("#game3-right-position"),
            "form": $("#game3-right-form"),
            "roster": {
                "top": $("#game3-right-top"),
                "jungle": $("#game3-right-jungle"),
                "mid": $("#game3-right-mid"),
                "adc": $("#game3-right-adc"),
                "support": $("#game3-right-support")
            }
        }
    }
};

var $comingUpPanels = {
    "game1": $("#game-1-info"),
    "game2": $("#game-2-info"),
    "game3": $("#game-3-info")
};

var comingUpReplicant = nodecg.Replicant("coming-up")
    .on("change", function(oldVal, newVal) { // On change...
        if (!$comingUpPanels[newVal["next_game"]].is(":visible")) { // If the next game has changed...
            $(".info:visible").slideUp(); // Slide the currently visible game up.
            $comingUpPanels[newVal["next_game"]].slideDown(); // Slide the new game down.
        }
        $("#timer").countdown(newVal["timer"], function(e) {
            $(this).text(e.strftime("%H:%M:%S"))
        });
    });

var teamsReplicant = nodecg.Replicant("scene-teams")
    .on("change", function(oldVal, newVal) { // On change...
        $.each(newVal, function(game, value) { // For each game...
            $.each(value, function(team, value) { // For each team...
                $comingUpInfo[game][team]["name"].text(value["name"]);
                $comingUpInfo[game][team]["tag"].text(value["tag"]);
                $comingUpInfo[game][team]["score"].text(value["score"]);
                $comingUpInfo[game][team]["position"].text(value["position"]);
                $comingUpInfo[game][team]["form"].text(value["form"]);
                $.each(value["roster"], function(position, value) { // For each player in the roster...
                    $comingUpInfo[game][team]["roster"][position].text(value);
                })

            })
        })
    });
