var concat = require("concat-stream");
var hyperquest = require('hyperquest');
var querystring = require('querystring');

var URL = 'http://strawpoll.me/api/v2/polls';
var HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'node-strawpoll'
};

function create(options) {
    var stream = hyperquest.post(URL, {headers: HEADERS});
    stream.end(querystring.stringify(options));
    return stream;
}

function get(id) {
    var stream = hyperquest.get(URL + '/' + id);
    return stream;
}

module.exports = function(nodecg) {
	var strawpollReplicant = nodecg.Replicant("strawpoll",
		{defaultValue: {"id": "", "options": ["", ""], "result": [0,0], "show": false, "time": 0}}
	);

    nodecg.listenFor("strawpoll-create", function(data) {
        var stream = create({
            title: "Who will win?",
            options: data,
            multi: false,
            permissive: true
        });

        stream.pipe(concat(function(poll) {
            poll = JSON.parse(poll);
			strawpollReplicant.value = {"id": poll.id, "options": data, "result": [0, 0], "show": false, "time": 0};
        }));
    });

    strawpollReplicant.on("change", function(oldVal, newVal) {
		if (newVal["show"]) {
			if (newVal["time"] <= 600) { // Update for 10 minutes max.
				var stream = get(newVal["id"])
					.pipe(concat(function(poll) {
						poll = JSON.parse(poll);
						setTimeout(function() {
							newVal["time"] += 3;
							newVal["result"] = poll["votes"];
							strawpollReplicant.value = newVal;
						}, 3000);
					}));
			}
		}
    });
};
