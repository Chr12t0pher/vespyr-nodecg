$("#refresh-btn").click(function() {
    var checked = $("input[type='checkbox']:checked").map(function() {
        nodecg.sendMessage("refresh", $(this).val());
        $(this).attr("checked", false);
    });
});
