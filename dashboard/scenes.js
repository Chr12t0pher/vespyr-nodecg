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
        "blue": {
            "info": {
                "name": $("#scenes-coming-up-game1-blue-name"),
                "tag": $("#scenes-coming-up-game1-blue-tag"),
                "score": $("#scenes-coming-up-game1-blue-score"),
                "position": $("#scenes-coming-up-game1-blue-position"),
                "form": $("#scenes-coming-up-game1-blue-form")
            },
            "roster": {
                "top": $("#scenes-coming-up-game1-blue-top"),
                "jungle": $("#scenes-coming-up-game1-blue-jungle"),
                "mid": $("#scenes-coming-up-game1-blue-mid"),
                "adc": $("#scenes-coming-up-game1-blue-adc"),
                "support": $("#scenes-coming-up-game1-blue-support")
            }
        },
        "red": {
            "info": {
                "name": $("#scenes-coming-up-game1-red-name"),
                "tag": $("#scenes-coming-up-game1-red-tag"),
                "score": $("#scenes-coming-up-game1-red-score"),
                "position": $("#scenes-coming-up-game1-red-position"),
                "form": $("#scenes-coming-up-game1-red-form")
            },
            "roster": {
                "top": $("#scenes-coming-up-game1-red-top"),
                "jungle": $("#scenes-coming-up-game1-red-jungle"),
                "mid": $("#scenes-coming-up-game1-red-mid"),
                "adc": $("#scenes-coming-up-game1-red-adc"),
                "support": $("#scenes-coming-up-game1-red-support")
            }
        }
    },
    "game2": {
        "blue": {
            "info": {
                "name": $("#scenes-coming-up-game2-blue-name"),
                "tag": $("#scenes-coming-up-game2-blue-tag"),
                "score": $("#scenes-coming-up-game2-blue-score"),
                "position": $("#scenes-coming-up-game2-blue-position"),
                "form": $("#scenes-coming-up-game2-blue-form")
            },
            "roster": {
                "top": $("#scenes-coming-up-game2-blue-top"),
                "jungle": $("#scenes-coming-up-game2-blue-jungle"),
                "mid": $("#scenes-coming-up-game2-blue-mid"),
                "adc": $("#scenes-coming-up-game2-blue-adc"),
                "support": $("#scenes-coming-up-game2-blue-support")
            }
        },
        "red": {
            "info": {
                "name": $("#scenes-coming-up-game2-red-name"),
                "tag": $("#scenes-coming-up-game2-red-tag"),
                "score": $("#scenes-coming-up-game2-red-score"),
                "position": $("#scenes-coming-up-game2-red-position"),
                "form": $("#scenes-coming-up-game2-red-form")
            },
            "roster": {
                "top": $("#scenes-coming-up-game2-red-top"),
                "jungle": $("#scenes-coming-up-game2-red-jungle"),
                "mid": $("#scenes-coming-up-game2-red-mid"),
                "adc": $("#scenes-coming-up-game2-red-adc"),
                "support": $("#scenes-coming-up-game2-red-support")
            }
        }
    },
    "game3": {
        "blue": {
            "info": {
                "name": $("#scenes-coming-up-game3-blue-name"),
                "tag": $("#scenes-coming-up-game3-blue-tag"),
                "score": $("#scenes-coming-up-game3-blue-score"),
                "position": $("#scenes-coming-up-game3-blue-position"),
                "form": $("#scenes-coming-up-game3-blue-form")
            },
            "roster": {
                "top": $("#scenes-coming-up-game3-blue-top"),
                "jungle": $("#scenes-coming-up-game3-blue-jungle"),
                "mid": $("#scenes-coming-up-game3-blue-mid"),
                "adc": $("#scenes-coming-up-game3-blue-adc"),
                "support": $("#scenes-coming-up-game3-blue-support")
            }
        },
        "red": {
            "info": {
                "name": $("#scenes-coming-up-game3-red-name"),
                "tag": $("#scenes-coming-up-game3-red-tag"),
                "score": $("#scenes-coming-up-game3-red-score"),
                "position": $("#scenes-coming-up-game3-red-position"),
                "form": $("#scenes-coming-up-game3-red-form")
            },
            "roster": {
                "top": $("#scenes-coming-up-game3-red-top"),
                "jungle": $("#scenes-coming-up-game3-red-jungle"),
                "mid": $("#scenes-coming-up-game3-red-mid"),
                "adc": $("#scenes-coming-up-game3-red-adc"),
                "support": $("#scenes-coming-up-game3-red-support")
            }
        }
    }
};
var $comingUpUpdateBtn = $("#scenes-coming-up-update");

