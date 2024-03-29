window.onload = function () {
  dragNdrop();
  settindEdits();
};

// ==================================================drop down menu ======================================
$("#profilePicture").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  var state = $("#profilePicture").attr("data-display");
  if (state == "hidden") {
    $("#dropdownMenu").css("display", "grid");
    $("#profilePicture").attr("data-display", "visible");
    $("#toolsDD").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#toolsModal").css("display", "grid");
      settindEdits();
    });
    $("#settingsDD").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#settingModal").css("display", "grid");
      settindEdits();
    });
  }
  if (state == "visible") {
    $("#dropdownMenu").removeAttr("style");
    $("#profilePicture").attr("data-display", "hidden");
  }
});

$(document).click(function () {
  var state = $("#profilePicture").attr("data-display");
  if (state == "visible") {
    $("#dropdownMenu").removeAttr("style");
    $("#profilePicture").attr("data-display", "hidden");
  }
});
$("#closeTools").on("click", function () {
  $("#toolsModal").hide();
});
$("#closeSetting").on("click", function () {
  $("#settingModal").hide();
});

$("#addTowishlist").on("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  $("#addWishlistModal").css("display", "grid");
  $("#closeAddwishlist").on("click", () => {
    $("#addWishlistModal").removeAttr("style");
  });
  $("#SubmitWishlist").on("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    var data = {
      id: Date.now(),
      title: $("#AWpositionName")
        .val()
        .trim(),
      organisation: $("#AWcompanyName")
        .val()
        .trim(),
      location: $("#AWjobLocation")
        .val()
        .trim(),
      description: $("#AWjobdescription")
        .val()
        .trim(),
      url: validateUrl(
        $("#AWurl")
          .val()
          .trim()
      ),
      status: "wishlist",
    };
    if (!data.title) {
      $("#AWpositionName").addClass("emptyfield");
    } else if (!data.organisation) {
      $("#AWcompanyName").addClass("emptyfield");
    } else if (!data.location) {
      $("#AWjobLocation").addClass("emptyfield");
    } else if (!data.description) {
      $("#AWjobdescription").addClass("emptyfield");
    } else if (!data.url) {
      $("#AWurl").addClass("emptyfield");
    } else {
      $("#AWpositionName").val("");
      $("#AWcompanyName").val("");
      $("#AWjobLocation").val("");
      $("#AWjobdescription").val("");
      $("#AWurl").val("");
      $("#AWpositionName").removeAttr("class");
      $("#AWcompanyName").removeAttr("class");
      $("#AWjobLocation").removeAttr("class");
      $("#AWjobdescription").removeAttr("class");
      $("#AWurl").removeAttr("class");
      $.ajax({
        url: "/home/save",
        type: "POST",
        data: data,
        crossDomain: true,
        success(res) {
          if (res == "saved already") {
            alert("This job is already on the wishlist");
          } else {
            $("#loading").removeAttr("style");
            $("#wishlistSectionBody").append(res);
            dragNdrop();
            $("#addWishlistModal").removeAttr("style");
          }
        },
      });
    }
  });
});

// ===================================================extnd sections==================================================

$("#extdSearch").on("click", (e) => {
  e.preventDefault();
  if ($(window).width() > 1024) {
    if (!$("#extdSearch").attr("class")) {
      extdSectionAnimation("#searchSection", "#extdSearch");
    } else {
      compressSectionAmnimation("#searchSection", "#extdSearch");
    }
  } else {
    extdSectionAnimationVerticla("#searchSection");
  }
});
$("#extdwishlist").on("click", (e) => {
  e.preventDefault();
  if ($(window).width() > 1024) {
    if (!$("#extdwishlist").attr("class")) {
      extdSectionAnimation("#wishlistSection", "#extdwishlist");
    } else {
      compressSectionAmnimation("#wishlistSection", "#extdwishlist");
    }
  } else {
    extdSectionAnimationVerticla("#wishlistSection");
  }
});
$("#extdprogress").on("click", (e) => {
  e.preventDefault();
  if ($(window).width() > 1024) {
    if (!$("#extdprogress").attr("class")) {
      extdSectionAnimation("#applicationProgressSection", "#extdprogress");
    } else {
      compressSectionAmnimation("#applicationProgressSection", "#extdprogress");
    }
  } else {
    extdSectionAnimationVerticla("#applicationProgressSection");
  }
});
$(window).resize(function () {
  $("#searchSection").removeAttr("style");
  $("#wishlistSection").removeAttr("style");
  $("#applicationProgressSection").removeAttr("style");
});

