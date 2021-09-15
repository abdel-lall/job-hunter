// ==================================================drop down menu ======================================
$("#profilePicture").on("click", function(e) {
    e.preventDefault()
    e.stopPropagation()
    var state = $("#profilePicture").attr("data-display")
    if (state == "hidden") {
        $("#dropdownMenu").css("display", "grid")
        $("#profilePicture").attr("data-display", "visible")
        $("#toolsDD").on('click', function() {
            $("#toolsModal").css('display', 'grid')
        })
        $("#settingsDD").on('click', function() {
            $("#settingModal").css('display', 'grid')
        })
    }
    if (state == "visible") {
        $("#dropdownMenu").hide()
        $("#profilePicture").attr("data-display", "hidden")
    }
})

$(document).click(function() {
    var state = $("#profilePicture").attr("data-display")
    if (state == "visible") {
        $("#dropdownMenu").hide()
        $("#profilePicture").attr("data-display", "hidden")
    }
})
$("#closeTools").on("click", function() {
    $("#toolsModal").hide()
})
$("#closeSetting").on("click", function() {
    $("#settingModal").hide()
})

$("#addTowishlist").on('click', (e) => {
    e.preventDefault()
    $("#addWishlistModal").css('display', 'grid')
    $("#closeAddwishlist").on('click', () => {
        $("#addWishlistModal").removeAttr('style')
    })
    $("#SubmitWishlist").on('click', () => {


        var data = {
            id: Date.now(),
            title: $('#AWpositionName').val().trim(),
            organisation: $("#AWcompanyName").val().trim(),
            location: $('#AWjobLocation').val().trim(),
            description: $('#AWjobdescription').val().trim(),
            url: validateUrl($('#AWurl').val().trim()),
            status: "wishlist"
        }

        if (!data.title) {
            $('#AWpositionName').addClass('emptyfield')
        } else if (!data.organisation) {
            $("#AWcompanyName").addClass('emptyfield')
        } else if (!data.location) {
            $('#AWjobLocation').addClass('emptyfield')
        } else if (!data.description) {
            $('#AWjobdescription').addClass('emptyfield')
        } else if (!data.url) {
            $('#AWurl').addClass('emptyfield')
        } else {
            $('#AWpositionName').removeAttr('class')
            $("#AWcompanyName").removeAttr('class')
            $('#AWjobLocation').removeAttr('class')
            $('#AWjobdescription').removeAttr('class')
            $('#AWurl').removeAttr('class')
            $.ajax({
                url: "/home/save",
                type: "POST",
                data: data,
                crossDomain: true,
                success(res) {
                    if (res == 'saved already') {
                        alert('This job is already on the wishlist')
                    } else {
                        $("#loading").removeAttr('style')
                        $("#wishlistSectionBody").append(res)
                        dragNdrop()
                        cardsEventListeners()
                        $("#addWishlistModal").removeAttr('style')
                    }
                }
            })


        }


    })

})

dragNdrop()
cardsEventListeners()
    // ===================================================extnd sections==================================================




$("#extdSearch").on("click", (e) => {
    e.preventDefault()
    if ($(window).width() > 1024) {

        if (!$("#extdSearch").attr('class')) {
            extdSectionAnimation("#searchSection", "#extdSearch")
        } else {
            compressSectionAmnimation("#searchSection", "#extdSearch")
        }
    } else {
        extdSectionAnimationVerticla("#searchSection")
    }
})
$("#extdwishlist").on("click", (e) => {
    e.preventDefault()
    if ($(window).width() > 1024) {

        if (!$("#extdwishlist").attr('class')) {
            extdSectionAnimation("#wishlistSection", "#extdwishlist")
        } else {
            compressSectionAmnimation("#wishlistSection", "#extdwishlist")
        }
    } else {
        extdSectionAnimationVerticla("#wishlistSection")
    }
})
$("#extdprogress").on("click", (e) => {
    e.preventDefault()
    if ($(window).width() > 1024) {

        if (!$("#extdprogress").attr('class')) {
            extdSectionAnimation("#applicationProgressSection", "#extdprogress")
        } else {
            compressSectionAmnimation("#applicationProgressSection", "#extdprogress")
        }
    } else {
        extdSectionAnimationVerticla("#applicationProgressSection")
    }
})
$(window).resize(function() {

    $('#searchSection').removeAttr('style')
    $('#wishlistSection').removeAttr('style')
    $('#applicationProgressSection').removeAttr('style')


});




