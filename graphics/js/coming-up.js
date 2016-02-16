/** PRELOAD.JS **/
var preload = new createjs.LoadQueue(false);
preload.loadManifest([ // Preload videos.
    //{id: "blue-vid", src: "videos/blue.mp4"},
    {id: "blue-poster", src: "videos/blue.png"},
    //{id: "red-vid", src: "videos/red.mp4"},
    {id: "red-poster", src: "videos/red.png"},
    //{id: "green-vid", src: "videos/green.mp4"},
    {id: "green-poster", src: "videos/green.png"},
    //{id: "black-vid", src: "videos/black.mp4"},
    {id: "black-poster", src: "videos/black.png"},
    {id: "inhouse-img", src: "images/coming-up/inhouse.jpg"}
]);
preload.load();

preload.on("complete", function() { // Don't do anything until we've loaded assets.
    nodecg.sendMessage("loaded", "coming-up");
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

    var $backgroundVid = $("#background-vid");
    var $backgroundVidSource = $("#background-vid source");
    var $foregroundImg = $("#foreground-img");
    var currentBG = "";
    var currentTimer = "";

    var comingUpReplicant = nodecg.Replicant("coming-up")
        .on("change", function(oldVal, newVal) { // On change...
            if (currentBG != newVal["colour"]) {
                if (newVal["colour"] == "inhouse") { // If we're doing inhouses.
                    $foregroundImg.css("background-image",  "url(" + preload.getResult("inhouse-img").src + ")").css("z-index", "100");
                } else {
                    $backgroundVid.attr("poster", preload.getResult(newVal["colour"] + "-poster").src);
                    // $backgroundVidSource.attr("src", preload.getResult(newVal["colour"] + "-vid").src); // Actual video.
                    // $backgroundVid.load(); // Load it.
                    $foregroundImg.css("background-image",  ('url("images/coming-up/foreground.png")')).css("z-index", "0");
                }
                currentBG = newVal["colour"];
            }
            if (!$comingUpPanels[newVal["next_game"]].is(":visible")) { // If the next game has changed...
                $(".info:visible").slideUp(); // Slide the currently visible game up.
                $comingUpPanels[newVal["next_game"]].slideDown(); // Slide the new game down.
            }

            if (currentTimer != newVal["timer"]) {
                var time = new Date();
                var timeString = newVal["timer"].split(":");
                time.setHours(timeString[0], timeString[1] - time.getTimezoneOffset() - 60, timeString[2]);
                function pad (str, max) {
                    str = str.toString();
                    return str.length < max ? pad("0" + str, max) : str;
                }
                var countdown = (time.getFullYear() + "/" + pad(time.getMonth() + 1, 2) + "/" + pad(time.getDate(), 2) +
                " " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2));

                $("#timer").countdown(countdown, function(e) {
                    $(this).text(e.strftime("%H:%M:%S"))
                });
                currentTimer = newVal["timer"];
            }
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
});

nodecg.listenFor("refresh", function(graphic) {
    if (graphic == "coming-up") { location.reload(true); }
});
