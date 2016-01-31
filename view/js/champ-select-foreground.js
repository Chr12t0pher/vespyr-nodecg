var $champInfoImage = $("#champ-info-img");
var $teamInfo = {
    "blue": {"name": $("#blue-team-name"), "score": $("#blue-team-score"), "form": $("#blue-team-form")},
    "red": {"name": $("#red-team-name"), "score": $("#red-team-score"), "form": $("#red-team-form")}
};
var $teamRoster = {
    "blue": {"top": $("#blue-team-top"), "jungle": $("#blue-team-jungle"), "mid": $("#blue-team-mid"), "adc": $("#blue-team-adc"), "support": $("#blue-team-support")},
    "red": {"top": $("#red-team-top"), "jungle": $("#red-team-jungle"), "mid": $("#red-team-mid"), "adc": $("#red-team-adc"), "support": $("#red-team-support")}
};
var $teamBans = {
    "blue": {"ban1": $("#blue-team-ban1"), "ban2": $("#blue-team-ban2"), "ban3": $("#blue-team-ban3")},
    "red": {"ban1": $("#red-team-ban1"), "ban2": $("#red-team-ban2"), "ban3": $("#red-team-ban3")}
};

/** REPLICANTS **/
var updateTeam = function() {
    if(!comingUpReplicant.value) { // If the coming up replicant hasn't loaded yet, return.
        return
    }
    $.each(teamReplicant.value[comingUpReplicant.value["next_game"]], function(team, value) { // For each team...
        $.each(value["info"], function(key, value) { // For each of the team info...
            if (["tag", "position"].indexOf(key) !== -1) { // If value isn't used in this scene...
                return
            }
            if (value != $teamInfo[team][key].text()) { // If value has changed...
                var changeTeamInfo = new TimelineLite(); // Animate the changing of the value.
                changeTeamInfo
                    .to($teamInfo[team][key], 0.5, { // Fade out.
                        opacity: 0.0
                    })
                    .call(function() { // Update text.
                        $teamInfo[team][key].text(value);
                    })
                    .to($teamInfo[team][key], 0.5, { // Fade in.
                        opacity: 1.0
                    });
            }
        });
        $.each(value["roster"], function(position, value) { // For each player name...
            if (value != $teamRoster[team][position].text()) { // If value has changed...
                var changeTeamRoster = new TimelineLite(); // Animate the changing of the value.
                changeTeamRoster
                    .to($teamRoster[team][position], 0.5, { // Fade in.
                        opacity: 0.0
                    })
                    .call(function() { // Update text.
                        $teamRoster[team][position].text(value);
                    })
                    .to($teamRoster[team][position], 0.5, { // Fade in.
                        opacity: 1.0
                    });
            }
        });
    });
};
var teamReplicant = nodecg.Replicant("scene-teams")
    .on("change", function(oldVal, newVal) { // On change...
        updateTeam()
    });
var comingUpReplicant = nodecg.Replicant("coming-up")
    .on("change", function(oldVal, newVal) { // On change...
        updateTeam()
    });



var champsReplicant = nodecg.Replicant("champ-select")
    .on("change", function(oldVal, newVal) { // If the champs variable changes...
        $.each(newVal, function(team, value) {
            $.each(value["bans"], function(key, value) {
                if (value["name"] != $teamBans[team][key].text()) {
                    var changeBan = new TimelineLite();
                    changeBan
                        .to($teamBans[team][key], 0.5, { // Fade out.
                            opacity: 0.0
                        })
                        .call(function() { // Update text.
                            $teamBans[team][key].text(value["name"]);
                        })
                        .to($teamBans[team][key], 0.5, { // Fade in.
                            opacity: 1.0
                        });
                }
            });
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
                $champInfoImg.css("background-image", "url(images/info/" + value["file"] + ".jpg)");
            })
            .to($champInfoImg, 0.5, {
                opacity: 1.0
            });
        setTimeout(function() { next(); }, 15000);
    });
});
