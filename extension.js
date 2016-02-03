var express = require("express"),
    app = express();

module.exports = function(nodecg) {
    var OscReceiver = require("osc-receiver")
        , receiver = new OscReceiver();

    receiver.bind(8338);

    receiver.on("/lol", function() {
        nodecg.sendMessage("lolEvent", arguments[1]);
    });

    nodecg.mount(app);
};
