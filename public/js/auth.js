$("#register").on("click", function (e) {
    e.preventDefault();
    var form = {
        name: $("#name").val().trim(),
        email: $("#email").val().trim(),
        password: $("#password").val().trim(),
        password2: $("#password2").val().trim(),
    }

    if (!form.name || !form.email || !form.password || !form.password2) {
        var errormsg = "please fill in all the fields";
        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
        $("#errmsg").html(err);
    } else {
        if (form.password !== form.password2) {
            var errormsg = "password do not match";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else if (!validateEmail(form.email)) {
            var errormsg = "you need to insert a valid email";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else {
            $.ajax({
                type: "POST",
                data: form,
                success(data, textStatus, jqXHR) {
                    var statusCode = jqXHR.status;
                    // var statusText = jqXHR.statusText;
                    if (statusCode == 200) {
                        var errormsg = "registation was succesful";
                        var err = "<div class='alert alert-success' role='alert'>" + errormsg + "</div>"
                        $("#errmsg").html(err);
                        setTimeout(function () { location.href = "/" }, 1000)
                    } else {
                        var errormsg = "this email has been used befor use a different email";
                        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
                        $("#errmsg").html(err);
                    }

                }
            })
        }
    }
});

$("#login").on("click", function (e) {
    e.preventDefault();
    var form = {
        email: $("#emailJ").val().trim() ,
        password: $("#passwordJ").val().trim(),
    }
    console.log(form)
    if (!form.email || !form.password) {
        var errormsg = "you need to provide an Email and a password";
        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'><p class='errtext'>" + errormsg + "</p><button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true' id='spanClose'>&times;</span></button></div>"
        $("#errmsg").html(err);
    } else {
        if (!validateEmail(form.email)) {
            var errormsg = "you need to insert a valid email";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'><p class='errtext'>" + errormsg + "</p><button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true' id='spanClose'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'><p class='errtext'>" + errormsg + "</p><button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true' id='spanClose'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else {


            $.ajax({
                type: "POST",
                data: form,
                crossDomain: true,
                success(res) {
                    if (res.message == "success") {
                        location.href = "/dashboard"
                    } else {
                        var errormsg = res.message;
                        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'><p class='errtext'>" + errormsg + "</p><button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true' id='spanClose'>&times;</span></button></div>"
                        $("#errmsg").html(err);
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