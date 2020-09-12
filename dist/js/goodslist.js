define([
    'jquery'
], function($) {
    function download() {
        $.ajax({
            type: "get",
            url: "../data/goodsList2.json",
            success: function(arr) {

                //加载大图商品信息
                $(` <div data-v-61428f58 class = 'section'>
               <div data-v-61428f58 class = 'components-list-box'>
                   <div data-v-a2d6c756 class="channel-product-imgText">
                       <div data-v-a2d6c756 class = 'channel-product-top'>
                           <div data-v-a2d6c756 class = 'product-cell shadow product_with_tag product_tag_1'>
                               <div data-v-a2d6c756 class = 'figure'>
                                   <a href="goodsDesc.html?product_id=${arr[0].product_id}">
                                   <img data-v-a2d6c756 style = 'background-color: rgb(178, 184, 205);' src="${arr[0].image}" alt=""/>
                                   </a>
                               </div>
                               <div data-v-a2d6c756 class = 'content'>
                                   <h3 data-v-a2d6c756 class = 'title'>
                                       <a data-v-a2d6c756 href="goodsDesc.html?product_id=${arr[0].product_id}">
                                           ${arr[0].name} 
                                       </a>
                                   </h3>
                                   <p data-v-a2d6c756 class = 'desc'> ${arr[0].desc} </p>
                                   <p data-v-a2d6c756 class = 'price'>
                                       <strong data-v-a2d6c756> ${arr[0].price} </strong>元
                                       <span data-v-a2d6c756>起</span>
                                       <del data-v-a2d6c756> ${arr[0].del} 元</del>
                                   </p>
                                   <p data-v-a2d6c756 class = 'link'>
                                       <a data-v-a2d6c756 href="#">立即购买</a>
                                   </p>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>`).appendTo(".app-body");

                for (var i = 1; i < arr.length; i++) {
                    if (i % 2 != 0) { //每两个商品创建一行
                        var row = $(`<div data-v-61428f58 class = 'section'>
                <div data-v-61428f58 class = 'components-list-box'>
                    <div data-v-45ef62b1 class = 'channel-product channel-product-two4'>
                        <div data-v-45ef62b1 class = 'row'>
                        
                       </div>
                   </div>
                        </div>
                    </div>`);
                        row.appendTo(".app-body");
                    }

                    $(` <div data-v-45ef62b1 class = 'span10 product-cell shadow'>
                       <div data-v-45ef62b1 class = 'figure'>
                           <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}" class = 'exposure'>
                               <img data-v-45ef62b1 style = 'background-color: rgb(189, 193, 217);' src="${arr[i].image}" alt=""/>
                           </a>
                       </div>
                       <h3 data-v-45ef62b1 class = 'title'>
                           <a data-v-45ef62b1 href="goodsDesc.html?product_id=${arr[i].product_id}">${arr[i].name}</a>
                       </h3>
                       <p data-v-45ef62b1 class = 'desc'> ${arr[i].desc} </p>
                       <p data-v-45ef62b1 class = 'price'>
                           <strong data-v-45ef62b1>${arr[i].price}</strong>元
                           <span data-v-45ef62b1>起</span>
                           <del data-v-45ef62b1>${arr[i].del}元</del>
                       </p>
                   </div>`).appendTo(row.find(".row"));

                }


            },
            error: function(msg) {
                console.log(msg)
            }
        })
    }



    function banner() {
        var inow = 0;
        var timer = null;
        var oDiv = $(".swiper-container .swiper-wrapper");
        var obtns = $(".swiper-container .swiper-pagination a");


        obtns.click(function() {
                inow = $(this).index();
                tab();
                return false; //阻止超链接的默认行为;

            })
            //     //添加三角块的左右图片切换效果
            // $(".swiper-container .swiper-button-prev").click(function() {
            //     inow = $(this).index();
            //     tab();
            // })


        timer = setInterval(function() {
            inow++;
            tab();

        }, 2000);


        //给轮播图添加移入移出效果
        $(".swiper-container").mouseenter(function() {
            clearInterval(timer);
        })

        $(".swiper-container").mouseleave(function() {
            timer = setInterval(function() {
                inow++;
                tab();

            }, 2000);

        })




        function tab() {
            obtns.removeClass("swiper-pagination-bullet-active").eq(inow).addClass("swiper-pagination-bullet-active");


            if (inow == obtns.size()) {
                obtns.eq(0).addClass("swiper-pagination-bullet-active");
            }
            oDiv.animate({ left: -2560 * inow }, 1000, function() {
                if (inow == obtns.size()) {
                    inow = 0;
                    oDiv.css("left", 0);
                }
            });

        }
    }


    return {
        download: download,
        banner: banner
    }
});