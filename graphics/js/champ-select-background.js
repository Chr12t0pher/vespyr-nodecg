var preload = new createjs.LoadQueue(false);
preload.loadManifest([ // Preload videos.
    {id: "blue-bg", src: "images/blue.jpg"},
    {id: "blue-fg", src: "images/champ-select/blue.png"},
    {id: "green-bg", src: "images/green.jpg"},
    {id: "green-fg", src: "images/champ-select/green.png"},
    {id: "red-bg", src: "images/red.jpg"},
    {id: "red-fg", src: "images/champ-select/red.png"},
    {id: "black-bg", src: "images/black.jpg"},
    {id: "black-fg", src: "images/champ-select/black.png"}
]);
preload.load();

preload.on("complete", function() { // Don't do anything until we've loaded assets.
    var $champInfoImg = $("#champ-info-img");
    var $teamPicks = {
        "blue": {"top": [$("#blue-team-top"), ""], "jungle": [$("#blue-team-jungle"), ""], "mid": [$("#blue-team-mid"), ""], "adc": [$("#blue-team-adc"), ""], "support": [$("#blue-team-support"), ""]},
        "red": {"top": [$("#red-team-top"), ""], "jungle": [$("#red-team-jungle"), ""], "mid": [$("#red-team-mid"), ""], "adc": [$("#red-team-adc"), ""], "support": [$("#red-team-support"), ""]}
    };
    var $teamBans = {
        "blue": {"ban1": [$("#blue-team-ban1"), ""], "ban2": [$("#blue-team-ban2"), ""], "ban3": [$("#blue-team-ban3"), ""]},
        "red": {"ban1": [$("#red-team-ban1"), ""], "ban2": [$("#red-team-ban2"), ""], "ban3": [$("#red-team-ban3"), ""]}
    };

    var champReplicant = nodecg.Replicant("champ-select")
        .on("change", function(oldVal, newVal) { // On change...
            $.each(newVal, function(team, value) { // For each team...
                $.each(value["picks"], function(pick, value) { // For each pick...
                    if (value["champ"] != $teamPicks[team][pick][1]) { // If value has changed...
                        $teamPicks[team][pick][1] = value["champ"]; // Update the stored champ.
                        var changePickImg = new TimelineLite();  // Animate the changing of the value.
                        if (team == "blue") { // If blue team...
                            changePickImg
                                .to($teamPicks[team][pick][0], 0.5, {left: "-110%", ease: Back.easeInOut.config(0.5)}) // Slide out to the left.
                                .call(function() { // Update image.
                                    $teamPicks[team][pick][0].css("background-image", "url(images/champ-select/pick/" + value["champ"] + ".jpg)");
                                })
                                .to($teamPicks[team][pick][0], 0.5, {left: "0px", ease: Back.easeInOut.config(0.5)});
                        } else if (team == "red") { // If red team...
                            changePickImg
                                .to($teamPicks[team][pick][0], 0.5, {right: "-110%", ease: Back.easeInOut.config(0.5)}) // Slide out to the right.
                                .call(function() { // Update image.
                                    $teamPicks[team][pick][0].css("background-image", "url(images/champ-select/pick/" + value["champ"] + ".jpg)");
                                })
                                .to($teamPicks[team][pick][0], 0.5, {right: "0px", ease: Back.easeInOut.config(0.5)});
                        }
                    }
                    $teamPicks[team][pick][0].css("webkitFilter", "grayscale(" + ((value["locked"]) ? "0" : "100%") + ")"); // Update grayscale to reflect locked status.
                });
                $.each(value["bans"], function(ban, value) { // For each ban...
                    if (value["file"] != $teamBans[team][ban][1]) { // If value has changed...
                        $teamBans[team][ban][1] = value["file"]; // Update the stored ban.
                        var changeBanImg = new TimelineLite(); // Animate the changing of the value.
                        changeBanImg
                            .to($teamBans[team][ban][0], 0.5, {
                                bottom: "-110%",
                                ease: Back.easeInOut.config(0.5)
                            })
                            .call(function() {
                                $teamBans[team][ban][0].css("background-image", "url(images/champ-select/ban/" + value["file"] + ".jpg)");
                            })
                            .to($teamBans[team][ban][0], 0.5, {
                                bottom: "0px",
                                ease: Back.easeInOut.config(0.5)
                            });
                    }
                })
            });
        });

    nodecg.listenFor("champ-picked", function(value) {
        $champInfoImg.queue(function(next) {
            var changeInfoImg = new TimelineLite();
            changeInfoImg
                .to($champInfoImg, 0.5, {
                    opacity: 0.0
                })
                .call(function() {
                    $champInfoImg.css("background-image", "url(images/champ-select/info/" + value["file"] + ".jpg)");
                })
                .to($champInfoImg, 0.5, {
                    opacity: 1.0
                });
            setTimeout(function() { next(); }, 15000);
        });
    });
    nodecg.listenFor("champ-picked-clear", function() {
        $champInfoImg.clearQueue().css("background-image", "none")
    });

    var $middleBG = $("#middle-bg");
    var $middleFG = $("#middle-fg");
    var currentBG = "";
    var comingUpReplicant = nodecg.Replicant("coming-up")
        .on("change", function(oldVal, newVal) {
            if (currentBG != newVal["colour"]) {
                var colour = (newVal["colour"] == "inhouse") ? "black" : newVal["colour"];
                $middleBG.css("background-image", "url(" + preload.getResult(colour + "-bg").src + ")");
                $middleFG.css("background-image",  "url(" + preload.getResult(colour + "-fg").src + ")");
                currentBG = newVal["colour"];
            }
        });
});
