$(function() {
    // 点击导航滑动效果
    $('a[href*=#]:not([href=#])').click(function() {
      console.log(this,this.hash);
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    // 输入效果
    $("#typed").typed({
        strings: [
            "JavaScript", "React", "HTML5/CSS3"
        ],
        typeSpeed: 180,
        backDelay: 600,
        contentType: "html",
        loop: !0
    })
});
