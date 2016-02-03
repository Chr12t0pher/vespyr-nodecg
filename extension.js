var express = require("express"),
    app = express();

module.exports = function(nodecg) {
    app.post("/vespyr/keypress", function(req, res) {
        res.send("");
        if (req.body.token == "nsa-cant-hack-dis" && (["A", "Tab"].indexOf(req.body.key) >= 0)) {
            nodecg.sendMessage("lolEvent", req.body.key);
        }
    });

    nodecg.mount(app);
};