/** REPLICANTS **/
var comingUpReplicant = nodecg.Replicant("coming-up")
    .on("change", function(oldVal, newVal) {
        $("#scenes-coming-up-bg-colour").val(newVal["colour"]);
        $("#scenes-coming-up-next-game").val(newVal["next_game"]);
        $("#scenes-coming-up-timer").val(newVal["timer"]);
    });

var sceneTeamReplicant = nodecg.Replicant("team-data")
    .on("change", function(oldVal, newVal) { // On change...
        $.each(newVal, function(game, value) { // For each game...
            $.each(value, function(team, value) { // For each team...
                $.each(value["info"], function(key, value) { // For each of the team info...
                    $comingUpInfo[game][team]["info"][key].val(value);
                });
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
            value["info"]["name"].typeahead({
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
                $comingUpInfo[game][team]["info"]["tag"].val(suggestion["team_tag"]);
                updateNames(game, team, suggestion);
            }).bind("typeahead:autocomplete", function (ev, suggestion) {
                $comingUpInfo[game][team]["info"]["tag"].val(suggestion["team_tag"]);
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
            "blue": {
                "info": {
                    "name": $comingUpInfo["game1"]["blue"]["info"]["name"].val(),
                    "tag": $comingUpInfo["game1"]["blue"]["info"]["tag"].val(),
                    "score": $comingUpInfo["game1"]["blue"]["info"]["score"].val(),
                    "position": $comingUpInfo["game1"]["blue"]["info"]["position"].val(),
                    "form": $comingUpInfo["game1"]["blue"]["info"]["form"].val()
                },
                "roster": {
                    "top": $comingUpInfo["game1"]["blue"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game1"]["blue"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game1"]["blue"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game1"]["blue"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game1"]["blue"]["roster"]["support"].val()
                }
            },
            "red": {
                "info": {
                    "name": $comingUpInfo["game1"]["red"]["info"]["name"].val(),
                    "tag": $comingUpInfo["game1"]["red"]["info"]["tag"].val(),
                    "score": $comingUpInfo["game1"]["red"]["info"]["score"].val(),
                    "position": $comingUpInfo["game1"]["red"]["info"]["position"].val(),
                    "form": $comingUpInfo["game1"]["red"]["info"]["form"].val()
                },
                "roster": {
                    "top": $comingUpInfo["game1"]["red"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game1"]["red"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game1"]["red"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game1"]["red"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game1"]["red"]["roster"]["support"].val()
                }
            }
        },
        "game2": {
            "blue": {
                "info": {
                    "name": $comingUpInfo["game2"]["blue"]["info"]["name"].val(),
                    "tag": $comingUpInfo["game2"]["blue"]["info"]["tag"].val(),
                    "score": $comingUpInfo["game2"]["blue"]["info"]["score"].val(),
                    "position": $comingUpInfo["game2"]["blue"]["info"]["position"].val(),
                    "form": $comingUpInfo["game2"]["blue"]["info"]["form"].val()
                },
                "roster": {
                    "top": $comingUpInfo["game2"]["blue"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game2"]["blue"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game2"]["blue"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game2"]["blue"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game2"]["blue"]["roster"]["support"].val()
                }
            },
            "red": {
                "info": {
                    "name": $comingUpInfo["game2"]["red"]["info"]["name"].val(),
                    "tag": $comingUpInfo["game2"]["red"]["info"]["tag"].val(),
                    "score": $comingUpInfo["game2"]["red"]["info"]["score"].val(),
                    "position": $comingUpInfo["game2"]["red"]["info"]["position"].val(),
                    "form": $comingUpInfo["game2"]["red"]["info"]["form"].val()
                },
                "roster": {
                    "top": $comingUpInfo["game2"]["red"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game2"]["red"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game2"]["red"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game2"]["red"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game2"]["red"]["roster"]["support"].val()
                }
            }
        },
        "game3": {
            "blue": {
                "info": {
                    "name": $comingUpInfo["game3"]["blue"]["info"]["name"].val(),
                    "tag": $comingUpInfo["game3"]["blue"]["info"]["tag"].val(),
                    "score": $comingUpInfo["game3"]["blue"]["info"]["score"].val(),
                    "position": $comingUpInfo["game3"]["blue"]["info"]["position"].val(),
                    "form": $comingUpInfo["game3"]["blue"]["info"]["form"].val()
                },
                "roster": {
                    "top": $comingUpInfo["game3"]["blue"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game3"]["blue"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game3"]["blue"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game3"]["blue"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game3"]["blue"]["roster"]["support"].val()
                }
            },
            "red": {
                "info": {
                    "name": $comingUpInfo["game3"]["red"]["info"]["name"].val(),
                    "tag": $comingUpInfo["game3"]["red"]["info"]["tag"].val(),
                    "score": $comingUpInfo["game3"]["red"]["info"]["score"].val(),
                    "position": $comingUpInfo["game3"]["red"]["info"]["position"].val(),
                    "form": $comingUpInfo["game3"]["red"]["info"]["form"].val()
                },
                "roster": {
                    "top": $comingUpInfo["game3"]["red"]["roster"]["top"].val(),
                    "jungle": $comingUpInfo["game3"]["red"]["roster"]["jungle"].val(),
                    "mid": $comingUpInfo["game3"]["red"]["roster"]["mid"].val(),
                    "adc": $comingUpInfo["game3"]["red"]["roster"]["adc"].val(),
                    "support": $comingUpInfo["game3"]["red"]["roster"]["support"].val()
                }
            }
        }
    };
    comingUpReplicant.value = {
        "colour": $("#scenes-coming-up-bg-colour").val(),
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

/** SWITCH SIDES **/
$(".scenes-coming-up-switch").click(function() { // When a side switch button is pressed...
    var game = $(this).data("game"); // Get the game associated with the button.
    var current = sceneTeamReplicant.value; // Get the current value.
    current[game] = {"blue": current[game]["red"], "red": current[game]["blue"]}; // Switch the teams.
    sceneTeamReplicant.value = current; // Update the replicant.
});


/**
 ################
 # CHAMP SELECT #
 ################
 **/

/** VARS **/
var champions = [{"file": "", "name": ""}, {"file": "Alistar", "name": "Alistar"}, {"file": "MissFortune", "name": "Miss Fortune"}, {'file': 'Katarina', 'name': 'Katarina'}, {'file': 'Orianna', 'name': 'Orianna'}, {'file': 'Malphite', 'name': 'Malphite'}, {'file': 'Shen', 'name': 'Shen'}, {'file': 'Kassadin', 'name': 'Kassadin'}, {'file': 'Hecarim', 'name': 'Hecarim'}, {'file': 'Illaoi', 'name': 'Illaoi'}, {'file': 'TwistedFate', 'name': 'Twisted Fate'}, {'file': 'Karthus', 'name': 'Karthus'}, {'file': 'Kennen', 'name': 'Kennen'}, {'file': 'FiddleSticks', 'name': 'Fiddlesticks'}, {'file': 'Akali', 'name': 'Akali'}, {'file': 'KogMaw', 'name': "Kog'Maw"}, {'file': 'Tristana', 'name': 'Tristana'}, {'file': 'Lissandra', 'name': 'Lissandra'}, {'file': 'Nami', 'name': 'Nami'}, {'file': 'Khazix', 'name': "Kha'Zix"}, {'file': 'JarvanIV', 'name': 'Jarvan IV'}, {'file': 'Leblanc', 'name': 'LeBlanc'}, {'file': 'Azir', 'name': 'Azir'}, {'file': 'RekSai', 'name': "Rek'Sai"}, {'file': 'Janna', 'name': 'Janna'}, {'file': 'Chogath', 'name': "Cho'Gath"}, {'file': 'Ryze', 'name': 'Ryze'}, {'file': 'Caitlyn', 'name': 'Caitlyn'}, {'file': 'Gnar', 'name': 'Gnar'}, {'file': 'Ezreal', 'name': 'Ezreal'}, {'file': 'Draven', 'name': 'Draven'}, {'file': 'Nautilus', 'name': 'Nautilus'}, {'file': 'Viktor', 'name': 'Viktor'}, {'file': 'MasterYi', 'name': 'Master Yi'}, {'file': 'LeeSin', 'name': 'Lee Sin'}, {'file': 'Zyra', 'name': 'Zyra'}, {'file': 'Kindred', 'name': 'Kindred'}, {'file': 'Nidalee', 'name': 'Nidalee'}, {'file': 'Lucian', 'name': 'Lucian'}, {'file': 'Shyvana', 'name': 'Shyvana'}, {'file': 'Corki', 'name': 'Corki'}, {'file': 'Urgot', 'name': 'Urgot'}, {'file': 'Leona', 'name': 'Leona'}, {'file': 'Velkoz', 'name': "Vel'Koz"}, {'file': 'Warwick', 'name': 'Warwick'}, {'file': 'MonkeyKing', 'name': 'Wukong'}, {'file': 'Irelia', 'name': 'Irelia'}, {'file': 'Elise', 'name': 'Elise'}, {'file': 'Vladimir', 'name': 'Vladimir'}, {'file': 'Anivia', 'name': 'Anivia'}, {'file': 'Blitzcrank', 'name': 'Blitzcrank'}, {'file': 'Rammus', 'name': 'Rammus'}, {'file': 'Olaf', 'name': 'Olaf'}, {'file': 'Cassiopeia', 'name': 'Cassiopeia'}, {'file': 'Veigar', 'name': 'Veigar'}, {'file': 'Vayne', 'name': 'Vayne'}, {'file': 'Gragas', 'name': 'Gragas'}, {'file': 'Zac', 'name': 'Zac'}, {'file': 'Swain', 'name': 'Swain'}, {'file': 'Braum', 'name': 'Braum'}, {'file': 'Singed', 'name': 'Singed'}, {'file': 'Shaco', 'name': 'Shaco'}, {'file': 'Udyr', 'name': 'Udyr'}, {'file': 'Zilean', 'name': 'Zilean'}, {'file': 'Syndra', 'name': 'Syndra'}, {'file': 'Ahri', 'name': 'Ahri'}, {'file': 'XinZhao', 'name': 'Xin Zhao'}, {'file': 'Rengar', 'name': 'Rengar'}, {'file': 'Volibear', 'name': 'Volibear'}, {'file': 'Soraka', 'name': 'Soraka'}, {'file': 'Mordekaiser', 'name': 'Mordekaiser'}, {'file': 'Lux', 'name': 'Lux'}, {'file': 'Morgana', 'name': 'Morgana'}, {'file': 'TahmKench', 'name': 'Tahm Kench'}, {'file': 'Skarner', 'name': 'Skarner'}, {'file': 'Xerath', 'name': 'Xerath'}, {'file': 'Zed', 'name': 'Zed'}, {'file': 'Poppy', 'name': 'Poppy'}, {'file': 'Amumu', 'name': 'Amumu'}, {'file': 'Aatrox', 'name': 'Aatrox'}, {'file': 'Pantheon', 'name': 'Pantheon'}, {'file': 'Riven', 'name': 'Riven'}, {'file': 'Ekko', 'name': 'Ekko'}, {'file': 'Graves', 'name': 'Graves'}, {'file': 'Vi', 'name': 'Vi'}, {'file': 'Twitch', 'name': 'Twitch'}, {'file': 'Sion', 'name': 'Sion'}, {'file': 'Ashe', 'name': 'Ashe'}, {'file': 'Malzahar', 'name': 'Malzahar'}, {'file': 'Trundle', 'name': 'Trundle'}, {'file': 'Evelynn', 'name': 'Evelynn'}, {'file': 'Varus', 'name': 'Varus'}, {'file': 'Lulu', 'name': 'Lulu'}, {'file': 'Fizz', 'name': 'Fizz'}, {'file': 'Fiora', 'name': 'Fiora'}, {'file': 'Annie', 'name': 'Annie'}, {'file': 'Kayle', 'name': 'Kayle'}, {'file': 'Yasuo', 'name': 'Yasuo'}, {'file': 'Bard', 'name': 'Bard'}, {'file': 'Jayce', 'name': 'Jayce'}, {'file': 'Nunu', 'name': 'Nunu'}, {'file': 'Renekton', 'name': 'Renekton'}, {'file': 'Sejuani', 'name': 'Sejuani'}, {'file': 'Thresh', 'name': 'Thresh'}, {'file': 'Rumble', 'name': 'Rumble'}, {'file': 'Darius', 'name': 'Darius'}, {'file': 'Taric', 'name': 'Taric'}, {'file': 'Ziggs', 'name': 'Ziggs'}, {'file': 'Garen', 'name': 'Garen'}, {'file': 'Yorick', 'name': 'Yorick'}, {'file': 'Heimerdinger', 'name': 'Heimerdinger'}, {'file': 'Teemo', 'name': 'Teemo'}, {'file': 'Jinx', 'name': 'Jinx'}, {'file': 'Diana', 'name': 'Diana'}, {'file': 'Karma', 'name': 'Karma'}, {'file': 'Gangplank', 'name': 'Gangplank'}, {'file': 'Maokai', 'name': 'Maokai'}, {'file': 'Brand', 'name': 'Brand'}, {'file': 'Tryndamere', 'name': 'Tryndamere'}, {'file': 'Talon', 'name': 'Talon'}, {'file': 'Jax', 'name': 'Jax'}, {'file': 'Quinn', 'name': 'Quinn'}, {'file': 'Kalista', 'name': 'Kalista'}, {'file': 'Sivir', 'name': 'Sivir'}, {'file': 'DrMundo', 'name': 'Dr. Mundo'}, {'file': 'Nasus', 'name': 'Nasus'}, {'file': 'Sona', 'name': 'Sona'}, {'file': 'Galio', 'name': 'Galio'}, {'file': 'Nocturne', 'name': 'Nocturne'}];


/** INPUTS/BUTTONS **/
var $inputBans = {
    "blue": {"ban1": $("#champ-blue-ban1"), "ban2": $("#champ-blue-ban2"), "ban3": $("#champ-blue-ban3")},
    "red": {"ban1": $("#champ-red-ban1"), "ban2": $("#champ-red-ban2"), "ban3": $("#champ-red-ban3")}
};
var $inputChamps = {
    "blue": {"top": $("#champ-blue-top"), "jungle": $("#champ-blue-jungle"), "mid": $("#champ-blue-mid"), "adc": $("#champ-blue-adc"), "support": $("#champ-blue-support")},
    "red": {"top": $("#champ-red-top"), "jungle": $("#champ-red-jungle"), "mid": $("#champ-red-mid"), "adc": $("#champ-red-adc"), "support": $("#champ-red-support")}
};
var $inputSwitches = {
    "blue": {"top": $("#champ-blue-top-status"), "jungle": $("#champ-blue-jungle-status"), "mid": $("#champ-blue-mid-status"), "adc": $("#champ-blue-adc-status"), "support": $("#champ-blue-support-status")},
    "red": {"top": $("#champ-red-top-status"), "jungle": $("#champ-red-jungle-status"), "mid": $("#champ-red-mid-status"), "adc": $("#champ-red-adc-status"), "support": $("#champ-red-support-status")}
};
var $champUpdateBtn = $("#champ-update");


/** REPLICANTS **/
var champReplicant = nodecg.Replicant("champ-select", {defaultValue: {"blue": {"picks":{"top":{"locked":false,"champ":""},"jungle":{"locked":false,"champ":""},"mid":{"locked":false,"champ":""},"adc":{"locked":false,"champ":""},"support":{"locked":false,"champ":""}},"bans":{"ban1":"","ban2":"","ban3":""}},"red":{"picks":{"top":{"locked":false,"champ":""},"jungle":{"locked":false,"champ":""},"mid":{"locked":false,"champ":""},"adc":{"locked":false,"champ":""},"support":{"locked":false,"champ":""}},"bans":{"ban1":"","ban2":"","ban3":""}}}})
    .on("change", function(oldVal, newVal) { // On change...
        $.each(newVal, function(team, value) { // For each team...
            $.each(value["bans"], function(ban, value) { // For each ban...
                $inputBans[team][ban].val(value["name"]).parent().removeClass("has-warning"); // Update value and remove 'edited' class.
            });
            $.each(value["picks"], function(lane, value) { // For each pick...
                $inputChamps[team][lane].val($.grep(champions, function(e) { return e.file == value["champ"]; })[0]["name"]); // Update value (convert filename to name).
                $inputChamps[team][lane].parent().removeClass("has-warning"); // Remove 'edited' class.
                $inputSwitches[team][lane].bootstrapSwitch("state", value["locked"], true); // Update 'locked-in' status.
            });
        });
        $champUpdateBtn.prop("disabled", true).removeClass("btn-primary"); // Disable update button.
    });


/** TYPEAHEAD **/
$(document).ready(function() {
    var champHound = new Bloodhound({ // Define champion names.
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: champions
    });

    $(".typeahead-champs").typeahead({highlight: true}, {
        name: "champions",
        display: "name",
        source: champHound
    });
});


/*** UPDATING ***/
var champUpdate = function() { // Update replicant when update button is clicked.
    champReplicant.value = {
        "blue": {
            "picks": {
                "top": {
                    "locked": $inputSwitches["blue"]["top"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["blue"]["top"].val();})[0]["file"]
                },
                "jungle": {
                    "locked": $inputSwitches["blue"]["jungle"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["blue"]["jungle"].val();})[0]["file"]
                },
                "mid": {
                    "locked": $inputSwitches["blue"]["mid"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["blue"]["mid"].val();})[0]["file"]
                },
                "adc": {
                    "locked": $inputSwitches["blue"]["adc"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["blue"]["adc"].val();})[0]["file"]
                },
                "support": {
                    "locked": $inputSwitches["blue"]["support"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["blue"]["support"].val();})[0]["file"]
                }
            },
            "bans": {
                "ban1": {"name": $inputBans["blue"]["ban1"].val(), "file": $.grep(champions, function (e) {return e.name == $inputBans["blue"]["ban1"].val();})[0]["file"]},
                "ban2": {"name": $inputBans["blue"]["ban2"].val(), "file": $.grep(champions, function (e) {return e.name == $inputBans["blue"]["ban2"].val();})[0]["file"]},
                "ban3": {"name": $inputBans["blue"]["ban3"].val(), "file": $.grep(champions, function (e) {return e.name == $inputBans["blue"]["ban3"].val();})[0]["file"]}
            }
        },
        "red": {
            "picks": {
                "top": {
                    "locked": $inputSwitches["red"]["top"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["red"]["top"].val();})[0]["file"]
                },
                "jungle": {
                    "locked": $inputSwitches["red"]["jungle"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["red"]["jungle"].val();})[0]["file"]
                },
                "mid": {
                    "locked": $inputSwitches["red"]["mid"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["red"]["mid"].val();})[0]["file"]
                },
                "adc": {
                    "locked": $inputSwitches["red"]["adc"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["red"]["adc"].val();})[0]["file"]
                },
                "support": {
                    "locked": $inputSwitches["red"]["support"].bootstrapSwitch("state"),
                    "champ": $.grep(champions, function (e) {return e.name == $inputChamps["red"]["support"].val();})[0]["file"]
                }
            },
            "bans": {
                "ban1": {"name": $inputBans["red"]["ban1"].val(), "file": $.grep(champions, function (e) {return e.name == $inputBans["red"]["ban1"].val();})[0]["file"]},
                "ban2": {"name": $inputBans["red"]["ban2"].val(), "file": $.grep(champions, function (e) {return e.name == $inputBans["red"]["ban2"].val();})[0]["file"]},
                "ban3": {"name": $inputBans["red"]["ban3"].val(), "file": $.grep(champions, function (e) {return e.name == $inputBans["red"]["ban3"].val();})[0]["file"]}
            }
        }
    };
};

