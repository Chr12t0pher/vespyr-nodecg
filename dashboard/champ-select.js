'use strict';

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
