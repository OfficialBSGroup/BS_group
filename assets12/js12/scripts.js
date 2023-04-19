var TxtType1 = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 8) || 2e3;
    this.txt = "";
    this.tick();
    this.isDeleting = false
};
TxtType1.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) {
        delta /= 2
    }
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500
    }
    setTimeout(function() {
        that.tick()
    }, delta)
};
window.addEventListener("load", function() {
    console.log("window onload called");
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
            new TxtType1(elements[i], JSON.parse(toRotate), period)
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 12px solid #000}";
    document.body.appendChild(css);
    $(".loader-div").hide()
});
(function($) {
    $(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
        if (!$(this).next().hasClass("show")) {
            $(this).parents(".dropdown-menu").first().find(".show").removeClass("show")
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass("show");
        $(this).parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown", function(e) {
            $(".dropdown-submenu .show").removeClass("show")
        });
        return false
    })
})(jQuery);
(function($) {
    var previousScroll = 20;
    $(window).scroll(function(e) {
        var scroll = $(window).scrollTop();
        if (scroll >= previousScroll) {
            $(".navbar").addClass("navbar-hide")
        } else if (scroll < previousScroll) {
            $(".navbar").removeClass("navbar-hide")
        }
        previousScroll = scroll
    })
})(jQuery);
$(document).ready(function() {
    var originSrc = $(".brand_img").attr("src");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 20) {
            $(".header_internal").addClass("darkHeader");
            $(".brand_img").attr("src", "assets/images/srv-logo.svg")
        } else {
            $(".header_internal").removeClass("darkHeader");
            $(".brand_img").attr("src", originSrc)
        }
        if (scroll >= 20) {
            $(".header").addClass("darkHeader");
            $(".brand_img").attr("src", "assets/images/srv-logo.svg")
        } else {
            $(".header").removeClass("darkHeader");
            $(".brand_img").attr("src", originSrc)
        }
    });
    var bannerheight = $("#homeslider").height();
    var headerheight = $(".navbar").height();
    $("#top").click(function() {
        $("html, body").animate({
            scrollTop: bannerheight - 5
        }, "slow");
        return false
    })
});
$(document).ready(function() {
    var str = location.href.toLowerCase().split("/").pop().trim();
    $(".navbar-nav .nav-item a").each(function() {
        if (this.href.toLowerCase().split("/").pop().trim() == str) {
            $(".navbar-nav .nav-item a.active").removeClass("active");
            $(this).addClass("active");
            $(this).parent("li").parent("ul").prev("a").addClass("active");
            $(this).parent("li").parent("ul").parent("li").parent("ul").prev("a").addClass("active")
        }
    })
});
$(window).on("scroll", function() {
    if ($(window).scrollTop() >= "100") {
        $("navbar").addClass("sticky-top")
    } else {
        $("navbar").removeClass("sticky-top")
    }
});
$("#Brands_carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 8e3,
    navigation: true,
    margin: 10,
    ltr: true,
    loop: true,
    dots: false,
    nav: false,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive: {
        0: {
            items: 2
        },
        576: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
});
$("#Brands_carousel1").owlCarousel({
    autoplay: true,
    autoplayTimeout: 8e3,
    navigation: true,
    margin: 10,
    ltr: true,
    loop: true,
    dots: false,
    nav: false,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 2
        },
        1e3: {
            items: 3
        },
        1200: {
            items: 3
        }
    }
});
$("#Brands_carousel2").owlCarousel({
    autoplay: true,
    autoplayTimeout: 8e3,
    navigation: true,
    margin: 10,
    ltr: true,
    loop: true,
    dots: false,
    nav: false,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 2
        },
        1e3: {
            items: 2
        },
        1200: {
            items: 2
        }
    }
});
$("#testimonials_carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 8e3,
    navigation: true,
    margin: 30,
    ltr: true,
    loop: true,
    dots: true,
    nav: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1e3: {
            items: 1
        },
        1200: {
            items: 1
        }
    }
});
var mq = window.matchMedia("(max-width: 991px)");
if (mq.matches) {} else {}
$(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
        $(".scroll").fadeIn()
    } else {
        $(".scroll").fadeOut()
    }
});
$("#scroll").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false
});
$(".collapse.show").each(function() {
    $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus")
});
$(".collapse").on("show.bs.collapse", function() {
    $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus")
}).on("hide.bs.collapse", function() {
    $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus")
});
setTimeout(function() {
    $(".recaptcha").each(function() {
        grecaptcha.render(this.id, {
            sitekey: "6LdVkwkUAAAAACeeETRX--v9Js0vWyjQOTIZxxeB",
            theme: "light"
        })
    })
}, 2e3);

function AddReadMore() {
    var carLmt = 310;
    var readMoreTxt = " ... Read More";
    var readLessTxt = " Read Less";
    $(".addReadMore").each(function() {
        if ($(this).find(".firstSec").length) return;
        var allstr = $(this).text();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore'  title='Click to Show More'>" + readMoreTxt + "</span><span class='readLess' title='Click to Show Less'>" + readLessTxt + "</span>";
            $(this).html(strtoadd)
        }
    });
    $(document).on("click", ".readMore,.readLess", function() {
        $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent")
    })
}
$(function() {
    AddReadMore()
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date;
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}
$(document).ready(function() {
    if (!getCookie("acceptCookies")) {
        setTimeout(function() {
            $("#cookieModal").modal({
                keyboard: false,
                show: true
            });
            setCookie("acceptCookies", "true", 7)
        }, 4e3)
    }
});