var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "1080",
        width: "1920",
        playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            related: 0
        }
    });
}

nodecg.listenFor("analysis-play", function(data) {
    player.setPlaybackRate(data["speed"]);
    player.playVideo(); // Play.
});

nodecg.listenFor("analysis-pause", function(data) {
    player.seekTo(data["time"], true);
    player.pauseVideo();
});

nodecg.listenFor("analysis-video", function(data) {
    player.loadVideoById({
        videoId: data,
        suggestedQuality: "hd720"
    });
    player.pauseVideo();
});

