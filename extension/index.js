"use strict";

module.exports = function(nodecg) {
    require("./keypress.js")(nodecg);
    require("./strawpoll.js")(nodecg);
	require("./obs.js")(nodecg);
};
