var $strawpollCreate = $("#strawpoll-create");
var $strawpollTeams = {"blue": $("#strawpoll-blue"), "red": $("#strawpoll-red")};
var $strawpollId = $("#strawpoll-id");
var $strawpollUrl = $("#strawpoll-url");
var $strawpollToggle = $("#strawpoll-toggle");

var strawpollReplicant = nodecg.Replicant("strawpoll")
	.on("change", function(oldVal, newVal) {
		$strawpollTeams["blue"].val(newVal["options"][0]);
		$strawpollTeams["red"].val(newVal["options"][1]);
		$strawpollId.val(newVal["id"]);
		$strawpollUrl.val("http://strawpoll.me/" + newVal["id"]);
		if (newVal["show"]) {
			if ($strawpollToggle.hasClass("btn-success")) {
				$strawpollToggle.removeClass("btn-success").addClass("btn-danger").text("Hide");
			}
			$strawpollCreate.prop("disabled", true);
			$strawpollToggle.prop("disabled", false);
			$strawpollTeams["blue"].prop("disabled", true);
			$strawpollTeams["red"].prop("disabled", true);
		} else {
			if ($strawpollToggle.hasClass("btn-danger")) {
				$strawpollToggle.removeClass("btn-danger").addClass("btn-success").text("Show");
			}
			$strawpollCreate.prop("disabled", false);
			$strawpollTeams["blue"].prop("disabled", false);
			$strawpollTeams["red"].prop("disabled", false);
		}
		if ($strawpollTeams["blue"].val() == newVal["options"][0] &&
			$strawpollTeams["red"].val() == newVal["options"][1] &&
			$strawpollUrl.val() == "http://strawpoll.me/" + newVal["id"] &&
			newVal["show"]) {
			$strawpollCreate.prop("disabled", true);
		} else {
			$strawpollCreate.prop("disabled", false);
		}
	});

$strawpollCreate.click(function() {
    if ($strawpollTeams["blue"].val() == "" || $strawpollTeams["red"].val() == "") { return }
    nodecg.sendMessage("strawpoll-create", [$strawpollTeams["blue"].val(), $strawpollTeams["red"].val()]);
	$strawpollToggle.prop("disabled", false);
});

$strawpollToggle.click(function() {
    if ($(this).hasClass("btn-success")) { // If poll is not showing.
        strawpollReplicant.value["show"] = true;
    } else if ($(this).hasClass("btn-danger")) {
		strawpollReplicant.value["show"] = false;
    }
});
