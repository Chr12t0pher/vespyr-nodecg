'use strict';

/** INPUTS/BUTTONS **/
var $casterFields = [
    $("#caster-input1"),
    $("#caster-input2")
];

var $castersUpdateBtn = $("#caster-update");

/** REPLICANTS **/
var casters = nodecg.Replicant("casters", {defaultValue: ["", ""]})
    .on("change", function(oldVal, newVal) {
        $.each(newVal, function(key, value) { // Update fields in dashboard.
            $casterFields[key].val(value);
        });
        $castersUpdateBtn.prop("disabled", true).removeClass("btn-primary"); // Disable update button.
    });


/** TYPEAHEAD **/
$(document).ready(function() {
    var casters = new Bloodhound({ // Define Caster names.
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: ["GoodBroJoe", "Archarom", "Benvarmeren", "Darthlaser", "Grangg", "Void", "Aladar"]
    });

    $.each($casterFields, function(key, value) { // Register the Typeahead inputs.
        value.typeahead({
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
$castersUpdateBtn.click(function() { // Update replicant when update button is clicked.
    casters.value = [$casterFields[0].val(), $casterFields[1].val()];
});

$(".casters-on-change").bind("change paste keyup", function(e) { // If any of the champion names are changed...
    if(e.keyCode == 13) {
        casters.value = [$casterFields[0].val(), $casterFields[1].val()]; // Update if enter key.
        $(".casters-on-change").parent().removeClass("has-warning")
    } else { // Else somethings changed.
        $castersUpdateBtn.prop("disabled", false).addClass("btn-primary"); // Enable the update button.
        $(this).parent().addClass("has-warning"); // Colour the input to show it hasn't been updated.
    }
});
