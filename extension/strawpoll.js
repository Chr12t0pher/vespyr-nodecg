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
    nodecg.listenFor("strawpoll-create", function(data, callback) {
        var stream = create({
            title: "Who will win?",
            options: data,
            multi: false,
            permissive: true
        });

        stream.pipe(concat(function(poll) {
            poll = JSON.parse(poll);
            callback(poll.id)
        }));
    });

    var stop = false;
    var strawpollReplicant = nodecg.Replicant("strawpoll", {defaultValue: [1,1]});

    nodecg.listenFor("strawpoll-start", function(data) {
        stop = false;
        function checkResults() {
            if (!stop) {
                var stream = get(data)
                    .pipe(concat(function(poll) {
                        poll = JSON.parse(poll);
                        strawpollReplicant.value = poll["votes"];
                        setTimeout(function() { checkResults(); }, 2000);
                    }));
            }
        }
        checkResults();
    });

    nodecg.listenFor("strawpoll-stop", function() {
        stop = true;
    });
};