$(".update-on-change").bind("change paste keyup", function(e) { // If any of the champion names are changed...
    if (e.keyCode == 13) {
        champUpdate(); // Update if enter key.
    } else { // Else somethings changed.
        $champUpdateBtn.prop("disabled", false).addClass("btn-primary"); // Enable the update button.
        $(this).parent().addClass("has-warning"); // Colour the text-box to show it hasn't been updated.
    }
});

$champUpdateBtn.click(function() { // Update replicant when update button is clicked.
    champUpdate();
});

$(".bootswitch").on("switchChange.bootstrapSwitch", function(event, state) {
    champUpdate();
    var champ = $(this).parents(".form-group").find(".form-control.tt-input").val();
    if (state && champ != "") {
        var file = $.grep(champions, function (e) {return e.name == champ;})[0]["file"];
        var info = $.getJSON("http://api.champion.gg/champion/" + file + "/general?api_key=16b895734761a611effa84be7bbbf8a7");
        nodecg.sendMessage("champ-picked", {
            "name": champ,
            "file": file,
            "info": {"pickrate": "78% (7/9)", "banrate": "11% (1/9)", "winrate": "43% (3/7)"}
        });
    }
});


/** MISC **/
// Reset fields.
$("#champ-reset").click(function() {
    $.each(["blue", "red"], function(key, team) {
        $.each($.extend($inputChamps[team], $inputBans[team]), function(key, value) {
            value.val("");
        });
        $.each($inputSwitches[team], function(key, value) {
            value.bootstrapSwitch("state", false, true)
        });
    });
    champUpdate();
    nodecg.sendMessage("champ-picked-clear")
});

