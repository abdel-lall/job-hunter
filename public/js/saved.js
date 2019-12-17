$("#jobList").addClass("selected");
$("#logout").on("click", function (e) {
    e.preventDefault();
    location.href = "/logout"
})
$(".delete").on("click",function(e){
    e.preventDefault();
    var id = $(this).data("id");
    $.ajax({
        url: '/saved/delete/'+id,
        type: 'DELETE',
        success: function(result) {
            $('#msgModal').text(result)
                        $('#modal').modal('show')
                        setTimeout(() => {
                            $('#msgModal').empty()
                            $('#modal').modal('hide')
                            location.reload();
                        },1500);
                        console.log(res)
            
        }
    })
})