$("#login").on("click", function(e) {
    e.preventDefault();
    var form = {
        email: $("#emailJ").val().trim(),
        password: $("#passwordJ").val().trim(),
    }
    console.log(form)
    if (!form.email || !form.password) {
        var errormsg = "you need to provide an Email and a password";
        $("#errmsg").html(errormsg);
    } else {
        if (!validateEmail(form.email)) {
            var errormsg = "you need to insert a valid email";
            $("#errmsg").html(errormsg);
        } else if (form.password.length < 7) {
            var errormsg = "password should be at least 8 caracters";
            $("#errmsg").html(errormsg);
        } else {


            $.ajax({
                type: "POST",
                data: form,
                crossDomain: true,
                success(res) {
                    if (res.message == "success") {
                        location.href = "/home"
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