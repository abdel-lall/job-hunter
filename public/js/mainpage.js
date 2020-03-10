$(document).ready(function(){
    $("#settings").on("click",function(){
        $('#modalsettings').modal('show')
        $("#imagename").change(function(){

                    $("#imageuploadform").ajaxSubmit({
                        data : "image",
                        contentType: 'application/json',
                        success: function(response){
                          console.log(response);  
                          $("#navbarprofilepicture").attr("src","uploads/images/"+response)
                          $("#dropdownprofileimage").attr("src","uploads/images/"+response)
                          $("#settingsprofileimage").attr("src","uploads/images/"+response)
                              
                        }
                    });
                      return false;
                })
        $(".settingsbtns").on("click",function(){
            var data;
            if($(this).attr("id")=="editusername"){
                
                if($("#settingsusernameinput").val()==''){
                    $("#settingsusernameinput").css({"border-color":"red","border-width":"1px"})
                }else{
                    data = {
                        edit : "username",
                        value : $("#settingsusernameinput").val()
                    }
                }   
            }
            if($(this).attr("id")=="editemail"){
               

                if($("#settingsemailinput").val()=='' || !validateEmail($("#settingsemailinput").val())){
                    
                    $("#settingsemailinput").css({"border-color":"red","border-width":"1px"})
                }else{
                   
                    data = {
                        edit : "email",
                        value : $("#settingsemailinput").val()
                    }
                    
                }   
            }
            if($(this).attr("id")=="editpassword"){
                
                if($("#settingspasswordinput").val()=='' ){
                    
                    $("#settingspasswordinput").css({"border-color":"red","border-width":"1px"})
                }else{
                    
                    data = {
                    edit : "password",
                    value : $("#settingspasswordinput").val()
                }
                }  
            }
            if(data){
                $.ajax({
                    type: "POST",
                    url: "/mainpage/edit",
                    data: data
                }).then(function(res){
                    console.log(res)
                    if(data.edit == "username"){
                        $("#settingsusername").text(data.value)
                        $("#dropdownprofileusername").text(data.value)
                        
                    }
                    if(data.edit == "email"){
                        $("#settingsemail").text(data.value)
                        $("#dropdownprofileemail").text(data.value)
                    }
                    if(data.edit == "password"){
                        $("#msgsettingpsw").text("password changed")
                    }
                })
            }
            
        })
    })
    $("#huntingtools").on("click",function(){
        $('#modalhuntingtools').modal('show')
        $("#resumename").change(function(){

            $("#resumeuploadform").ajaxSubmit({
                data : "resume",
                contentType: 'application/json',
                success: function(response){
                  console.log(response);  
                  $("#huntingtoolsresume").attr("src","uploads/resume/"+response)
                      
                }
            });
              return false;
        })
$(".huntingtoolsbtns").on("click",function(){
    var data;
    if($(this).attr("id")=="linkedin"){
        
        if($("#linkedininput").val()==''){
            $("#linkedininput").css({"border-color":"red","border-width":"1px"})
        }else{
            data = {
                edit : "linkedin",
                value : $("#linkedininput").val()
            }
        }   
    }
    if($(this).attr("id")=="github"){
       

        if($("#githubinput").val()==''){
            $("#githubinput").css({"border-color":"red","border-width":"1px"})
        }else{
           
            data = {
                edit : "github",
                value : $("#githubinput").val()
            }
            
        }   
    }
    if($(this).attr("id")=="portfolio"){
        
        if($("#portfolioinput").val()=='' ){
            
            $("#portfolioinput").css({"border-color":"red","border-width":"1px"})
        }else{
            
            data = {
            edit : "portfolio",
            value : $("#portfolioinput").val()
        }
        }  
    }
    if(data){
        $.ajax({
            type: "POST",
            url: "/mainpage/edit",
            data: data
        }).then(function(res){
            console.log(res)
            if(data.edit == "linkedin"){
                $("#linkedinlink").attr("href",data.value)
                $("#linkedinlink").html(data.value)
                
            }
            if(data.edit == "github"){
                $("#githublink").attr("href",data.value)
                $("#githublink").html(data.value)
                
            }
            if(data.edit == "portfolio"){
                
                $("#portfoliolink").attr("href",data.value)
                $("#portfoliolink").html(data.value)
            }
        })
    }
    
})
    })
    setreminder()
    deleteitems()
    showmoreinfo()
    draganddrop()
//  --------------------------------------------------------------------------------------------------   

$(".enlarge").on("click",function(e){
    e.preventDefault()
  
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
    

    if( $("#"+id1).width() < $("#"+id2).width() || $("#"+id1).width() < $("#"+id3).width()){
        $(".enlarge").each(function(i, obj) {
            $(obj).removeClass("reduce")
            $(obj).empty()
            $(obj).html("<i class='fas fa-expand-alt enlargeicon' ></i>")   
        })
       
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
         showmoreinfo()
})
$("#search").on("click",function(e){
    e.preventDefault()
    var data = {
        keyword : $("#keyword").val(),
        location: $("#location").val(),
        source : $("#inputGroupSelect01").val(),
        page : 0
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
        $('#searchcontentcontainer').find('*').not('#searchjobcontainer,#searchjobcontainer *').remove();
        $("#searchcontentcontainer").append("<div id='loading' ><img src='images/loading.gif' alt='loading' id='loadinggif'></div>")
        $.ajax({
            type: "POST",
            url: "/mainpage/search",
            data: data
          }).then(function(res){
            $("#loading").remove()
            $("#searchcontentcontainer").append(res)
            showmoreinfo()
            draganddrop()
            showmoresearch(data)
            savesearcheditems()
          });
    }
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
            $("#savedjobsnavbarrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
            $("#savedcontentrow").css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')  
        },
        out: function( event, ui ) {
            $("#savedcontentrow").css('box-shadow', 'none')
            $("#savedjobsnavbarrow").css('box-shadow', 'none')
        },
         
        drop: function( event, ui ) {   
          var newele = $($(ui.draggable).clone());
            $(newele.children()).removeAttr("style")
            newele.find('.card-body').addClass("card-body-saved")
            $("#nosavedjobsmsg").remove()
            $("#savedcontentrow").css('box-shadow', 'none')
            $("#savedjobsnavbarrow").css('box-shadow', 'none')
          var data = {
            id: $(newele).find(".save").attr("data-id"),
            title : $(newele).find(".cardtitleanchor").text().trim(),
            organisation: $(newele).find(".employer").not(".fa-building").text().trim(),
            location : $(newele).find(".location").not(".fa-map-marker-alt").text().trim(),
            description : $(newele).find(".description").not(".fa-tasks").text().trim(),
            url : $(newele).find(".cardtitleanchor").attr("href"),
            status: "saved"
        }
          console.log(data)
          $.ajax({
            type: "POST",
            url: "/mainpage/save",
            data: data
          }).then(function(res){
            console.log(res)
            if(res=="saved already"){
                alert("this job is already saved")
            }else{
            $("#savedjobscontainer").append(res) 
            showmoreinfo()
            draganddrop()
            deleteitems()
        }
          })
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
      $(newele.children()).removeAttr("style")
        newele.children().removeClass("savedelements")
        newele.children().addClass("applicationelements")
        newele.removeClass("savedjobssectioncontentelement")
        newele.addClass("applicationsectioncontentelement")
        newele.find('.card-body').removeClass("card-body-saved")
        newele.find('.card-body').addClass("card-body-application")
        $(newele).find(".apply").remove(),
      $("#nosapplication").remove()
      $("#applicationprocessnavbarrow").css('box-shadow', 'none')
      $("#verticalmainrow").css('box-shadow', 'none') 
      draganddrop()
      var data = {
        id: $(newele).find(".card").attr("data-id")+"a",
        title : $(newele).find(".cardtitleanchor").text().trim(),
        organisation: $(newele).find(".employer").not(".fa-building").text().trim(),
        location : $(newele).find(".location").not(".fa-map-marker-alt").text().trim(),
        description : $(newele).find(".description").not(".fa-tasks").text().trim(),
        url : $(newele).find(".cardtitleanchor").attr("href"),
        status: "application"
    }
      $.ajax({
        type: "POST",
        url: "/mainpage/save",
        data: data
      }).then(function(res){
        console.log(res)
        if(res=="saved already"){
            alert("you already applied for this job")
        }else{
        $("#applicationsectioncontentcontainer").append(res) 

        showmoreinfo()
        draganddrop()
        deleteitems()
    }
      })
    
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
        if($('#sectioncontentrowseconde').is(":hidden")){
            var fullheight = ($("#verticalcontainer").height()-90).toString()+"px"
            $('#sectioncontentrowseconde').show()
            $('#sectioncontentrowfirst').hide()
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
        $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(4,30,59,.3)')
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
    }
  });
  
  $("#thirdsection").droppable({
    accept : ".enterviewsectioncontentelement , .applicationsectioncontentelement",
    tolerance: 'touch',
    
    over: function( event, ui ) {
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
      $(ui.draggable).remove()
      $(newele.children()).removeAttr("style")
        newele.children().removeClass("interviewelements")
        newele.children().addClass("acceptenceelements")
        newele.removeClass("enterviewsectioncontentelement")
        newele.addClass("acceptencesectioncontentelement")
       
      $("#applicationprocessnavbarrow").css('box-shadow', 'none')
      $("#verticalmainrow").css('box-shadow', 'none')
      var data = {
        id: $(newele).find(".card").attr("data-id")+"c",
        title : $(newele).find(".cardtitleanchor").text().trim(),
        organisation: $(newele).find(".employer").not(".fa-building").text().trim(),
        location : $(newele).find(".location").not(".fa-map-marker-alt").text().trim(),
        description : $(newele).find(".description").not(".fa-tasks").text().trim(),
        url : $(newele).find(".cardtitleanchor").attr("href"),
        status: "acceptence"
    }
    var id = $(ui.draggable).find(".card").attr("data-id")
      $.ajax({
        type: "POST",
        url: "/mainpage/save",
        data: data
      }).then(function(res){
        console.log(res)
        if(res=="saved already"){
            alert("you are already accepted")
        }else{
            $.ajax({
                type: "DELETE",
                url: "/mainpage/delete/"+id,
              }).then(function(res){
                $(ui.draggable).remove()
              })
        $("#noacceptence").remove()
        $("#acceptensesectioncontentcontainer").append(res) 
        
       
        if(isEmpty($("#interviewsectioncontentcontainer"))){
            $("#interviewsectioncontentcontainer").append("<p class='noresaultfnound' id='nointerv'>No interveiws scheduled</p>")
        }
        setreminder()
        showmoreinfo()
        draganddrop()
        deleteitems()
    }
      })
      
    }else{
        var newele = $($(ui.draggable).clone());
      $(newele.children()).removeAttr("style")
        newele.children().removeClass("applicationelements")
        newele.children().addClass("interviewelements")
        newele.removeClass("applicationsectioncontentelement")
        newele.addClass("enterviewsectioncontentelement")
        newele.find('.card-body').removeClass("card-body-application")
        newele.find('.card-body').addClass("card-body-interview")
      $("#applicationprocessnavbarrow").css('box-shadow', 'none')
      $("#verticalmainrow").css('box-shadow', 'none') 
      var data = {
        id: $(newele).find(".card").attr("data-id")+"b",
        title : $(newele).find(".cardtitleanchor").text().trim(),
        organisation: $(newele).find(".employer").not(".fa-building").text().trim(),
        location : $(newele).find(".location").not(".fa-map-marker-alt").text().trim(),
        description : $(newele).find(".description").not(".fa-tasks").text().trim(),
        url : $(newele).find(".cardtitleanchor").attr("href"),
        status: "interview"
    }
    var id = $(ui.draggable).find(".card").attr("data-id")
      $.ajax({
        type: "POST",
        url: "/mainpage/save",
        data: data
      }).then(function(res){
        console.log(res)
        if(res=="saved already"){
            alert("you already got an interview for this job")
        }else{
            $.ajax({
                type: "DELETE",
                url: "/mainpage/delete/"+id,
              }).then(function(res){
                $(ui.draggable).remove()
              })
        $("#nointerv").remove()
        $("#interviewsectioncontentcontainer").append(res) 
       
        if(isEmpty($("#applicationsectioncontentcontainer"))){
            $("#applicationsectioncontentcontainer").append("<p class='noresaultfnound' id='nosapplication'>No applications</p>")
        }
        setreminder()
        showmoreinfo()
        draganddrop()
        deleteitems()
    }
      })
     

    }
    
    }
   
  });



//   ------------------------------------------search-----------------------------------------------------------------
}
function showmoresearch(data){
    $('#searchshowmore').on("click",function(){
        data.page = data.page + 10
        $.ajax({
            type: "POST",
            url: "/mainpage/search/showmore",
            data: data
          }).then(function(res){
            $(".showmorerow").remove()
            $("#searchcontentcontainer").append(res)
            showmoreinfo()
            draganddrop()
            showmoresearch(data)
            savesearcheditems()
          })
    })
}  
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
function savesearcheditems(){
    $(".save").on("click",function(e){
        e.preventDefault()
        var card = $(this).parent().offsetParent()
        var data = {
            id: $(card).find(".save").attr("data-id"),
            title : $(card).find(".cardtitleanchor").text().trim(),
            organisation: $(card).find(".employer").not(".fa-building").text().trim(),
            location : $(card).find(".location").not(".fa-map-marker-alt").text().trim(),
            description : $(card).find(".description").not(".fa-tasks").text().trim(),
            url : $(card).find(".cardtitleanchor").attr("href"),
            status : "saved"
        }
        // var newele = $(card.parent().parent().parent()).html()
        
        $.ajax({
            type: "POST",
            url: "/mainpage/save",
            data: data
          }).then(function(res){
            $("#nosavedjobsmsg").remove()
            $("#savedjobscontainer").append(res)
            showmoreinfo()
            draganddrop()
            deleteitems()
          })
    })
}
function deleteitems(){
    $(".delete").on("click",function(){
        var id = $(this).attr("data-id")
       
        $.ajax({
            type: "DELETE",
            url: "/mainpage/delete/"+id,
          }).then(function(res){
            $(".sectioncontentelement").each(function(i,ele){
                if($(ele).attr("data-id") == id){
                    $(ele).remove()
                }
            })
            if(isEmpty($("#savedjobscontainer"))){
                $("#savedjobscontainer").append("<p class='noresaultfnound' id='nosavedjobsmsg'>No saved jobs</p>")
            }
            if(isEmpty($("#applicationsectioncontentcontainer"))){
                $("#applicationsectioncontentcontainer").append("<p class='noresaultfnound' id='nosapplication'>No applications</p>")
            }
            if(isEmpty($("#acceptensesectioncontentcontainer"))){
                $("#acceptensesectioncontentcontainer").append("<p class='noresaultfnound' id='noacceptence'>have not been accepted</p>")
            }
            if(isEmpty($("#interviewsectioncontentcontainer"))){
                $("#interviewsectioncontentcontainer").append("<p class='noresaultfnound' id='nointerv'>No interveiws scheduled</p>")
            }
          })
    })
}
function isEmpty( el ){
    return !$.trim(el.html())
}
function setreminder(){
    $(".setreminder").on("click",function(){
      var time =$($(this).prev()).val()
      if(time == ""){
        $($(this).prev()).css("border-color","red")
      }else{
          var data = {
              id: $(this).attr("data-id"),
              time : time
          }
          $.ajax({
            type: "POST",
            url: "/mainpage/setreminder",
            data: data
        }).then(function(res){
              $("#reminderdiv").empty()
              $("#reminderdiv").append("<p class='card-text' id='remindeeline'>You have an interview on" +res+"</p>")
          })
      }
    })
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
})

