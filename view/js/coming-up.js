var $comingUpInfo = {
    "game1": {
        "blue": {
            "info": {
                "name": $("#game1-blue-name"),
                "tag": $("#game1-blue-tag"),
                "score": $("#game1-blue-score"),
                "position": $("#game1-blue-position"),
                "form": $("#game1-blue-form")
            },
            "roster": {
                "top": $("#game1-blue-top"),
                "jungle": $("#game1-blue-jungle"),
                "mid": $("#game1-blue-mid"),
                "adc": $("#game1-blue-adc"),
                "support": $("#game1-blue-support")
            }
        },
        "red": {
            "info": {
                "name": $("#game1-red-name"),
                "tag": $("#game1-red-tag"),
                "score": $("#game1-red-score"),
                "position": $("#game1-red-position"),
                "form": $("#game1-red-form")
            },
            "roster": {
                "top": $("#game1-red-top"),
                "jungle": $("#game1-red-jungle"),
                "mid": $("#game1-red-mid"),
                "adc": $("#game1-red-adc"),
                "support": $("#game1-red-support")
            }
        }
    },
    "game2": {
        "blue": {
            "info": {
                "name": $("#game2-blue-name"),
                "tag": $("#game2-blue-tag"),
                "score": $("#game2-blue-score"),
                "position": $("#game2-blue-position"),
                "form": $("#game2-blue-form")
            },
            "roster": {
                "top": $("#game2-blue-top"),
                "jungle": $("#game2-blue-jungle"),
                "mid": $("#game2-blue-mid"),
                "adc": $("#game2-blue-adc"),
                "support": $("#game2-blue-support")
            }
        },
        "red": {
            "info": {
                "name": $("#game2-red-name"),
                "tag": $("#game2-red-tag"),
                "score": $("#game2-red-score"),
                "position": $("#game2-red-position"),
                "form": $("#game2-red-form")
            },
            "roster": {
                "top": $("#game2-red-top"),
                "jungle": $("#game2-red-jungle"),
                "mid": $("#game2-red-mid"),
                "adc": $("#game2-red-adc"),
                "support": $("#game2-red-support")
            }
        }
    },
    "game3": {
        "blue": {
            "info": {
                "name": $("#game3-blue-name"),
                "tag": $("#game3-blue-tag"),
                "score": $("#game3-blue-score"),
                "position": $("#game3-blue-position"),
                "form": $("#game3-blue-form")
            },
            "roster": {
                "top": $("#game3-blue-top"),
                "jungle": $("#game3-blue-jungle"),
                "mid": $("#game3-blue-mid"),
                "adc": $("#game3-blue-adc"),
                "support": $("#game3-blue-support")
            }
        },
        "red": {
            "info": {
                "name": $("#game3-red-name"),
                "tag": $("#game3-red-tag"),
                "score": $("#game3-red-score"),
                "position": $("#game3-red-position"),
                "form": $("#game3-red-form")
            },
            "roster": {
                "top": $("#game3-red-top"),
                "jungle": $("#game3-red-jungle"),
                "mid": $("#game3-red-mid"),
                "adc": $("#game3-red-adc"),
                "support": $("#game3-red-support")
            }
        }
    }
};

var $comingUpPanels = {
    "game1": $("#game-1-info"),
    "game2": $("#game-2-info"),
    "game3": $("#game-3-info")
};

var $backgroundImg = $("#background-img");
var $foregroundImg = $("#foreground-img");

var comingUpReplicant = nodecg.Replicant("coming-up")
    .on("change", function(oldVal, newVal) { // On change...
        console.log(newVal["colour"]);
        if (newVal["colour"] == "inhouse") { // If we're doing inhouses.
            $foregroundImg.css("background-image",  ('url("images/coming-up/inhouse.jpg")')).css("z-index", "100");
        } else {
            $backgroundImg.css("background-image",  ('url("images/coming-up/' + newVal["colour"] + 'screen.jpg")'));
            $foregroundImg.css("background-image",  ('url("images/coming-up/foreground.png")')).css("z-index", "0");
        }
        if (!$comingUpPanels[newVal["next_game"]].is(":visible")) { // If the next game has changed...
            $(".info:visible").slideUp(); // Slide the currently visible game up.
            $comingUpPanels[newVal["next_game"]].slideDown(); // Slide the new game down.
        }
        var date = new Date();
        function pad (str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        var time = (date.getFullYear() + "/" + pad(date.getMonth() + 1, 2) + "/" + pad(date.getDate(), 2) + " " + newVal["timer"]);
        $("#timer").countdown(time, function(e) {
            $(this).text(e.strftime("%H:%M:%S"))
        });
    });

var teamsReplicant = nodecg.Replicant("team-data")
    .on("change", function(oldVal, newVal) { // On change...
        $.each(newVal, function(game, value) { // For each game...
            $.each(value, function(team, value) { // For each team...
                $.each(value["info"], function(key, value) { // For each team info...
                    $comingUpInfo[game][team]["info"][key].text(value);
                });
                $.each(value["roster"], function(position, value) { // For each player in the roster...
                    $comingUpInfo[game][team]["roster"][position].text(value);
                });
            });
        });
    });
