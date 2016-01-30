/** OBS REPLICANT **/
var obsScene = nodecg.Replicant("obs-scene")
    .on("change", function(oldVal, newVal) { // On change...
        $("a[href='#scenes-" + newVal["scene"] + "']").tab("show"); // Change the tab.
    });

$("#scenes-tabs").find("a").click(function(e) {
    e.preventDefault();
    $(this).tab();
});

$("#scenes-coming-up-tabs").find("a").click(function(e) {
    e.preventDefault();
    $(this).tab()
});


/**
 #############
 # COMING-UP #
 #############
**/

/** VARIABLES **/
var $comingUpInfo = {
    "game1": {
        "left": {
            "name": $("#scenes-coming-up-game1-left-name"),
            "tag": $("#scenes-coming-up-game1-left-tag"),
            "score": $("#scenes-coming-up-game1-left-score"),
            "position": $("#scenes-coming-up-game1-left-position"),
            "form": $("#scenes-coming-up-game1-left-form"),
            "roster": {
                "top": $("#scenes-coming-up-game1-left-top"),
                "jungle": $("#scenes-coming-up-game1-left-jungle"),
                "mid": $("#scenes-coming-up-game1-left-mid"),
                "adc": $("#scenes-coming-up-game1-left-adc"),
                "support": $("#scenes-coming-up-game1-left-support")
            }
        },
        "right": {
            "name": $("#scenes-coming-up-game1-right-name"),
            "tag": $("#scenes-coming-up-game1-right-tag"),
            "score": $("#scenes-coming-up-game1-right-score"),
            "position": $("#scenes-coming-up-game1-right-position"),
            "form": $("#scenes-coming-up-game1-right-form"),
            "roster": {
                "top": $("#scenes-coming-up-game1-right-top"),
                "jungle": $("#scenes-coming-up-game1-right-jungle"),
                "mid": $("#scenes-coming-up-game1-right-mid"),
                "adc": $("#scenes-coming-up-game1-right-adc"),
                "support": $("#scenes-coming-up-game1-right-support")
            }
        }
    },
    "game2": {
        "left": {
            "name": $("#scenes-coming-up-game2-left-name"),
            "tag": $("#scenes-coming-up-game2-left-tag"),
            "score": $("#scenes-coming-up-game2-left-score"),
            "position": $("#scenes-coming-up-game2-left-position"),
            "form": $("#scenes-coming-up-game2-left-form"),
            "roster": {
                "top": $("#scenes-coming-up-game2-left-top"),
                "jungle": $("#scenes-coming-up-game2-left-jungle"),
                "mid": $("#scenes-coming-up-game2-left-mid"),
                "adc": $("#scenes-coming-up-game2-left-adc"),
                "support": $("#scenes-coming-up-game2-left-support")
            }
        },
        "right": {
            "name": $("#scenes-coming-up-game2-right-name"),
            "tag": $("#scenes-coming-up-game2-right-tag"),
            "score": $("#scenes-coming-up-game2-right-score"),
            "position": $("#scenes-coming-up-game2-right-position"),
            "form": $("#scenes-coming-up-game2-right-form"),
            "roster": {
                "top": $("#scenes-coming-up-game2-right-top"),
                "jungle": $("#scenes-coming-up-game2-right-jungle"),
                "mid": $("#scenes-coming-up-game2-right-mid"),
                "adc": $("#scenes-coming-up-game2-right-adc"),
                "support": $("#scenes-coming-up-game2-right-support")
            }
        }
    },
    "game3": {
        "left": {
            "name": $("#scenes-coming-up-game3-left-name"),
            "tag": $("#scenes-coming-up-game3-left-tag"),
            "score": $("#scenes-coming-up-game3-left-score"),
            "position": $("#scenes-coming-up-game3-left-position"),
            "form": $("#scenes-coming-up-game3-left-form"),
            "roster": {
                "top": $("#scenes-coming-up-game3-left-top"),
                "jungle": $("#scenes-coming-up-game3-left-jungle"),
                "mid": $("#scenes-coming-up-game3-left-mid"),
                "adc": $("#scenes-coming-up-game3-left-adc"),
                "support": $("#scenes-coming-up-game3-left-support")
            }
        },
        "right": {
            "name": $("#scenes-coming-up-game3-right-name"),
            "tag": $("#scenes-coming-up-game3-right-tag"),
            "score": $("#scenes-coming-up-game3-right-score"),
            "position": $("#scenes-coming-up-game3-right-position"),
            "form": $("#scenes-coming-up-game3-right-form"),
            "roster": {
                "top": $("#scenes-coming-up-game3-right-top"),
                "jungle": $("#scenes-coming-up-game3-right-jungle"),
                "mid": $("#scenes-coming-up-game3-right-mid"),
                "adc": $("#scenes-coming-up-game3-right-adc"),
                "support": $("#scenes-coming-up-game3-right-support")
            }
        }
    }
};
var $comingUpUpdateBtn = $("#scenes-coming-up-update");