// ===============================================application progress btns=================================
$('#application').on('click', (e) => {
    e.preventDefault()
    $("#applicationBody").css('display', 'grid')
    $("#interviewBody").css('display', 'none')
    $("#approvalBody").css('display', 'none')
    $('#application').css('color', "#282f39")
    $('#interview').css('color', "#64b5f6")
    $('#approval').css('color', "#64b5f6")

})
$('#interview').on('click', (e) => {
    e.preventDefault()
    $("#applicationBody").css('display', 'none')
    $("#interviewBody").css('display', 'grid')
    $("#approvalBody").css('display', 'none')
    $('#application').css('color', "#64b5f6")
    $('#interview').css('color', "#282f39")
    $('#approval').css('color', "#64b5f6")
})
$('#approval').on('click', (e) => {
    e.preventDefault()
    $("#applicationBody").css('display', 'none')
    $("#interviewBody").css('display', 'none')
    $("#approvalBody").css('display', 'grid')
    $('#application').css('color', "#64b5f6")
    $('#interview').css('color', "#64b5f6")
    $('#approval').css('color', "#282f39")
})



// ===================================================search=======================================================


$("#searchbtn").on('click', function(e) {
    e.preventDefault();
    var data = {
        keyword: $("#searchInputKW").val().trim(),
        location: $("#searchInputLocation").val().trim(),
        page: 0,

    }
    if (!data.keyword) {
        $("#searchInputKW").addClass('emptyfield')
    } else if (!data.location) {
        $("#searchInputLocation").addClass('emptyfield')
    } else {
        $("#searchInputKW").removeClass()
        $("#searchInputLocation").removeClass()
        console.log(data)
        $("#loading").css('display', 'grid')
        $.ajax({
            url: "/home/search",
            type: "POST",
            data: data,
            crossDomain: true,
            success(res) {
                $("#loading").removeAttr('style')
                $("#searchSectionBody").append(res)
                dragNdrop()
                cardsEventListeners()
                showMoreSearchResault(data)
            }
        })
    }
})


// ========================================================functions =============================================

function extdSectionAnimationVerticla(section) {
    console.log(section)
    if (section == "#searchSection") {
        var section1 = '#wishlistSection'
        var section2 = "#applicationProgressSection"
    } else if (section == "#wishlistSection") {
        var section1 = "#searchSection"
        var section2 = "#applicationProgressSection"
    } else if (section == "#applicationProgressSection") {
        var section1 = "#searchSection"
        var section2 = "#wishlistSection"
    }

    $(section).animate({
        height: "56vh"
    }, { duration: 1000, queue: false });
    $(section1).animate({
        height: "16vh"
    }, { duration: 980, queue: false });
    $(section2).animate({
        height: "16vh"
    }, { duration: 980, queue: false });

}

function compressSectionAmnimation(section, btn) {
    if (section == "#searchSection") {
        var section1 = '#wishlistSection'
        var section2 = "#applicationProgressSection"
    } else if (section = "#wishlistSection") {
        var section1 = "#searchSection"
        var section2 = "#applicationProgressSection"
    } else if (section = "#applicationProgressSection") {
        var section1 = "#searchSection"
        var section2 = "#wishlistSection"
    }
    $(btn).attr('class', '')
    $(section).animate({
        width: "32vw"
    }, { duration: 1000, queue: false });
    $(section1).animate({
        width: "32vw"
    }, { duration: 980, queue: false });
    $(section2).animate({
        width: "32vw"
    }, { duration: 980, queue: false });
    $(btn).empty()
    $(btn).html('<i class="fas fa-expand-alt">')
}

