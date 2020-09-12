define(["jquery"], function($) {
    function download() {
        $.ajax({
            url: "../data/slide.json",
            success: function(result) {
                // console.log(result)
                var slideArr = result.data.list.list;
                for (var i = 0; i < slideArr.length; i++) {
                    $(` <li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                    <a href="# " target = "_blank ">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160 " height="160 " src="${slideArr[i].img} " alt=" "/>
                            </div>
                            <h3 class = 'title'>${slideArr[i].goods_name}</h3>
                            <p class = 'desc'>${slideArr[i].desc}</p>
                            <p class = 'price'>
                                <span>折扣价：${slideArr[i].seckill_Price}</span>元
                                <del>${slideArr[i].goods_price}</del>
                            </p>
                        </div>
                    </a>
                </li>`).appendTo("#J_flashSaleList ul");
                }
            },
            error: function(msg) {
                console.log(msg);
            }


        })
    }

    function slideTab() {
        // var aspan1 = $(".swiper-flashsale-prev");
        // var aspan2 = $(".swiper-flashsale-next")
        var aspans = $(".swiper-controls").find("span");
        var iNow = 0; //下标为0开始，四张图片为一组
        var count = Math.ceil(26 / 4) - 1;


        var timer = setInterval(function() {
            iNow++;
            tab();
            if (iNow == count) {
                clearInterval(timer);
            }
        }, 4000);


        function tab() {
            iNow == 0 ? aspans.eq(0).addClass("swiper-button-disabled") : aspans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aspans.eq(1).addClass("swiper-button-disabled") : aspans.eq(1).removeClass("swiper-button-disabled");
            //两个控制左右滑动的按钮如果第一张向左设置为disable，同理向右亦然；

            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * -992;
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            })
        }
        aspans.click(function() {
            if ($(this).index() == 0) {
                iNow--;
                iNow = Math.max(0, iNow);
            } else {
                iNow++;
                iNow = Math.min(count, iNow);
            }
            tab();
        })


        $("#J_flashSaleList ").mouseenter(function() {
            clearInterval(timer);
        }).mouseleave(function() {
            var timer = setInterval(function() {
                iNow++;
                tab();
                if (iNow <= 0) {
                    iNow = count;


                }
                if (iNow >= count + 1) {
                    iNow = 0;

                }
                if (iNow == count) {
                    clearInterval(timer);
                }
            }, 4000);
        })

    }


    return {
        download: download,
        slideTab: slideTab
    }
})