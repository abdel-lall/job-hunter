$("#register").on("click", function(e) {
    e.preventDefault();

    var form = {
        name: $("#name").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
        password2: $("#password2").val().trim(),
    }

    if (!form.name || !form.email || !form.password || !form.password2) {
        var errormsg = "please fill in all the fields";
        $("#errmsg").html(errormsg);
    } else {
        if (form.password !== form.password2) {
            var errormsg = "password do not match";
            $("#errmsg").html(errormsg);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            $("#errmsg").html(errormsg);
        } else if (!validateEmail(form.email)) {
            var errormsg = "you need to insert a valid email";
            $("#errmsg").html(errormsg);
        } else {
            $.ajax({
                type: "POST",
                data: form,
                success(data, textStatus, jqXHR) {
                    var statusCode = jqXHR.status;
                    if (statusCode == 200) {
                        var errormsg = "You've been signed in successfully";

                        $("#errmsg").html(errormsg);
                        $("#errmsg").css('color', '#64b5f6')
                        setTimeout(function() { location.href = "/" }, 1000)
                    } else {
                        var errormsg = "You already have an account";
                        $("#errmsg").html(errormsg);
                    }

                }
            })
        }
    }
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}