// ===============================================application progress btns=================================
$("#application").on("click", (e) => {
  e.preventDefault();
  progressNavbar("application");
});
$("#interview").on("click", (e) => {
  e.preventDefault();
  progressNavbar("interview");
});
$("#approval").on("click", (e) => {
  e.preventDefault();
  progressNavbar("approval");
});

// ===================================================search=======================================================

$("#searchbtn").on("click", function (e) {
  e.preventDefault();
  var data = {
    keyword: $("#searchInputKW")
      .val()
      .trim(),
    location: $("#searchInputLocation")
      .val()
      .trim(),
    pageNumber: 0,
  };
  if (!data.keyword) {
    $("#searchInputKW").addClass("emptyfield");
  } else if (!data.location) {
    $("#searchInputLocation").addClass("emptyfield");
  } else {
    $("#searchInputKW").removeClass();
    $("#searchInputLocation").removeClass();
    console.log(data);
    $("#loading").css("display", "grid");
    $.ajax({
      url: "/home/search",
      type: "POST",
      data: data,
      crossDomain: true,
      success(res) {
        $("#loading").removeAttr("style");
        $("#searchSectionBody").empty();
        $("#searchSectionBody").append(res);
        dragNdrop();
        showMoreSearchResault(data);
      },
      error(error) {
        console.log(error);
        $("#loading").removeAttr("style");
        $("#searchSectionBody").append(
          `<div
            style="
              font-size: small;
              color: #68b8f6;
              font-family: mont;
              text-align: center;
              padding-top: 20px;
            "
          >Sorry, we couldn't find any results<div/>`
        );
        setTimeout(() => {
          $("#searchSectionBody").empty();
        }, 3000);
        $("#searchInputKW").val("");
        $("#searchInputLocation").val("");
      },
    });
  }
});

// ========================================================functions =============================================

function extdSectionAnimationVerticla(section) {
  console.log(section);
  if (section == "#searchSection") {
    var section1 = "#wishlistSection";
    var section2 = "#applicationProgressSection";
  } else if (section == "#wishlistSection") {
    var section1 = "#searchSection";
    var section2 = "#applicationProgressSection";
  } else if (section == "#applicationProgressSection") {
    var section1 = "#searchSection";
    var section2 = "#wishlistSection";
  }

  $(section).animate(
    {
      height: "56vh",
    },
    { duration: 1000, queue: false }
  );
  $(section1).animate(
    {
      height: "16vh",
    },
    { duration: 980, queue: false }
  );
  $(section2).animate(
    {
      height: "16vh",
    },
    { duration: 980, queue: false }
  );
}

function compressSectionAmnimation(section, btn) {
  if (section == "#searchSection") {
    var section1 = "#wishlistSection";
    var section2 = "#applicationProgressSection";
  } else if ((section = "#wishlistSection")) {
    var section1 = "#searchSection";
    var section2 = "#applicationProgressSection";
  } else if ((section = "#applicationProgressSection")) {
    var section1 = "#searchSection";
    var section2 = "#wishlistSection";
  }
  $(btn).attr("class", "");
  $(section).animate(
    {
      width: "32vw",
    },
    { duration: 1000, queue: false }
  );
  $(section1).animate(
    {
      width: "32vw",
    },
    { duration: 980, queue: false }
  );
  $(section2).animate(
    {
      width: "32vw",
    },
    { duration: 980, queue: false }
  );
  $(btn).empty();
  $(btn).html('<i class="fas fa-expand-alt">');
}

function extdSectionAnimation(section, btn) {
  if (section == "#searchSection") {
    var section1 = "#wishlistSection";
    var section2 = "#applicationProgressSection";
  } else if (section == "#wishlistSection") {
    var section1 = "#searchSection";
    var section2 = "#applicationProgressSection";
  } else if (section == "#applicationProgressSection") {
    var section1 = "#searchSection";
    var section2 = "#wishlistSection";
  }
  if (btn == "#extdSearch") {
    var btn1 = "#extdwishlist";
    var btn2 = "#extdprogress";
  } else if (btn == "#extdwishlist") {
    var btn1 = "#extdSearch";
    var btn2 = "#extdprogress";
  } else if (btn == "#extdprogress") {
    var btn1 = "#extdSearch";
    var btn2 = "#extdwishlist";
  }

  $(section).animate(
    {
      width: "48vw",
    },
    { duration: 1000, queue: false }
  );
  $(section1).animate(
    {
      width: "24vw",
    },
    { duration: 980, queue: false }
  );
  $(section2).animate(
    {
      width: "24vw",
    },
    { duration: 980, queue: false }
  );
  $(btn).empty();
  $(btn1).empty();
  $(btn2).empty();
  $(btn1).html('<i class="fas fa-expand-alt">');
  $(btn2).html('<i class="fas fa-expand-alt">');
  $(btn).html('<i class="fas fa-compress-alt"></i>');
  $(btn1).attr("class", "");
  $(btn2).attr("class", "");
  $(btn).addClass("extnd");
}

