$("#submit").on("click", function(e) {
    e.preventDefault();
    var form = {
        email: $("#emailJ").val().trim(),
    }
    if (!form.email) {
        var errormsg = "Please entre an Email";
        $("#errmsg").html(errormsg);
    } else {
        if (!validateEmail(form.email)) {
            var errormsg = "Please a valid Email";
            $("#errmsg").html(errormsg);
        } else {
            $.ajax({
                type: "POST",
                data: form,
                crossDomain: true,
                success(res) {
                    if (res.message == "success") {
                        var errormsg = "A message with the link to change password has been sent to your email";
                        $("#errmsg").html(errormsg);
                    } else {
                        var errormsg = res.message;

                        $("#errmsg").html(errormsg);
                    }
                }
            })
        }
    }
})



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
