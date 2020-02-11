$(document).ready(function(){
$(".enlarge").on("click",function(e){
    e.preventDefault()
    console.log($(this).attr("class"))
    var id1= $(this).data("id")
    var id2;
    var id3;
    if(id1=="firstsection"){
        id2 = "secondesection"
        id3 = "thirdsection"
    }else if(id1=="secondesection"){
        id2 = "firstsection"
        id3 = "thirdsection"
    }else{
        id2 = "secondesection"
        id3 = "firstsection"
    } 
    if($(this).attr("class") == "enlarge reduce"){
        $("#"+id1).animate({
            width: '33.33%'
         }, { duration: 980, queue: false });
         $("#"+id2).animate({
            width: '33.33%'
         }, { duration: 1000, queue: false });
         $("#"+id3).animate({
            width: '33.33%'
         }, { duration: 1000, queue: false });
         $(this).removeClass("reduce")
         $(this).empty()
         $(this).html("<i class='fas fa-expand-alt' ></i>")   
        }else{
        $("#"+id1).animate({
            width: '60%'
         }, { duration: 1000, queue: false });
         $("#"+id2).animate({
            width: '20%'
         }, { duration: 980, queue: false });
         $("#"+id3).animate({
            width: '20%'
         }, { duration: 980, queue: false });
         $(this).addClass("reduce")
           $(this).empty()
           $(this).html("<i class='fas fa-compress-alt'></i>")
        }
 
   
})
    
})

