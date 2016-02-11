"use strict";

module.exports = function(nodecg) {
    require("./extension/keypress.js")(nodecg);
    require("./extension/strawpoll.js")(nodecg);
};
