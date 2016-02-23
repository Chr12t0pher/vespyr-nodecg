/** PRELOAD.JS **/
var preload = new createjs.LoadQueue(false);
preload.loadManifest([ // Preload assets.
    {id: "blue-bg", src: "images/loading/blue.png"},
    {id: "green-bg", src: "images/loading/green.png"},
    {id: "red-bg", src: "images/loading/red.png"},
    {id: "black-bg", src: "images/loading/black.png"}
]);
preload.load();

preload.on("complete", function() { // Don't do anything until we've loaded assets.
    nodecg.sendMessage("loaded", "loading");
    var currentBG = "";
    var comingUpReplicant = nodecg.Replicant("coming-up")
        .on("change", function(oldVal, newVal) { // On change...
            var colour = (newVal["colour"] == "inhouse") ? "black" : newVal["colour"];
            if (currentBG != colour) {
                $("#background-img").css("background-image", "url(" + preload.getResult(colour + "-bg").src + ")");
                currentBG = newVal["colour"];
            }
            updateTeams();
        });
    var teamReplicant = nodecg.Replicant("team-data")
        .on("change", function(oldVal, newVal) {
            updateTeams();
        });
    var updateTeams = function() {
        if(!teamReplicant.value) { // If the team replicant hasn't loaded yet, return.
            return
        }
        $.each(teamReplicant.value[comingUpReplicant.value["next_game"]], function (team, value) { // For each team...
            $("#" + team + "-team").text(value["info"]["tag"])
        });
    }
});

nodecg.listenFor("refresh", function(graphic) {
    if (graphic == "loading") { location.reload(true); }
});
