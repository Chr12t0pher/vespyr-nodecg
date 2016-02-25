$("#refresh-btn").click(function() {
	if (window.confirm("Are you sure?")) {
		var checked = $("input[type='checkbox']:checked").map(function () {
			nodecg.sendMessage("refresh", $(this).val());
			$(this).attr("checked", false);
		});
	}
});
