'use strict';

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
