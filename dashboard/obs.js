/** INPUTS/BUTTONS **/
var $obsStatus = $("#obs-status");
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
    $obsStatus.removeClass().addClass("alert alert-warning").text("CONNECTING")
};

obs.onAuthenticationSucceeded = function() {
    obs.getCurrentScene(function(scene) {
        $sceneInputs[scene["name"]].prop("checked", true);
        currentScene = scene["name"];
    });
    $obsStatus.removeClass().addClass("alert alert-success").text("CONNECTED");
};

obs.onAuthenticationFailed = function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("AUTH. FAILED");
};

obs.onConnectionFailed = function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("CONN. FAILED");
    $.debounce(connect(), 5000);
};

obs.onConnectionClosed = function() {
    $obsStatus.removeClass().addClass("alert alert-danger").text("CONN. CLOSED");
    $.debounce(connect(), 5000);
};

obs.onSceneSwitched = function(sceneName) { // If scene is changed in OBS...
    $sceneInputs[sceneName].prop("checked", true); // Update in NodeCG.
};

$.each($sceneInputs, function(scene, value) {
    value.click(function() {
        obs.setCurrentScene(scene);
        currentScene = scene;
    })
});
