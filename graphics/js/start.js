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

