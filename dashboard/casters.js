'use strict';

/** INPUTS/BUTTONS **/
var casterFields = [
    $("#caster-input1"),
    $("#caster-input2"),
    $("#caster-input3")
];

var $updateBtn = $("#caster-update");

/** REPLICANTS **/
var casters = nodecg.Replicant("casters", {defaultValue: ["", "", ""]})
    .on("change", function(oldVal, newVal) {
        newVal.forEach(function(name, i) { // Update fields in dashboard.
            casterFields[i].val(name);
        });
        $updateBtn.prop("disabled", true).removeClass("btn-primary"); // Disable update button.
    });


/** TYPEAHEAD **/
$(document).ready(function() {
    var casters = new Bloodhound({ // Define Caster names.
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: ["GoodBroJoe", "Archarom", "Benvarmeren", "Darthlaser", "Grangg", "Void"]
    });

    $(casterFields).each(function() { // Register the Typeahead inputs.
        $(this).typeahead({
            hint: true,
            highlight: true,
            minLength: 0
        }, {
            name: "casters",
            source: casters
        });
    });
});


/*** UPDATING ***/
$(casterFields).each(function() {
    $(this).bind("change paste keyup", function () { // If any of the caster names are changed...
        $updateBtn.prop("disabled", false).addClass("btn-primary"); // Enable the update button.
    });
});

$updateBtn.click(function() { // Update replicant when update button is clicked.
    casters.value = [casterFields[0].val(), casterFields[1].val(), casterFields[2].val()];
});
