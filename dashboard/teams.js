'use strict';

/** INPUTS/BUTTONS **/
var $teamFields = {
    "blue": {"name": $("#teams-blue-name"), "score": $("#teams-blue-score"), "form": $("#teams-blue-form")},
    "red": {"name": $("#teams-red-name"), "score": $("#teams-red-score"), "form": $("#teams-red-form")}
};
var $teamRoster = {
    "blue": {"top": $("#teams-blue-top"), "jungle": $("#teams-blue-jungle"), "mid": $("#teams-blue-mid"), "adc": $("#teams-blue-adc"), "support": $("#teams-blue-support")},
    "red": {"top": $("#teams-red-top"), "jungle": $("#teams-red-jungle"), "mid": $("#teams-red-mid"), "adc": $("#teams-red-adc"), "support": $("#teams-red-support")}
};
var $teamUpdateBtn = $("#teams-update");

/** REPLICANTS **/
var teamReplicant = nodecg.Replicant("teams", {defaultValue: {"blue": {"team": {"name": "", "score": "", "form": ""}, "roster": {"top": "", "jungle": "", "mid": "", "adc": "", "support": ""}}, "red": {"name": "", "score": "", "form": ""}, "roster": {"top": "", "jungle": "", "mid": "", "adc": "", "support": ""}}})
    .on("change", function(oldVal, newVal) { // On change...
        $.each(newVal, function(team, value) { // For each team...
            $.each(value["team"], function(field, value) {
                $teamFields[team][field].val(value).parent(".form-group").removeClass("has-warning"); // Update value and remove 'edited' class.
            });
            $.each(value["roster"], function(lane, value) {
                $teamRoster[team][lane].val(value).parent(".form-group").removeClass("has-warning"); // Update value and remove 'edited' class.
            })
        });
        $teamUpdateBtn.prop("disabled", true).removeClass("btn-primary"); // Disable update button.
    });

/** TYPEAHEAD **/
var teams = {
    "premier": [ // Premier League team names
        {"name": "Team Solo Mid", "tag": "TSM", "roster": {
            "top": "Hauntzer",
            "jungle": "Svenskeren",
            "mid": "Bjergsen",
            "adc": "Doublelift",
            "support": "YellOwStaR"
        }},
        {"name": "Fnatic", "tag": "FNC", "roster": {
            "top": "Gamsu",
            "jungle": "Spirit",
            "mid": "Febiven",
            "adc": "Rekkles",
            "support": "Noxiak"
        }},
        {"name": "Counter Logic Gaming", "tag": "CLG"}
    ]
};

var premier = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: teams["premier"]
});

var major = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [ // Major League team names
        {"name": "Supa Hot Crew", "tag": "SHC"},
        {"name": "Vitality", "tag": "VIT"},
        {"name": "Team Impulse", "tag": "TIP"}
    ]
});

var conference = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [ // Conference League team names
        {"name": "Cloud 9", "tag": "C9"},
        {"name": "Team Dignitas", "tag": "DIG"},
        {"name": "Renegades", "tag": "REN"}
    ]
});

$(function() { // Set up typeahead.js for the caster names.
    $.each($teamFields, function(team, value) {
        value["name"].typeahead({
            highlight: true
        }, {
            name: "premier",
            display: "name",
            source: premier,
            templates: {
                header: '<h4 class="list-group-item-heading league">Premier League</h4>'
            }
        }, {
            name: "major",
            display: "name",
            source: major,
            templates: {
                header: '<h4 class="list-group-item-heading league">Major League</h4>'
            }
        }, {
            name: "conference",
            display: "name",
            source: conference,
            templates: {
                header: '<h4 class="list-group-item-heading league">Conference League</h4>'
            }
        }).bind("typeahead:select", function(ev, suggestion) {
            $.each(suggestion["roster"], function(lane, value) {
                $teamRoster[team][lane].val(value);
            })
        }).bind("typeahead:autocomplete", function(ev, suggestion) {
            $.each(suggestion["roster"], function(lane, value) {
                $teamRoster[team][lane].val(value);
            })
        });
    });
});


/** UPDATING **/
var teamUpdate = function() {
    teamReplicant.value = {
        "blue": {
            "team": {"name": $teamFields["blue"]["name"].val(), "score": $teamFields["blue"]["score"].val(), "form": $teamFields["blue"]["form"].val()},
            "roster": {
                "top": $teamRoster["blue"]["top"].val(),
                "jungle": $teamRoster["blue"]["jungle"].val(),
                "mid": $teamRoster["blue"]["mid"].val(),
                "adc": $teamRoster["blue"]["adc"].val(),
                "support": $teamRoster["blue"]["support"].val()
            }
        },
        "red": {
            "team": {"name": $teamFields["red"]["name"].val(), "score": $teamFields["red"]["score"].val(), "form": $teamFields["red"]["form"].val()},
            "roster": {
                "top": $teamRoster["red"]["top"].val(),
                "jungle": $teamRoster["red"]["jungle"].val(),
                "mid": $teamRoster["red"]["mid"].val(),
                "adc": $teamRoster["red"]["adc"].val(),
                "support": $teamRoster["red"]["support"].val()
            }
        }
    };
};

$(".teams-on-change").bind("change paste keyup", function(e) { // If any of the champion names are changed...
    if(e.keyCode == 13) {
        teamUpdate(); // Update if enter key.
    } else { // Else somethings changed.
        $teamUpdateBtn.prop("disabled", false).addClass("btn-primary"); // Enable the update button.
        $(this).parent(".form-group").addClass("has-warning"); // Colour the text-box to show it hasn't been updated.
    }
});

$("#teams-switch").click(function() {
    var blue = teamReplicant.value["blue"];
    var red = teamReplicant.value["red"];
    teamReplicant.value = {"blue": red, "red": blue}
});

$updateBtn.click(function() {
    teamUpdate();
});

$("#teams-reset").click(function() {
    $.each(["blue", "red"], function(key, team) {
        $.each($teamFields[team], function(key, value) {
            value.val("");
        });
        $.each($teamRoster[team], function(key, value) {
            value.val("");
        });
    });
    teamUpdate();
});