function extdSectionAnimation(section, btn) {
    if (section == "#searchSection") {
        var section1 = '#wishlistSection'
        var section2 = "#applicationProgressSection"
    } else if (section == "#wishlistSection") {
        var section1 = "#searchSection"
        var section2 = "#applicationProgressSection"
    } else if (section == "#applicationProgressSection") {
        var section1 = "#searchSection"
        var section2 = "#wishlistSection"
    }
    if (btn == "#extdSearch") {
        var btn1 = '#extdwishlist'
        var btn2 = "#extdprogress"
    } else if (btn == "#extdwishlist") {
        var btn1 = "#extdSearch"
        var btn2 = "#extdprogress"
    } else if (btn == "#extdprogress") {
        var btn1 = "#extdSearch"
        var btn2 = "#extdwishlist"
    }

    $(section).animate({
        width: "48vw"
    }, { duration: 1000, queue: false });
    $(section1).animate({
        width: "24vw"
    }, { duration: 980, queue: false });
    $(section2).animate({
        width: "24vw"
    }, { duration: 980, queue: false });
    $(btn).empty()
    $(btn1).empty()
    $(btn2).empty()
    $(btn1).html('<i class="fas fa-expand-alt">')
    $(btn2).html('<i class="fas fa-expand-alt">')
    $(btn).html('<i class="fas fa-compress-alt"></i>')
    $(btn1).attr('class', '')
    $(btn2).attr('class', '')
    $(btn).addClass('extnd')
}

function showMoreSearchResault(data) {
    $('#showMore').on("click", function() {
        data.page = data.page + 10
        $.ajax({
            type: "POST",
            url: "/home/search/showmore",
            data: data
        }).then(function(res) {
            $(".showMoreCard").remove()
            $("#searchSectionBody").append(res)
            dragNdrop()
            showMoreSearchResault(data)

        })
    })
}

// ===============================================drag n drop==========================================
// ====================================================================================================

function dragNdrop() {
    // ====================================search to wishlist=================================================


    $(".searchResaultCard").draggable({
        helper: 'clone',
        handler: '.searchResaultCard',
        zIndex: 100,
        start: function(event, ui) {
            $(ui.helper).width($(".searchResaultCard").width())
            if ($(window).width() < 1024) {
                extdSectionAnimationVerticla("#wishlistSection")
            }
        },
        drag: function(event, ui) {
            $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(101, 181, 246, 0.35)')

        },
        stop: function(event, ui) {
            // if ($(window).width() < 1024) {
            //     $("#searchcontentrow").hide()
            // }
        }
    });

    $("#wishlistSectionBody").droppable({
        accept: ".searchResaultCard",
        tolerance: 'pointer',
        over: function(event, ui) {
            $("#wishlistSectionBody").css('background', 'radial-gradient(circle, rgba(255,255,255,1) 81%, rgba(218,235,253,1) 100%)')

        },
        out: function(event, ui) {
            $("#wishlistSectionBody").css('background', 'none')

        },

        drop: function(event, ui) {
            var newElement = $($(ui.draggable).clone());
            $("#wishlistSectionBody").css('background', 'none')
            $(newElement.children()).removeAttr("style")
            newElement.removeClass('searchResaultCard')
            newElement.removeClass().addClass('wishlistCard')
            var data = {
                id: $(newElement).data("id"),
                title: $(newElement).find(".SRCpositinTitle").text().trim(),
                organisation: $(newElement).find(".SRCcompanyName").not(".fa-building").text().trim(),
                location: $(newElement).find(".SRCpositionLocation").not(".fa-map-marker-alt").text().trim(),
                description: $(newElement).find(".SRCpositionDescription").text().trim(),
                url: $(newElement).find(".SRCpositinTitle").attr("href"),
                status: "wishlist"
            }
            $.ajax({
                url: "/home/save",
                type: "POST",
                data: data,
                crossDomain: true,
                success(res) {
                    if (res == 'saved already') {
                        alert('This job is already on the wishlist')
                    } else {
                        $("#loading").removeAttr('style')
                        $("#wishlistSectionBody").append(res)
                        dragNdrop()
                        cardsEventListeners()
                    }

                }
            })
        }

    });

    // =======================================wishlist to application ===============================================
    $(".wishlistCard").draggable({
        helper: 'clone',
        handler: '.wishlistCard',
        zIndex: 100,
        start: function(event, ui) {
            $(ui.helper).width($(".wishlistCard").width())
            if ($(window).width() < 1024) {
                extdSectionAnimationVerticla("#applicationProgressSection")
            }
        },
        drag: function(event, ui) {
            $(ui.helper).css('box-shadow', '0 0 4px 4px rgba(101, 181, 246, 0.35)')

        },
        stop: function(event, ui) {
            // if ($(window).width() < 1024) {
            //     $("#searchcontentrow").hide()
            // }
        }
    });

    $("#applicationBody").droppable({
        accept: ".wishlistCard",
        tolerance: 'pointer',
        over: function(event, ui) {
            $("#applicationBody").css('background', 'radial-gradient(circle, rgba(255,255,255,1) 70%, rgba(218,235,253,1) 100%)')

        },
        out: function(event, ui) {
            $("#applicationBody").css('background', 'none')

        },

        drop: function(event, ui) {
            var newElement = $($(ui.draggable).clone());
            $("#applicationBody").css('background', 'none')
            $(newElement.children()).removeAttr("style")
            newElement.removeClass().addClass('applicationCard')
            $("#applicationBody").append(newElement)
            dragNdrop()
                // var data = {
                //         id: $(newele).find(".save").attr("data-id"),
                //         title: $(newele).find(".cardtitleanchor").text().trim(),
                //         organisation: $(newele).find(".employer").not(".fa-building").text().trim(),
                //         location: $(newele).find(".location").not(".fa-map-marker-alt").text().trim(),
                //         description: $(newele).find(".description").not(".fa-tasks").text().trim(),
                //         url: $(newele).find(".cardtitleanchor").attr("href"),
                //         status: "saved"
                //     }
                // $.ajax({
                //     type: "POST",
                //     url: "/mainpage/save",
                //     data: data
                // }).then(function(res) {
                //     console.log(res)
                //     if (res == "saved already") {
                //         alert("this job is already saved")
                //     } else {
                //         $("#savedjobscontainer").append(res)
                //         showmoreinfo()
                //         draganddrop()
                //         deleteitems()
                //     }
                // })
        }

    });

}


