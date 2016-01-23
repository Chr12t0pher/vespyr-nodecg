var $score = {"blue": $("#blue-score"), "red": $("#red-score")};


var teamReplicant = nodecg.Replicant("teams")
    .on("change", function(oldVal, newVal) { // On change...
        $score["blue"].text(newVal["blue"]["team"]["score"] + " - " + newVal["blue"]["team"]["tag"]);
        $score["red"].text(newVal["red"]["team"]["tag"] + " - " + newVal["red"]["team"]["score"]);
    });