// Init the toggle switches for deciding if a champ is locked in or not.
$(".bootswitch").bootstrapSwitch({
    "onText": '<i class="fa fa-lock"></i>',
    "offText": '<i class="fa fa-unlock"></i>',
    "onColor": "success"
});


/**
 ###########
 # IN-GAME #
 ###########
 */

/** INPUTS **/
var $inGameTexts = {"left": {"top": $("#in-game-left-top-text"), "bottom": $("#in-game-left-bottom-text")}, "right": $("#in-game-right-text")};
var $inGameUpdateBtn = $("#in-game-update");
var $inGameResetBtn = $("#in-game-reset");

/** REPLICANTS **/
var inGameReplicant = nodecg.Replicant("in-game", {defaultValue: {"left":{"top": "", "bottom": ""}, "right": ""}})
    .on("change", function(oldVal, newVal) { // On change...
        $inGameTexts["left"]["top"].val(newVal["left"]["top"]).parent().removeClass("has-warning");
        $inGameTexts["left"]["bottom"].val(newVal["left"]["bottom"]).parent().removeClass("has-warning"); // Remove 'edited' class.;
        $inGameTexts["right"].val(newVal["right"]).parent().removeClass("has-warning"); // Remove 'edited' class.;
    });

/** UPDATING **/
var inGameUpdate = function() {
    inGameReplicant.value = {
        "left": {"top": $inGameTexts["left"]["top"].val(), "bottom": $inGameTexts["left"]["bottom"].val()},
        "right": $inGameTexts["right"].val()
    };
};