/** REPLICANTS **/
var comingUpReplicant = nodecg.Replicant("coming-up")
    .on("change", function(oldVal, newVal) {
        $("#scenes-coming-up-next-game").val(newVal["next_game"]);
        $("#scenes-coming-up-timer").val(newVal["timer"]);
    });

var sceneTeamReplicant = nodecg.Replicant("scene-teams")
    .on("change", function(oldVal, newVal) {
        $.each(newVal, function(game, value) {
            $.each(value, function(team, value) {
                $comingUpInfo[game][team]["name"].val(value["name"]);
                $comingUpInfo[game][team]["tag"].val(value["tag"]);
                $comingUpInfo[game][team]["score"].val(value["score"]);
                $comingUpInfo[game][team]["position"].val(value["position"]);
                $comingUpInfo[game][team]["form"].val(value["form"]);
                $.each(value["roster"], function(position, value) { // For each player in the roster...
                    $comingUpInfo[game][team]["roster"][position].val(value);
                });
            });
        });
    });

/** TYPEAHEAD **/
$(document).ready(function() {
    $.ajaxSetup({
        async: false
    });
    var qualifierTop;
    $.getJSON("http://app.vespyrleague.com/api/tournaments/19", function(response) {
        qualifierTop = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("team_name"),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: response
        });
    });
    var qualifierBottom;
    $.getJSON("http://app.vespyrleague.com/api/tournaments/20", function(response) {
        qualifierBottom = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("team_name"),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: response
        });
    });
    $.ajaxSetup({
        async: true
    });
    $.each($comingUpInfo, function(game, value) { // For each game...
        $.each(value, function(team, value) { // For each team...
            value["name"].typeahead({
                highlight: true
            }, {
                name: "qualifier-top",
                display: "team_name",
                source: qualifierTop,
                templates: {
                    header: '<h4 class="list-group-item-heading league">Higher Qualifiers</h4>'
                }
            }, {
                name: "qualifier-bottom",
                display: "team_name",
                source: qualifierBottom,
                templates: {
                    header: '<h4 class="list-group-item-heading league">Lower Qualifiers</h4>'
                }
            }).bind("typeahead:select", function (ev, suggestion) {
                $comingUpInfo[game][team]["tag"].val(suggestion["team_tag"]);
                updateNames(game, team, suggestion);
            }).bind("typeahead:autocomplete", function (ev, suggestion) {
                $comingUpInfo[game][team]["tag"].val(suggestion["team_tag"]);
                updateNames(game, team, suggestion);
            });
        });
    });
    var updateNames = function(game, team, suggestion) {
        var teamId = suggestion["team_id"];
        $.getJSON("http://app.vespyrleague.com/api/tournaments/19/teams/" + teamId, function(response) { // Get team roster.
            $.each(response, function(i, value) { // For each player in roster...
                if (value["role"] == "Toplane") { // If the player is the top laner...
                    $comingUpInfo[game][team]["roster"]["top"].val(value["summoner_name"]); // Update the top name.
                } else if (value["role"] == "Jungle") { // Repeat for each lane...
                    $comingUpInfo[game][team]["roster"]["jungle"].val(value["summoner_name"]);
                } else if (value["role"] == "Midlane") {
                    $comingUpInfo[game][team]["roster"]["mid"].val(value["summoner_name"]);
                } else if (value["role"] == "Adc") {
                    $comingUpInfo[game][team]["roster"]["adc"].val(value["summoner_name"]);
                } else if (value["role"] == "Support") {
                    $comingUpInfo[game][team]["roster"]["support"].val(value["summoner_name"]);
                }
            });
        });
    };
});


