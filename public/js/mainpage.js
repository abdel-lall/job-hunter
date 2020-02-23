$(document).ready(function(){


    // -------------------------description show more ----------------------------------------
function showmoreinfo(){
    $('.card').each(function(i, obj) {
        if($(obj).find(".description").height() > 25){
            $(obj).find(".description").css("height","25px")
            $(obj).find(".description").css("overflow","hidden")
            $(obj).find(".showmoredescriton").show()
            $(obj).find(".showmoredescriton").on("click",function(){
                $(obj).find(".showmoredescriton").hide()
                $(obj).find(".description").css("height","fit-content")
            })
        }
        if($(obj).find(".location").height() > 25){
            $(obj).find(".location").css("height","25px")
            $(obj).find(".location").css("overflow","hidden")
            $(obj).find(".showmorelocation").show()
            $(obj).find(".showmorelocation").on("click",function(){
                $(obj).find(".showmorelocation").hide()
                $(obj).find(".location").css("height","fit-content")
            })
        }
    });
}  



//  --------------------------------------------------------------------------------------------------   

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
         $(this).html("<i class='fas fa-expand-alt enlargeicon' ></i>")   
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
           $(this).html("<i class='fas fa-compress-alt reduceicon'></i>")
        }
 
   
})
$(".grow").on("click",function(e){
    e.preventDefault()
    var id1= $(this).data("id")
    var id2;
    var id3;
    var content1;
    var content2;
    var content3;
    if(id1=="firstVS"){
        id2 = "secondeVS"
        id3 = "thirdVS"
        content1 = "#sectioncontentrowfirst"
        content2 = "#sectioncontentrowseconde"
        content3 = "#sectioncontentrowthird"
    }else if(id1=="secondeVS"){
        id2 = "firstVS"
        id3 = "thirdVS"
        content1 = "#sectioncontentrowseconde"
        content2 = "#sectioncontentrowfirst"
        content3 = "#sectioncontentrowthird"
    }else{
        id2 = "secondeVS"
        id3 = "firstVS"
        content1 = "#sectioncontentrowthird"
        content2 = "#sectioncontentrowseconde"
        content3 = "#sectioncontentrowfirst"
    } 

    var fullheight = ($("#verticalcontainer").height()-90).toString()+"px"
        $(content1).show()
        $(content2).hide()
        $(content3).hide()
        $("#"+id1).animate({
            height: fullheight
         }, { duration: 1000, queue: false });
         $("#"+id2).animate({
            height: "45px"
         }, { duration: 980, queue: false });
         $("#"+id3).animate({
            height: "45px"
         }, { duration: 980, queue: false });
   
})
function draganddrop(){
// ----------------------------search to save ---------------------------------------------------
    $( ".searchsectioncontentelement" ).draggable({
        helper: 'clone',
        handler : '.card-body',
        start: function( event, ui ) {
            $( ui.helper ).width($( ".searchsectioncontentelement" ).width())
        },
        drag: function(event, ui){
            $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
        }
      });
      
      $("#savedjobscontainer" ).droppable({
        accept : ".searchsectioncontentelement",
        tolerance: 'pointer',
        over: function( event, ui ) {
            console.log("init")
            $("#savedjobsnavbarrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
            $("#savedcontentrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')  
        },
        out: function( event, ui ) {
            $("#savedcontentrow").css('box-shadow', 'none')
            $("#savedjobsnavbarrow").css('box-shadow', 'none')
        },
         
        drop: function( event, ui ) {   
          var newele = $($(ui.draggable).clone());
        //   $('.card-body').addClass("card-body-saved")
          $(newele.children()).removeAttr("style")
            newele.children().removeClass("searchelements")
            newele.children().addClass("savedjobselements")
            newele.removeClass("searchsectioncontentelement")
            newele.addClass("savedjobssectioncontentelement")
            newele.find('.card-body').addClass("card-body-saved")
          console.log(newele)
          newele.appendTo("#savedjobscontainer")
          $("#savedcontentrow").css('box-shadow', 'none')
          $("#savedjobsnavbarrow").css('box-shadow', 'none')
          $( ".savedjobssectioncontentelement" ).draggable({
            helper: 'clone',
            handler : '.card-body-saved',
            start: function( event, ui ) {
                $( ui.helper ).width($( ".savedjobssectioncontentelement" ).width())
            },
            drag: function(event, ui){
                console.log($( ".savedjobssectioncontentelement" ).width())
                $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
            }
          });
        }
       
      });
// ----------------------------------------------------------------------------------------------------
// ------------------------------------saved to application ----------------------------------------------

$( ".savedjobssectioncontentelement" ).draggable({
    helper: 'clone',
    handler : '.card-body-saved',
    start: function( event, ui ) {
        $( ui.helper ).width($( ".savedjobssectioncontentelement" ).width())
    },
    drag: function(event, ui){
        console.log($( ".savedjobssectioncontentelement" ).width())
        $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
    }
  });
  
  $( "#firstVS").droppable({
    accept : ".savedjobssectioncontentelement",
    tolerance: 'touch',
    over: function( event, ui ) {
        
        if($('#sectioncontentrowfirst').is(":hidden")){
            
            var fullheight = ($("#verticalcontainer").height()-90).toString()+"px"
            $('#sectioncontentrowfirst').show()
            $("#sectioncontentrowseconde").hide()
            $("#sectioncontentrowthird").hide()
            $("#firstVS").animate({
            height: fullheight
             }, { duration: 1000, queue: false });
            $("#secondeVS").animate({
            height: "45px"
            }, { duration: 980, queue: false });
             $("#thirdVS").animate({
            height: "45px"
             }, { duration: 980, queue: false });
            
        }
        $("#applicationprocessnavbarrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
        $("#verticalmainrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)') 

    },
    out: function( event, ui ) {
        $("#applicationprocessnavbarrow").css('box-shadow', 'none')
        $("#verticalmainrow").css('box-shadow', 'none') 
        
    },
     
    drop: function( event, ui ) {   
      var newele = $($(ui.draggable).clone());
      $(ui.draggable).remove()
      $(newele.children()).removeAttr("style")
        newele.children().removeClass("savedjobselements")
        newele.children().addClass("applicationelements")
        newele.removeClass("savedjobssectioncontentelement")
        newele.addClass("applicationsectioncontentelement")
        newele.find('.card-body').removeClass("card-body-saved")
        newele.find('.card-body').addClass("card-body-application")
      console.log(newele)
      newele.appendTo("#applicationsectioncontentcontainer")
      $("#applicationprocessnavbarrow").css('box-shadow', 'none')
      $("#verticalmainrow").css('box-shadow', 'none') 
      $( ".applicationsectioncontentelement" ).draggable({
        helper: 'clone',
        handler : '.card-body-application',
        revert: 'invalid',
        appendTo: 'body',
        start: function( event, ui ) {
            $( ui.helper ).width($( ".applicationsectioncontentelement" ).width())
        },
        drag: function(event, ui){
            $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
        }
            
        
      });
    }
   
  });

//   --------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------application to interview ---------------------------------------------

$( ".applicationsectioncontentelement" ).draggable({
    helper: 'clone',
    handler : '.card-body-application',
    revert: 'invalid',
    appendTo: 'body',
    start: function( event, ui ) {
        $( ui.helper ).width($( ".applicationsectioncontentelement" ).width())
    },
    drag: function(event, ui){
        $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
    }
        
    
  });
//   --------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------- interview to acceptence---------------------------------------------

$( ".enterviewsectioncontentelement" ).draggable({
    helper: 'clone',
    handler : '.card-body-interview',
    revert: 'invalid',
    appendTo: 'body',
    start: function( event, ui ) {
        $( ui.helper ).width($( ".enterviewsectioncontentelement" ).width())
    },
    drag: function(event, ui){
        console.log($( ".savedjobssectioncontentelement" ).width())

        $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
    }
  });
  
  $("#verticalmainrow").droppable({
    accept : ".enterviewsectioncontentelement , .applicationsectioncontentelement",
    tolerance: 'touch',
    
    over: function( event, ui ) {
        var classes = $(ui.helper).attr("class");
        if (classes.indexOf("enterviewsectioncontentelement") >= 0){
            if($('#sectioncontentrowthird').is(":hidden")){
                var fullheight = ($("#verticalcontainer").height()-90).toString()+"px"
                $("#sectioncontentrowthird").show()
                $('#sectioncontentrowfirst').hide()
                $('#sectioncontentrowseconde').hide()
                $("#thirdVS").animate({
                height: fullheight
                 }, { duration: 1000, queue: false });
                $("#firstVS").animate({
                height: "45px"
                }, { duration: 980, queue: false });
                 $("#secondeVS").animate({
                height: "45px"
                 }, { duration: 980, queue: false });
                
            }
        }else{
            if($('#sectioncontentrowseconde').is(":hidden")){
                            var fullheight = ($("#verticalcontainer").height()-90).toString()+"px"
                            $('#sectioncontentrowseconde').show()
                            $('#sectioncontentrowfirst').hide()
                            $(ui.helper)
                            $("#sectioncontentrowthird").hide()
                            $("#secondeVS").animate({
                            height: fullheight
                             }, { duration: 1000, queue: false });
                            $("#firstVS").animate({
                            height: "45px"
                            }, { duration: 980, queue: false });
                             $("#thirdVS").animate({
                            height: "45px"
                             }, { duration: 980, queue: false });
                            
                        }  
        }
        
        $("#applicationprocessnavbarrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
        $("#verticalmainrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)') 

    },
    out: function( event, ui ) {
        $("#applicationprocessnavbarrow").css('box-shadow', 'none')
        $("#verticalmainrow").css('box-shadow', 'none') 
        
    },
     
    drop: function( event, ui ) {   
        
        var classes = $(ui.draggable).attr("class");
        // enterviewsectioncontentelement
        
    if (classes.indexOf("enterviewsectioncontentelement") >= 0){
      var newele = $($(ui.draggable).clone());
      $(newele.children()).removeAttr("style")
        newele.children().removeClass("interviewelements")
        newele.children().addClass("acceptenceelements")
        newele.removeClass("enterviewsectioncontentelement")
        newele.addClass("acceptencesectioncontentelement")
        
      console.log(newele)
      newele.appendTo("#acceptensesectioncontentcontainer")
      $("#applicationprocessnavbarrow").css('box-shadow', 'none')
      $("#verticalmainrow").css('box-shadow', 'none')
      
    }else{
        var newele = $($(ui.draggable).clone());
      $(newele.children()).removeAttr("style")
        newele.children().removeClass("applicationelements")
        newele.children().addClass("interviewelements")
        newele.removeClass("applicationsectioncontentelement")
        newele.addClass("enterviewsectioncontentelement")
        newele.find('.card-body').removeClass("card-body-application")
        newele.find('.card-body').addClass("card-body-interview")
      console.log(newele)
      newele.appendTo("#interviewsectioncontentcontainer")
      $("#applicationprocessnavbarrow").css('box-shadow', 'none')
      $("#verticalmainrow").css('box-shadow', 'none') 
    }
    $( ".enterviewsectioncontentelement" ).draggable({
        helper: 'clone',
        handler : '.card-body-interview',
        revert: 'invalid',
        appendTo: 'body',
        start: function( event, ui ) {
            $( ui.helper ).width($( ".enterviewsectioncontentelement" ).width())
        },
        drag: function(event, ui){
            console.log($( ".savedjobssectioncontentelement" ).width())
    
            $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
        }
      });
    }
   
  });



//   ------------------------------------------search-----------------------------------------------------------------
}
$("#search").on("click",function(e){
    e.preventDefault()
    var data = {
        keyword : $("#keyword").val(),
        location: $("#location").val(),
        source : $("#inputGroupSelect01").val()
    }
    if(data.keyword == "" || data.location == ""){
    if(data.keyword == ""){
        $("#keyword").attr("placeholder", "add a keyword");
        $("#keyword").addClass("missing")
    }
    if( data.location == ""){
        
        
        $("#location").attr("placeholder", "add a location");
        $("#location").addClass("missing")
    }
    }else{
        $.ajax({
            type: "POST",
            url: "/mainpage/search",
            data: data
          }).then(function(res){
            $('#searchcontentcontainer').find('*').not('#searchjobcontainer,#searchjobcontainer *').remove();
            $("#searchcontentcontainer").append(res)
            showmoreinfo()
            draganddrop()
          });
    }
})
      
})

