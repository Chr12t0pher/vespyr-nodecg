/** PRELOAD.JS **/
var preload = new createjs.LoadQueue(false);
preload.loadManifest([ // Preload videos.
    {id: "blue-bg", src: "images/blue.jpg"},
    {id: "green-bg", src: "images/green.jpg"},
    {id: "red-bg", src: "images/red.jpg"},
    {id: "black-bg", src: "images/black.jpg"}
]);
preload.load();

preload.on("complete", function() { // Don't do anything until we've loaded assets.
    nodecg.sendMessage("loaded", "end");
    var currentBG = "";
    var comingUpReplicant = nodecg.Replicant("coming-up")
        .on("change", function(oldVal, newVal) { // On change...
            var colour = (newVal["colour"] == "inhouse") ? "black" : newVal["colour"];
            if (currentBG != colour) {
                $("#background-img").css("background-image", "url(" + preload.getResult(colour + "-bg").src + ")");
                currentBG = newVal["colour"];
            }
        });
});

nodecg.listenFor("refresh", function(graphic) {
    if (graphic == "end") { location.reload(true); }
});

