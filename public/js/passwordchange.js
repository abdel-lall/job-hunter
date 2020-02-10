$("#save").on("click", function (e) {
    e.preventDefault();
    var form = {
        password: $("#pswJ").val().trim(),
        password2: $("#pswJ1").val().trim(),
    }
// console.log(form)
    if (!form.password || !form.password2) {
        var errormsg = "please fill in all the fields";
        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
        $("#errmsg").html(err);
    } else {
        if (form.password !== form.password2) {
            var errormsg = "passwords do not match";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
            $("#errmsg").html(err);
        } else {
            var data = {
                password: form.password
            }
            $.ajax({
                type: "POST",
                data: data,
                success(data, textStatus, jqXHR) {
                    var statusCode = jqXHR.status;
                    // var statusText = jqXHR.statusText;
                    if (statusCode == 200) {
                        var errormsg = "password has been changed";
                        var err = "<div class='alert alert-success' role='alert' id='succesmessage'>" + errormsg + "</div>"
                        $("#errmsg").html(err);
                        setTimeout(function () { location.href = "/" }, 1000)
                    } else {
                        var errormsg = "an error has occured try later";
                        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" + errormsg + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
                        $("#errmsg").html(err);
                    }

                }
            })
        }
    }
});