$(".in-game-on-change").bind("change paste keyup", function(e) { // If any of the champion names are changed...
    if (e.keyCode == 13) {
        inGameUpdate(); // Update if enter key.
    } else { // Else somethings changed.
        $inGameUpdateBtn.prop("disabled", false).addClass("btn-primary"); // Enable the update button.
        $(this).parent().addClass("has-warning"); // Colour the text-box to show it hasn't been updated.
    }
});

$inGameUpdateBtn.click(function() {
    inGameUpdate();
});

/** RESET **/
$inGameResetBtn.click(function() {
    $inGameTexts["left"]["top"].val("");
    $inGameTexts["left"]["bottom"].val("");
    $inGameTexts["right"].val("");
    inGameUpdate();
});


/**
 ############
 # ANALYSIS #
 ############
 */

var player;
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player("player", {
        height: "452",
        width: "804",
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            related: 0
        },
        events: {
            onStateChange: onPlayerStateChange
        }
    });
};

/** INPUTS **/
var $videoIdInput = $("#analysis-video-id");
var $videoIdBtn = $("#analysis-video-id-btn");

$videoIdBtn.click(function() {
    player.loadVideoById({
        videoId: $videoIdInput.val(),
        suggestedQuality: "hd720"
    });
    player.pauseVideo();
    nodecg.sendMessage("analysis-video", $videoIdInput.val())
});

function onPlayerStateChange(event) {
    if (event.data === 1) {
        nodecg.sendMessage("analysis-play", {
            "speed": player.getPlaybackRate()
        });
    } else if (event.data === 2) {
        nodecg.sendMessage("analysis-pause", {
            "time": player.getCurrentTime()
        });
    }
}