function showMoreSearchResault(data) {
  $("#showMore").on("click", function () {
    data.pageNumber = data.pageNumber + 10;
    $.ajax({
      type: "POST",
      url: "/home/search/showmore",
      data: data,
    }).then(function (res) {
      $(".showMoreCard").remove();
      $("#searchSectionBody").append(res);
      dragNdrop();
      showMoreSearchResault(data);
    });
  });
}

// ===============================================drag n drop==========================================
// ====================================================================================================

function dragNdrop() {
  // ====================================search to wishlist=================================================

  $(".searchResaultCard").draggable({
    helper: "clone",
    handler: ".searchResaultCard",
    zIndex: 100,
    start: function (event, ui) {
      $(ui.helper).width($(".searchResaultCard").width());
      if ($(window).width() < 1024) {
        extdSectionAnimationVerticla("#wishlistSection");
      }
    },
    drag: function (event, ui) {
      $(ui.helper).css("box-shadow", "0 0 4px 4px rgba(101, 181, 246, 0.35)");
    },
    stop: function (event, ui) {
      // if ($(window).width() < 1024) {
      //     $("#searchcontentrow").hide()
      // }
    },
  });

  $("#wishlistSectionBody").droppable({
    accept: ".searchResaultCard",
    tolerance: "pointer",
    over: function (event, ui) {
      $("#wishlistSectionBody").css(
        "background",
        "radial-gradient(circle, rgba(255,255,255,1) 81%, rgba(218,235,253,1) 100%)"
      );
    },
    out: function (event, ui) {
      $("#wishlistSectionBody").css("background", "none");
    },

    drop: function (event, ui) {
      var newElement = $($(ui.draggable).clone());
      $("#wishlistSectionBody").css("background", "none");
      $(newElement.children()).removeAttr("style");
      newElement.removeClass("searchResaultCard");
      newElement.removeClass().addClass("wishlistCard");
      var data = {
        id: $(newElement).data("id"),
        title: $(newElement)
          .find(".SRCpositinTitle")
          .text()
          .trim(),
        organisation: $(newElement)
          .find(".SRCcompanyName")
          .not(".fa-building")
          .text()
          .trim(),
        location: $(newElement)
          .find(".SRCpositionLocation")
          .not(".fa-map-marker-alt")
          .text()
          .trim(),
        description: $(newElement)
          .find(".SRCpositionDescription")
          .text()
          .trim(),
        url: $(newElement)
          .find(".SRCpositinTitle")
          .attr("href"),
        status: "wishlist",
      };
      $.ajax({
        url: "/home/save",
        type: "POST",
        data: data,
        crossDomain: true,
        success(res) {
          if (res == "saved already") {
            alert("This job is already on the wishlist");
          } else {
            $("#loading").removeAttr("style");
            $("#wishlistSectionBody").append(res);
            dragNdrop();
          }
        },
      });
    },
  });

  // =======================================wishlist to application ===============================================
  $(".wishlistCard").draggable({
    helper: "clone",
    handler: ".wishlistCard",
    zIndex: 100,
    start: function (event, ui) {
      $(ui.helper).width($(".wishlistCard").width());
      if ($(window).width() < 1024) {
        extdSectionAnimationVerticla("#applicationProgressSection");
      }
      progressNavbar("application");
    },
    drag: function (event, ui) {
      $(ui.helper).css("box-shadow", "0 0 4px 4px rgba(101, 181, 246, 0.35)");
    },
    stop: function (event, ui) {
      // if ($(window).width() < 1024) {
      //     $("#searchcontentrow").hide()
      // }
    },
  });

  $("#applicationBody").droppable({
    accept: ".wishlistCard",
    tolerance: "pointer",
    over: function (event, ui) {
      $("#applicationBody").css(
        "background",
        "radial-gradient(circle, rgba(255,255,255,1) 70%, rgba(218,235,253,1) 100%)"
      );
    },
    out: function (event, ui) {
      $("#applicationBody").css("background", "none");
    },

    drop: function (event, ui) {
      var newElement = $($(ui.draggable).clone());
      $("#applicationBody").css("background", "none");
      $(newElement.children()).removeAttr("style");
      newElement.removeClass().addClass("applicationCard");

      var data = {
        id: $(newElement).data("id"),
        title: $(newElement)
          .find(".WCpositinTitle")
          .text()
          .trim(),
        organisation: $(newElement)
          .find(".WCcompanyName")
          .not(".fa-building")
          .text()
          .trim(),
        location: $(newElement)
          .find(".WCpositionLocation")
          .not(".fa-map-marker-alt")
          .text()
          .trim(),
        description: $(newElement)
          .find(".WCpositionDescription")
          .text()
          .trim(),
        url: $(newElement)
          .find(".WCpositinTitle")
          .attr("href"),
        status: "application",
      };

      $.ajax({
        url: "/home/save",
        type: "POST",
        data: data,
        crossDomain: true,
        success(res) {
          if (res == "saved already") {
            alert("This job is already on Application");
          } else {
            $("#applicationBody").append(res);
            dragNdrop();
          }
        },
      });
    },
  });
}

