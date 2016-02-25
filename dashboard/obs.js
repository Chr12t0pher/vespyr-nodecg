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

// Register all the event handlers for OBSRemote.
nodecg.listenFor("obs-onConnectionOpened", function() {
    $obsStatus.removeClass().addClass("alert alert-warning").text("CONNECTING");
});

nodecg.listenFor("obs-onAuthenticationSucceeded", function() {
	nodecg.sendMessage("obs-getCurrentScene");
    $obsStatus.removeClass().addClass("alert alert-success").text("CONNECTED");
    nodecg.sendMessage("obs-getStreamStatus", function(callback) {
		var stream = callback.stream; var previewing = callback.previewing;
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
});

nodecg.listenFor("obs-currentScene", function(scene) {
	$sceneInputs[scene["name"]].prop("checked", true);
	obsScene.value = scene["name"];
});

nodecg.listenFor("obs-currentStreamStatus", function(data) {
	var stream = data.live, previewing = data.previewing;
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

nodecg.listenFor("obs-onAuthenticationFailed", function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("AUTHENTICATION FAILED");
});

nodecg.listenFor("obs-onConnectionFailed", function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("CONNECTION FAILED");
});

nodecg.listenFor("obs-onConnectionClosed", function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("CONNECTION CLOSED");
});

nodecg.listenFor("obs-onStreamStarted", function(status) {
    if (status == "live") {
        $streamStatus.removeClass().addClass("alert alert-success").text("STREAM LIVE");
        $obsStartPromptBtn.parent().hide();
        $obsStopBtn.parent().show();
    } else {
        $streamStatus.removeClass().addClass("alert alert-warning").text("STREAM PREVIEWING");
        $obsStartPromptBtn.parent().show();
        $obsStopBtn.parent().hide();
    }
});

nodecg.listenFor("obs-onStreamStopped", function() {
    $streamStatus.removeClass().addClass("alert alert-danger").text("STREAM OFFLINE");
    $obsStartPromptBtn.parent().show();
    $obsStopBtn.parent().hide();
});


/** REPLICANTS **/
var obsScene = nodecg.Replicant("obs-scene", {defaultValue: {"scene": "", "update": ""}})
    .on("change", function(oldVal, newVal) { // On change...
        if (newVal["update"] == "obs") {
            $sceneInputs[newVal["scene"]].prop("checked", true); // Update dashboard.
        }
    });

$.each($sceneInputs, function(scene, value) {
    value.click(function() { // If a scene is selected...
        obsScene.value = {"scene": scene, "update": "nodecg"}; // Update the OBS replicant.
    })
});

$("#obs-ip-btn").click(function() {
    nodecg.sendMessage("obs-connect", ($("#obs-ip").val()));
});

/** START/STOP **/
$obsStopBtn.click(function() {
    nodecg.sendMessage("obs-stop");
});