// =============================================cards event listeners=================================


function cardsEventListeners() {
    $(".SRCnext").on("click", (e) => {
        e.preventDefault()
        var card = $(e.target).parent()
        var data = {
            id: $(card).data("id"),
            title: $(card).find(".SRCpositinTitle").text().trim(),
            organisation: $(card).find(".SRCcompanyName").not(".fa-building").text().trim(),
            location: $(card).find(".SRCpositionLocation").not(".fa-map-marker-alt").text().trim(),
            description: $(card).find(".SRCpositionDescription").text().trim(),
            url: $(card).find(".SRCpositinTitle").attr("href"),
            status: "wishlist"
        }
        $.ajax({
            url: "/home/save",
            type: "POST",
            data: data,
            crossDomain: true,
            success(res) {
                if (res == 'saved already') {
                    alert('This job is already on the wishlist')
                } else {
                    $("#loading").removeAttr('style')
                    $("#wishlistSectionBody").append(res)
                    dragNdrop()
                    cardsEventListeners()
                }

            }
        })
    })
    $(".WCdelete").on("click", (e) => {
        e.preventDefault()
        var card = $($(e.target).parent()).parent()
        var id = $(card).data("id")
        console.log(id)
        $.ajax({
            url: "/home/delete/" + id,
            type: "DELETE",
            crossDomain: true,
            success(res) {
                if (res == 'Job deleted') {
                    $(card).remove()
                } else {
                    alert('Could not delete the card')
                }

            }
        })
    })


    // var card = $($(e.target).parent()).parent()
    // var data = {
    //     id: $(card).data("id"),
    //     title: $(card).find(".WCpositinTitle").text().trim(),
    //     organisation: $(card).find(".WCcompanyName").not(".fa-building").text().trim(),
    //     location: $(card).find(".WCpositionLocation").not(".fa-map-marker-alt").text().trim(),
    //     description: $(card).find(".WCpositionDescription").text().trim(),
    //     url: $(card).find(".WCpositinTitle").attr("href"),
    //     status: "wishlist"
    // }

}

function validateUrl(str) {
    var url = str;
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url
    } else {
        return "https://" + url
    }
}