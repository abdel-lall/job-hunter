$("#jobList").addClass("selected");
$("#logout").on("click", function (e) {
    e.preventDefault();
    location.href = "/logout"
})