// =============================================cards event listeners=================================

$("#searchSectionBody").on("click", function (e) {
  e.preventDefault();
  if ($(e.target).attr("class") == "SRCnext") {
    var card = $(e.target).parent();
    var data = {
      id: $(e.target).data("id"),
      title: $(card)
        .find(".SRCpositinTitle")
        .text()
        .trim(),
      organisation: $(card)
        .find(".SRCcompanyName")
        .not(".fa-building")
        .text()
        .trim(),
      location: $(card)
        .find(".SRCpositionLocation")
        .not(".fa-map-marker-alt")
        .text()
        .trim(),
      description: $(card)
        .find(".SRCpositionDescription")
        .text()
        .trim(),
      url: $(card)
        .find(".SRCpositinTitle")
        .attr("href"),
      status: "wishlist",
    };
    $.ajax({
      url: "/home/save",
      type: "POST",
      data: data,
      crossDomain: true,
      success(res) {
        if (res == "saved already") {
          alert("This job is already on the wishlist");
        } else {
          $("#loading").removeAttr("style");
          $("#wishlistSectionBody").append(res);
          dragNdrop();
        }
      },
    });
  }
});

$("#wishlistSectionBody").on("click", function (e) {
  e.preventDefault();
  if ($(e.target).attr("class") == "WCnext") {
    var card = $($(e.target).parent()).parent();
    var data = {
      id: $(card).attr("data-id"),
      title: $(card)
        .find(".WCpositinTitle")
        .text()
        .trim(),
      organisation: $(card)
        .find(".WCcompanyName")
        .not(".fa-building")
        .text()
        .trim(),
      location: $(card)
        .find(".WCpositionLocation")
        .not(".fa-map-marker-alt")
        .text()
        .trim(),
      description: $(card)
        .find(".WCpositionDescription")
        .text()
        .trim(),
      url: $(card)
        .find(".WCpositinTitle")
        .attr("href"),
      status: "application",
    };
    $.ajax({
      url: "/home/save",
      type: "POST",
      data: data,
      crossDomain: true,
      success(res) {
        if (res == "saved already") {
          alert("This job is already on application");
        } else {
          $("#applicationBody").append(res);
          dragNdrop();
        }
      },
    });
  }
  if ($(e.target).attr("class") == "WCdelete") {
    var card = $($(e.target).parent()).parent();
    var id = $(e.target).data("id");
    console.log(id);
    $.ajax({
      url: "/home/delete/" + id,
      type: "DELETE",
      crossDomain: true,
      success(res) {
        if (res == "Job deleted") {
          $(card).remove();
        } else {
          alert("Could not delete the card");
        }
      },
    });
  }
});

