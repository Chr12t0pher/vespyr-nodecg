/** INPUTS/BUTTONS **/
var $obsStatus = $("#obs-connection-status");
var $streamStatus = $("#obs-stream-status");
var $sceneInputs = {
    "coming-up": $("input[value='coming-up']"), "champion-select": $("input[value='champion-select']"),
    "loading": $("input[value='loading']"), "in-game": $("input[value='in-game']"), "end": $("input[value='end']")
};


/** OBS **/
var obs = new OBSRemote();

var connect = function(ip) {
    console.log("[OBS] Connecting on " + ip);
    obs.connect(ip, "admin");
};

// Register all the event handlers for OBSRemote.
obs.onConnectionOpened = function() {
    $obsStatus.removeClass().addClass("alert alert-warning").text("CONNECTING");
};

obs.onAuthenticationSucceeded = function() {
    obs.getCurrentScene(function(scene) {
        $sceneInputs[scene["name"]].prop("checked", true);
        obsScene.value = scene["name"];
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
    setTimeout(connect(), 5000);
};

obs.onConnectionClosed = function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("CONNECTION CLOSED");
    setTimeout(connect(), 5000);
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
    obsScene.value = {"scene": sceneName, "update": "obs"}; // Update the OBS replicant.
};


/** REPLICANTS **/
var obsScene = nodecg.Replicant("obs-scene", {defaultValue: {"scene": "", "update": ""}})
    .on("change", function(oldVal, newVal) { // On change...
        if (newVal["update"] == "obs") {
            $sceneInputs[newVal["scene"]].prop("checked", true); // Update dashboard.
        } else if (newVal["update"] == "nodecg") {
            obs.setCurrentScene(newVal["scene"]); // Update OBS
        }
    });

$.each($sceneInputs, function(scene, value) {
    value.click(function() { // If a scene is selected...
        obsScene.value = {"scene": scene, "update": "nodecg"}; // Update the OBS replicant.
    })
});

$("#obs-ip-btn").click(function() {
    connect($("#obs-ip").val());
});
