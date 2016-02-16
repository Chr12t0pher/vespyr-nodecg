/** INPUTS/BUTTONS **/
var $obsStatus = $("#obs-connection-status");
var $streamStatus = $("#obs-stream-status");
var $obsStartPromptBtn = $("#obs-start-prompt");
var $obsStopBtn = $("#obs-stop-btn");
var $sceneInputs = {
    "start": $("input[value='start']"), "coming-up": $("input[value='coming-up']"),
    "champ-select": $("input[value='champ-select']"), "loading": $("input[value='loading']"),
    "in-game": $("input[value='in-game']"), "analysis": $("input[value='analysis']"), "end": $("input[value='end']")
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
            $obsStartPromptBtn.parent().hide();
        } else if (stream && previewing) {
            $streamStatus.removeClass().addClass("alert alert-warning").text("STREAM PREVIEWING");
            $obsStopBtn.parent().hide();
        } else {
            $streamStatus.removeClass().addClass("alert alert-danger").text("STREAM OFFLINE");
            $obsStopBtn.parent().hide();
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
        $obsStartPromptBtn.parent().hide();
        $obsStopBtn.parent().show();
    } else {
        $streamStatus.removeClass().addClass("alert alert-warning").text("STREAM PREVIEWING");
        $obsStartPromptBtn.parent().show();
        $obsStopBtn.parent().hide();
    }
};

obs.onStreamStopped = function() {
    $streamStatus.removeClass().addClass("alert alert-danger").text("STREAM OFFLINE");
    $obsStartPromptBtn.parent().show();
    $obsStopBtn.parent().hide();
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
    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
       alert("OBS control to remote hosts does not work in Chrome - please use Firefox or Internet Explorer/Edge." +
           " If you're connecting to 127.0.0.1 or localhost disregard this message.")
    }
    connect($("#obs-ip").val());
});

/** START/STOP **/
nodecg.listenFor("obs-start", function() {
    obs.getStreamingStatus(function(live, preview) {
        if (live && preview) { // If the preview is live...
            obs.toggleStream(); // Toggle it off.
        }
    });
    setTimeout(function() {
        obs.toggleStream(); // Go live!
        obs.setCurrentScene("start"); // Load the start scene first, so we can listen for the loaded messages.
        setTimeout(function() {
            obs.setCurrentScene("coming-up"); // Go through all the scenes to load the web-pages.
            obs.setCurrentScene("champ-select");
            obs.setCurrentScene("loading");
            obs.setCurrentScene("in-game");
            obs.setCurrentScene("analysis");
            obs.setCurrentScene("end");
            obs.setCurrentScene("start"); // End on the start screen deliberately.
        }, 1000)
    }, 1000); // Go live after 1 second to account for turning off the preview.
});

$obsStopBtn.click(function() {
    obs.getStreamingStatus(function(live, preview) {
        if (live) {
            obs.toggleStream();
        }
    });
});
