/** PRELOAD.JS **/
var preload = new createjs.LoadQueue(false);
preload.loadManifest([ // Preload videos.
    {id: "blue-poster", src: "images/blue.jpg"},
    {id: "green-poster", src: "images/green.jpg"},
    {id: "red-poster", src: "images/red.jpg"},
    {id: "black-poster", src: "images/black.jpg"}
]);
preload.load();

preload.on("complete", function() { // Don't do anything until we've loaded assets.
    var $backgroundVid = $("#background-vid");
    var $backgroundVidSource = $("#background-vid source");
    var currentBG = "";

    var comingUpReplicant = nodecg.Replicant("coming-up")
        .on("change", function(oldVal, newVal) { // On change...
            var colour = (newVal["colour"] == "inhouse") ? "black" : newVal["colour"];
            if (currentBG != colour) {
                $("#background-img").css("background-image", "url(" + preload.getResult(colour + "-poster").src + ")");
                // $backgroundVid.attr("poster", preload.getResult(newVal["colour"] + "-poster").src);
                // $backgroundVidSource.attr("src", preload.getResult(newVal["colour"] + "-vid").src); // Actual video.
                // $backgroundVid.load(); // Load it.
                currentBG = newVal["colour"];
            }
        });
});

var ready = {
    "start": true,
    "coming-up": false,
    "champ-select": false,
    "loading": false,
    "in-game": false,
    "end": false
};

nodecg.listenFor("loaded", function(scene) {
    ready[scene] = true;
    if (Object.keys(ready).every(function(key){ return this[key] === true}, ready)) { // If all scenes are ready...
        nodecg.sendMessage("loaded-all"); // Send a toast to the dashboard.
    }
});

nodecg.listenFor("refresh", function(graphic) {
    if (graphic == "start") { location.reload(true); }
});

