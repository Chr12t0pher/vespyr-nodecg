/** INPUTS/BUTTONS **/
var $obsStatus = $("#obs-connection-status");
var $streamStatus = $("#obs-stream-status");
var $sceneInputs = {
    "coming-up": $("input[value='coming-up']"), "champion-select": $("input[value='champion-select']"),
    "loading": $("input[value='loading']"), "in-game": $("input[value='in-game']"), "end": $("input[value='end']")
};
var currentScene = "";


/** OBS **/
var obs = new OBSRemote();

var connect = function() {
    obs.connect("localhost", "admin");
};

connect();

// Register all the event handlers for OBSRemote.
obs.onConnectionOpened = function() {
    $obsStatus.removeClass().addClass("alert alert-warning").text("CONNECTING");
};

obs.onAuthenticationSucceeded = function() {
    obs.getCurrentScene(function(scene) {
        $sceneInputs[scene["name"]].prop("checked", true);
        currentScene = scene["name"];
    });
    $obsStatus.removeClass().addClass("alert alert-success").text("CONNECTED");
    obs.getStreamingStatus(function(stream, previewing) {
        if (stream && !previewing) {
            $streamStatus.removeClass().addClass("alert alert-success").text("STREAM LIVE");
        } else if (stream && previewing) {
            $streamStatus.removeClass().addClass("alert alert-warning").text("STREAM PREVIEWING");
        } else {
            $streamStatus.removeClass().addClass("alert alert-danger").text("STREAM OFFLINE");
        }
    });
};

obs.onAuthenticationFailed = function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("AUTHENTICATION FAILED");
};

obs.onConnectionFailed = function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("CONNECTION FAILED");
    $.debounce(connect(), 5000);
};

obs.onConnectionClosed = function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("CONNECTION CLOSED");
    $.debounce(connect(), 5000);
};

obs.onStreamStarted = function(previewing) {
    if (!previewing) {
        $streamStatus.removeClass().addClass("alert alert-success").text("STREAM LIVE");
    } else {
        $streamStatus.removeClass().addClass("alert alert-warning").text("STREAM PREVIEWING");
    }
};

obs.onStreamStopped = function() {
    $streamStatus.removeClass().addClass("alert alert-danger").text("STREAM OFFLINE")
};

obs.onSceneSwitched = function(sceneName) { // If scene is changed in OBS...
    $sceneInputs[sceneName].prop("checked", true); // Update in NodeCG.
};


/** REPLICANTS **/
var obsScene = nodecg.Replicant("obs", {defaultValue: ""});

$.each($sceneInputs, function(scene, value) {
    value.click(function() { // If a scene is selected...
        obsScene.value = scene; // Update the scene in OBS.
        obs.setCurrentScene(scene); // Update the OBS replicant.
    })
});