/** UPDATING **/
var sceneTeamUpdate = function() {
    sceneTeamReplicant.value = {
        "game1": {
            "left": {
                "name": $comingUpInfo["game1"]["left"]["name"].val(),
                "tag": $comingUpInfo["game1"]["left"]["tag"].val(),
                "score": $comingUpInfo["game1"]["left"]["score"].val(),
                "position": $comingUpInfo["game1"]["left"]["position"].val(),
                "form": $comingUpInfo["game1"]["left"]["form"].val(),
                "roster": {
                    "top": $comingUpInfo["game1"]["left"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game1"]["left"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game1"]["left"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game1"]["left"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game1"]["left"]["roster"]["support"].val()
                }
            },
            "right": {
                "name": $comingUpInfo["game1"]["right"]["name"].val(),
                "tag": $comingUpInfo["game1"]["right"]["tag"].val(),
                "score": $comingUpInfo["game1"]["right"]["score"].val(),
                "position": $comingUpInfo["game1"]["right"]["position"].val(),
                "form": $comingUpInfo["game1"]["right"]["form"].val(),
                "roster": {
                    "top": $comingUpInfo["game1"]["right"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game1"]["right"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game1"]["right"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game1"]["right"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game1"]["right"]["roster"]["support"].val()
                }
            }
        },
        "game2": {
            "left": {
                "name": $comingUpInfo["game2"]["left"]["name"].val(),
                "tag": $comingUpInfo["game2"]["left"]["tag"].val(),
                "score": $comingUpInfo["game2"]["left"]["score"].val(),
                "position": $comingUpInfo["game2"]["left"]["position"].val(),
                "form": $comingUpInfo["game2"]["left"]["form"].val(),
                "roster": {
                    "top": $comingUpInfo["game2"]["left"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game2"]["left"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game2"]["left"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game2"]["left"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game2"]["left"]["roster"]["support"].val()
                }
            },
            "right": {
                "name": $comingUpInfo["game2"]["right"]["name"].val(),
                "tag": $comingUpInfo["game2"]["right"]["tag"].val(),
                "score": $comingUpInfo["game2"]["right"]["score"].val(),
                "position": $comingUpInfo["game2"]["right"]["position"].val(),
                "form": $comingUpInfo["game2"]["right"]["form"].val(),
                "roster": {
                    "top": $comingUpInfo["game2"]["right"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game2"]["right"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game2"]["right"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game2"]["right"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game2"]["right"]["roster"]["support"].val()
                }
            }
        },
        "game3": {
            "left": {
                "name": $comingUpInfo["game3"]["left"]["name"].val(),
                "tag": $comingUpInfo["game3"]["left"]["tag"].val(),
                "score": $comingUpInfo["game3"]["left"]["score"].val(),
                "position": $comingUpInfo["game3"]["left"]["position"].val(),
                "form": $comingUpInfo["game3"]["left"]["form"].val(),
                "roster": {
                    "top": $comingUpInfo["game3"]["left"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game3"]["left"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game3"]["left"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game3"]["left"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game3"]["left"]["roster"]["support"].val()
                }
            },
            "right": {
                "name": $comingUpInfo["game3"]["right"]["name"].val(),
                "tag": $comingUpInfo["game3"]["right"]["tag"].val(),
                "score": $comingUpInfo["game3"]["right"]["score"].val(),
                "position": $comingUpInfo["game3"]["right"]["position"].val(),
                "form": $comingUpInfo["game3"]["right"]["form"].val(),
                "roster": {
                    "top": $comingUpInfo["game3"]["right"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game3"]["right"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game3"]["right"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game3"]["right"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game3"]["right"]["roster"]["support"].val()
                }
            }
        }
    };
    comingUpReplicant.value = {
        "next_game": $("#scenes-coming-up-next-game").val(),
        "timer": $("#scenes-coming-up-timer").val()
    };
    $(".scenes-coming-up-on-change").parent().removeClass("has-warning"); // Remove the warning on the input.
};

$(".scenes-coming-up-on-change").bind("change paste keyup", function(e) { // If any of the champion names are changed...
    if(e.keyCode == 13) {
        sceneTeamUpdate(); // Update if enter key.
    } else { // Else somethings changed.
        $comingUpUpdateBtn.prop("disabled", false).addClass("btn-primary"); // Enable the update button.
        $(this).parent().addClass("has-warning"); // Colour the input to show it hasn't been updated.
    }
});

$comingUpUpdateBtn.click(function() {
    sceneTeamUpdate();
});