$("#applicationBody").on("click", function (e) {
  e.preventDefault();
  if ($(e.target).attr("class") == "Anext") {
    var card = $($(e.target).parent()).parent();
    var data = {
      id: $(e.target).data("id"),
      title: $(card)
        .find(".ApositinTitle")
        .text()
        .trim(),
      organisation: $(card)
        .find(".AcompanyName")
        .not(".fa-building")
        .text()
        .trim(),
      location: $(card)
        .find(".ApositionLocation")
        .not(".fa-map-marker-alt")
        .text()
        .trim(),
      description: $(card)
        .find(".ApositionDescription")
        .text()
        .trim(),
      url: $(card)
        .find(".ApositinTitle")
        .attr("href"),
      status: "interview",
    };
    $.ajax({
      url: "/home/save",
      type: "POST",
      data: data,
      crossDomain: true,
      success(res) {
        $(card).remove();
        $("#interviewBody").append(res);
        dragNdrop();
      },
    });
  }
  if ($(e.target).attr("class") == "Adelete") {
    var card = $($(e.target).parent()).parent();
    var id = $(e.target).data("id");
    console.log(id);
    $.ajax({
      url: "/home/delete/" + id,
      type: "DELETE",
      crossDomain: true,
      success(res) {
        if (res == "Job deleted") {
          $(card).remove();
        } else {
          alert("Could not delete the card");
        }
      },
    });
  }
});

$("#interviewBody").on("click", function (e) {
  e.preventDefault();

  if ($(e.target).attr("class") == "Inext") {
    var card = $($(e.target).parent()).parent();
    var data = {
      id: $(e.target).data("id"),
      title: $(card)
        .find(".IpositinTitle")
        .text()
        .trim(),
      organisation: $(card)
        .find(".IcompanyName")
        .not(".fa-building")
        .text()
        .trim(),
      location: $(card)
        .find(".IpositionLocation")
        .not(".fa-map-marker-alt")
        .text()
        .trim(),
      description: $(card)
        .find(".IpositionDescription")
        .text()
        .trim(),
      url: $(card)
        .find(".IpositinTitle")
        .attr("href"),
      status: "approval",
    };
    $.ajax({
      url: "/home/save",
      type: "POST",
      data: data,
      crossDomain: true,
      success(res) {
        $(card).remove();
        $("#approvalBody").append(res);
        dragNdrop();
      },
    });
  }
  if ($(e.target).attr("class") == "Idelete") {
    var card = $($(e.target).parent()).parent();
    var id = $(e.target).data("id");
    console.log(id);
    $.ajax({
      url: "/home/delete/" + id,
      type: "DELETE",
      crossDomain: true,
      success(res) {
        if (res == "Job deleted") {
          $(card).remove();
        } else {
          alert("Could not delete the card");
        }
      },
    });
  }
  if (
    $(e.target).attr("class") == "editDateTime" ||
    $(e.target).attr("class") == "editDTIcon far fa-edit"
  ) {
    console.log("click");
    var card = $($(e.target).parent()).parent();

    var data = {
      id: $(e.target).data("id"),
      time: $(card)
        .find(".meeting-time")
        .val(),
    };

    if (!data.time) {
      $(card)
        .find(".meeting-time")
        .css("border-color", "#d35757");
    } else {
      $(card)
        .find(".meeting-time")
        .css("border-color", "#64b5f6");
      $.ajax({
        url: "/mainpage/setInterviewTime",
        type: "POST",
        data: data,
        crossDomain: true,
        success(res) {
          $(card)
            .find(".meeting-time")
            .val(res);
          alert("interview date & time was set");
        },
      });
    }
  }
});

$("#approvalBody").on("click", function (e) {
  e.preventDefault();
  if ($(e.target).attr("class") == "APdelete") {
    var card = $($(e.target).parent()).parent();
    var id = $(e.target).data("id");
    console.log(id);
    $.ajax({
      url: "/home/delete/" + id,
      type: "DELETE",
      crossDomain: true,
      success(res) {
        if (res == "Job deleted") {
          $(card).remove();
        } else {
          alert("Could not delete the card");
        }
      },
    });
  }
});

function validateUrl(str) {
  var url = str;
  if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
    return url;
  } else {
    return "https://" + url;
  }
}

