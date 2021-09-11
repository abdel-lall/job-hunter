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