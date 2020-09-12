define([
    "jquery", "jquery-cookie"
], function($) {
    function download() {
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function(obj) {
                // alert(obj)
                var arr = obj.data;
                for (var i = 0; i < arr.length; i++) {
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="#"> 
                                ${arr[i].name}
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="#" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`).appendTo($("#J_miRecommendBox .xm-recommend ul.row"))
                }
            },
            error: function(msg) {
                console.log(msg);
            }
        })
    }
    //通过promise处理两次按顺序加载的数据
    //加载购物车中所有的商品信息
    function loadCarData() {
        //清除上一次加载的结果
        $("#J_cartListBody .J_cartGoods").html("");
        //通过promise取得，goodsList2.json和goodsCarList.json中的数据
        new Promise(function(resolve, reject) {
            $.ajax({
                url: "../data/goodsCarList.json",
                success: function(obj) {
                    //如果下载成功，把下载到数据中的商品列表传输过去
                    resolve(obj.data);
                },
                error: function(msg) {
                    //如果下载错误，调用reject方法
                    reject(msg);
                }
            })
        }).then(function(arr1) {
            // console.log(arr1);
            //下载第二份代码
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url: "../data/goodsList2.json",
                    success: function(arr2) {
                        //将两份数据合并
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);
                    },
                    error: function(msg) {
                        reject(msg);
                    }
                })
            })
        }).then(function(arr) {

            //拿到服务器上，所有的商品数据，然后找出cookie中有的数据
            var cookieStr = $.cookie("goods");
            if (cookieStr) {
                var cookieArr = JSON.parse(cookieStr);

                var newArr = [];
                for (var i = 0; i < cookieArr.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid) {
                            arr[j].num = cookieArr[i].num;

                            //设置商品id一致
                            arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                            newArr.push(arr[j]);
                        }
                    }
                }

                // console.log(newArr)
                //通过循环将数据加载到页面上
                for (var i = 0; i < newArr.length; i++) {
                    var node = $(` <div class="item-row clearfix" id = ${newArr[i].id}> 
                        <div class="col col-check">  
                            <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                        </div> 
                        <div class="col col-img">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                            </a>  
                        </div> 
                        <div class="col col-name">  
                            <div class="tags">   
                            </div>     
                            <div class="tags">  
                            </div>   
                            <h3 class="name">  
                                <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                    ${newArr[i].name}
                                </a>  
                            </h3>        
                        </div> 
                        <div class="col col-price"> 
                            ${newArr[i].price}元 
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-num">  
                            <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                <a href="javascript:void(0)" class="J_minus">
                                    <i class="iconfont"></i>
                                </a> 
                                <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                            </div>  
                        </div> 
                        <div class="col col-total"> 
                            ${(newArr[i].price * newArr[i].num).toFixed(2)}元 
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-action"> 
                            <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                        </div> 
                    </div> `);
                    node.appendTo($("#J_cartListBody .J_cartGoods"));
                }
                isCheckAll();

            }

        })

    }




    function cartHover() {
        $("#J_miRecommendBox .xm-recommend ul").on("mouseenter", ".J_xm-recommend-list", function() {
            $(this).find(".xm-recommend-tips a").css("display", "block");
        })
        $("#J_miRecommendBox .xm-recommend ul").on("mouseleave", ".J_xm-recommend-list", function() {
            $(this).find(".xm-recommend-tips a").css("display", "none");
        })





        //点击添加购物车操作(事件委托)
        $("#J_miRecommendBox .xm-recommend ul.row").on("click", ".J_xm-recommend-list a.btn", function() {
            var id = this.id;
            // alert(id);
            var first = $.cookie("goods") == null ? true : false;

            //r如果是第一次添加
            if (first) {
                var cookieArr = [{
                    id: id,
                    num: 1
                }];
                $.cookie('goods', JSON.stringify(cookieArr), {
                    expires: 7
                })
            } else {
                var same = false;
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr); //转成数组
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        //说明之前添加过
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if (!same) {
                    var obj = {
                        id: id,
                        num: 1
                    };
                    cookieArr.push(obj);
                }
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            // alert($.cookie("goods"))
            isCheckAll();
            loadCarData();
            window.location.reload();
            return false;
        });
    }

    //全选按钮和单选按钮添加点击
    //全选按钮 和 单选按钮的点击实现
    function checkFunc() {
        $(".list-head .col-check").find("i").click(function() {
            var allChecks = $(".list-body").find(".item-row").find(".col-check i");
            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).add(allChecks).removeClass("icon-checkbox-selected");

            } else {
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            isCheckAll();
            return false;
        })


        //为每一个单独节点复选框添加点击效果
        $("#J_cartListBody .J_cartGoods").on("click", ".col-check i", function() {
            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).removeClass("icon-checkbox-selected");
            } else {
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
            return false;
        })
    }

    //判断是否都被选中
    function isCheckAll() {
        var allChecks = $(".list-body").find(".item-row");

        var isAll = true;
        var total = 0;
        var count = 0; //记录被选中的数量
        var totalCount = 0; //记录总数
        allChecks.each(function(index, item) {

            if (!$(item).find(".col-check i").hasClass("icon-checkbox-selected")) {
                isAll = false;
            } else {
                total += parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(item).find(".col-num input").val());
                count += parseInt($(item).find(".col-num input").val());
            }
            totalCount += parseInt($(item).find(".col-num input").val());


        });
        // alert(total);
        // alert(totalCount);
        // alert(count);
        //从以上知道计算没有问题，添加到页面可能出现了问题；
        //设置总价
        $("#J_cartTotalPrice").html(total.toFixed(1));
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalNum").html(totalCount);
        // $(".J_cartBox .cart-bar .section-left .cart-total ").find("#J_selTotalNum").html(count);


        // console.log($("#J_selTotalNum").html(count));

        //判断是否全选
        if (isAll) {
            $(".list-head .col-check").find("i").addClass("icon-checkbox-selected");
        } else {
            $(".list-head .col-check").find("i").removeClass("icon-checkbox-selected");
        }

    }



    //给页面上的商品添加加减按钮
    function changteCars() {
        $("#J_cartListBody .J_cartGoods").on("click", ".col-action .J_delGoods", function() {
                var id = $(this).closest(".item-row").remove().attr("id");

                // alert(id); 测试


                //删除cookie
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for (i = 0; i < cookieArr.length; i++) {
                    if (id == cookieArr[i].id) {
                        cookieArr.splice(i, 1);
                        break;
                    }
                }


                cookieArr.length == 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })

                isCheckAll();
                return false;
            }) //删除方法

        $("#J_cartListBody .J_cartGoods").on("click", ".J_minus , .J_plus", function() {
            var id = $(this).closest(".item-row").attr("id");
            // alert(id)
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    if (this.className == "J_minus") {
                        // cookieArr[i].num--;
                        cookieArr[i].num == 1 ? alert("数量只有1，不能再减少了") : cookieArr[i].num--;
                    } else {
                        cookieArr[i].num++;
                    }
                    break;
                }
            }


            $(this).siblings("input").val(cookieArr[i].num); //更新页面商品
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
            $(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1) + "元");


            //更改数据存储到cookie
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })

            isCheckAll();
            return false;
        })


    }


    return {
        download: download,
        cartHover: cartHover,
        loadCarData: loadCarData,
        checkFunc: checkFunc,
        changteCars: changteCars

    }
});