function settindEdits() {
  $("#imagename").change(function () {
    $("#imageuploadform").ajaxSubmit({
      data: "image",
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        $("#profilePicture").attr("src", "uploads/images/" + response);
        $("#profilePictueDD").attr("src", "uploads/images/" + response);
        $("#userProfilepicture").attr("src", "uploads/images/" + response);
      },
    });
    return false;
  });
  $("#resumename").change(function () {
    $("#resumeuploadform").ajaxSubmit({
      data: "resume",
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        $("#userResume").attr("href", "uploads/resume/" + response);
      },
    });
    return false;
  });
  $("#editUsername").on("click", function (e) {
    e.preventDefault();
    var data = {
      edit: "username",
      value: $("#settingsUsernameInput").val(),
    };
    if (!data.value) {
      $("#settingsUsernameInput").addClass("emptyfield");
    } else {
      $("#settingsUsernameInput").removeClass("emptyfield");
      ajaxForEdits(data);
    }
  });
  $("#editemail").on("click", function (e) {
    e.preventDefault();
    var data = {
      edit: "email",
      value: $("#settingsEmailInput").val(),
    };
    if (!data.value) {
      $("#settingsEmailInput").addClass("emptyfield");
    } else {
      $("#settingsEmailInput").removeClass("emptyfield");
      ajaxForEdits(data);
    }
  });
  $("#editpassword").on("click", function (e) {
    e.preventDefault();
    var data = {
      edit: "password",
      value: $("#settingsPasswordInput").val(),
    };
    if (!data.value) {
      $("#settingsPasswordInput").addClass("emptyfield");
    } else {
      $("#settingsPasswordInput").removeClass("emptyfield");
      ajaxForEdits(data);
    }
  });
  $("#linkedinSubmit").on("click", function (e) {
    e.preventDefault();
    var data = {
      edit: "linkedin",
      value: validateUrl($("#linkedinInput").val()),
    };
    if (!data.value) {
      $("#linkedinInput").addClass("emptyfield");
    } else {
      $("#linkedinInput").removeClass("emptyfield");
      ajaxForEdits(data);
    }
  });
  $("#githubSubmit").on("click", function (e) {
    e.preventDefault();
    var data = {
      edit: "github",
      value: validateUrl($("#githubInput").val()),
    };
    if (!data.value) {
      $("#githubInput").addClass("emptyfield");
    } else {
      $("#githubInput").removeClass("emptyfield");
      ajaxForEdits(data);
    }
  });
  $("#websiteSubmit").on("click", function (e) {
    e.preventDefault();
    var data = {
      edit: "website",
      value: validateUrl($("#websiteInput").val()),
    };
    if (!data.value) {
      $("#websiteInput").addClass("emptyfield");
    } else {
      $("#websiteInput").removeClass("emptyfield");
      ajaxForEdits(data);
    }
  });
}

function ajaxForEdits(data) {
  if (data) {
    $.ajax({
      type: "POST",
      url: "/mainpage/edit",
      data: data,
    }).then(function (res) {
      console.log(res);
      if (data.edit == "username") {
        $("#userUsername").text(data.value);
        $("#usernameDD").text(data.value);
      }
      if (data.edit == "email") {
        $("#userEmail").text(data.value);
      }
      if (data.edit == "password") {
        $("#msgsettingpsw").text("password changed");
        setTimeout(function () {
          $("#msgsettingpsw").text("");
        }, 1000);
      }
      if (data.edit == "linkedin") {
        $("#userLinkedin").attr("href", data.value);
        $("#userLinkedin").html(data.value);
      }
      if (data.edit == "github") {
        $("#userGithub").attr("href", data.value);
        $("#userGithub").html(data.value);
      }
      if (data.edit == "website") {
        $("#userWebsite").attr("href", data.value);
        $("#userWebsite").html(data.value);
      }
    });
  }
}

function progressNavbar(section) {
  if (section == "application") {
    $("#applicationBody").css("display", "grid");
    $("#interviewBody").css("display", "none");
    $("#approvalBody").css("display", "none");
    $("#application").css("color", "#282f39");
    $("#interview").css("color", "#64b5f6");
    $("#approval").css("color", "#64b5f6");
  }
  if (section == "interview") {
    $("#applicationBody").css("display", "none");
    $("#interviewBody").css("display", "grid");
    $("#approvalBody").css("display", "none");
    $("#application").css("color", "#64b5f6");
    $("#interview").css("color", "#282f39");
    $("#approval").css("color", "#64b5f6");
  }
  if (section == "approval") {
    $("#applicationBody").css("display", "none");
    $("#interviewBody").css("display", "none");
    $("#approvalBody").css("display", "grid");
    $("#application").css("color", "#64b5f6");
    $("#interview").css("color", "#64b5f6");
    $("#approval").css("color", "#282f39");
  }
}
