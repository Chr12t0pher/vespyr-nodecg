var $strawpollCreate = $("#strawpoll-create");
var $strawpollTeams = {"blue": $("#strawpoll-blue"), "red": $("#strawpoll-red")};
var $strawpollId = $("#strawpoll-id");
var $strawpollUrl = $("#strawpoll-url");
var $strawpollToggle = $("#strawpoll-toggle");

$strawpollCreate.click(function() {
    if ($strawpollTeams["blue"].val() == "" || $strawpollTeams["red"].val() == "") { return }
    nodecg.sendMessage("strawpoll-create", [$strawpollTeams["blue"].val(), $strawpollTeams["red"].val()], function(id) {
        $strawpollId.val(id);
        $strawpollUrl.val("http://strawpoll.me/" + id);
        $strawpollToggle.prop("disabled", false);
    });
});

$strawpollToggle.click(function() {
    if ($(this).hasClass("btn-success")) { // If poll is not showing.
        nodecg.sendMessage("strawpoll-start", $strawpollId.val());  // Start listening.
        $(this).removeClass("btn-success").addClass("btn-danger").text("Hide");
        $strawpollCreate.prop("disabled", true);
    } else if ($(this).hasClass("btn-danger")) {
        nodecg.sendMessage("strawpoll-stop", $strawpollId.val());  // Sop listening.
        $(this).removeClass("btn-danger").addClass("btn-success").text("Show");
        $strawpollCreate.prop("disabled", false);
    }
});
