$("#jobSearch").addClass("selected")

$("#logout").on("click", function (e) {
    e.preventDefault();
    location.href = "/logout"
})
$("#search").on("click",function(e){
    e.preventDefault()
    if($("#keyword").val() == "" || $("#location").val() == ""){
        if($("#keyword").val() == ""){
            $("#keyword").addClass('empty')
        }
        if($("#location").val() == ""){
            $("#location").addClass('empty')
        }
    }else{
        var data = {
            keyword: $("#keyword").val(),
            location: $("#location").val()
        }
        $.ajax({
            type: "POST",
            url: '/dashboard/search', 
            data: data
        }).then(function(res) { 
            var resault = res.data.SearchResult.SearchResultItems; 
            var location = res.location;
            $.map( resault, function( e ) {
                var section = `<div class="row cardRow"><div class="col-lg"><div class="card" data-id=${e.MatchedObjectId}><div class="card-body"><h5 class="card-title">${e.MatchedObjectDescriptor.PositionTitle}</h5>
                            <p class="card-text employer">${e.MatchedObjectDescriptor.OrganizationName}</p>
                                <p class="card-text location">${location}</p>
                                <p class="card-text">Description : ${e.MatchedObjectDescriptor.UserArea.Details.JobSummary}</p>
                            <a href="#" class="btn btn-outline-primary">Save</a>
                            <a href="${e.MatchedObjectDescriptor.ApplyURI[0]}" class="btn btn-outline-primary" target="_blank">Apply</a>
                        </div>
                    </div>
                </div>
            </div>`;
            $("#resSection").append(section)
              });
            console.log(res.SearchResult.SearchResultItems);
        });
    }
   
    
})