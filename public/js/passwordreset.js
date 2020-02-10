$("#reset").on("click",function(e){
    e.preventDefault()
    var form = {
        email : $("#emailJ").val()
    }
    if(validateEmail(form.email)){
        $.ajax({
            type: "POST",
            data: form,
            crossDomain: true,
        }).then(function(res){
            console.log(res)
            if (res == "success") {
                var errormsg = "you have received an email with the link to reset the password";
                var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'><p class='errtext'>" + errormsg + "</p><button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true' id='spanClose'>&times;</span></button></div>"
                $("#errmsg").html(err);
            } else {
                var errormsg = res;
                var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'><p class='errtext'>" + errormsg + "</p><button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true' id='spanClose'>&times;</span></button></div>"
                $("#errmsg").html(err);}
        })
                
    }else{
        var errormsg = "you need to insert a valid email";
        var err = "<div class='alert alert-warning alert-dismissible fade show' role='alert'><p class='errtext'>" + errormsg + "</p><button type='button' class='close' data-dismiss='alert' id='closebtnerrmsg' aria-label='Close'><span aria-hidden='true' id='spanClose'>&times;</span></button></div>"
        $("#errmsg").html(err);
    }
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}