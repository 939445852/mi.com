import './library/jquery.js';
import {cookie} from './library/cookie.js';

let shop = cookie.get('shop');
if(shop){
    shop = JSON.parse(shop);
    let idList = shop.map(el=>el.id).join();
    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data:{
            idList
        },
        dataType:"json",
        success:function(res){
            let temp="";
            res.forEach((ev,i)=>{
                let picture = JSON.parse(ev.picture);
                let arr = shop.filter(val => val.id == ev.id);
                temp +=`
                <div class="body_box">
                <div class="b-check">
                    <i></i>
                </div>
                <div class="b-img"><img src="../${picture[0].src}" alt=""></div>
                <div class="b-name">
                    <a href="">
                        <h3 class="name">${ev.title}</h3>
                    </a>
                </div>
                <div class="b-price">${parseFloat(ev.price).toFixed(2)}</div>
                <div class="b-num">
                    <div class="b-num-new">
                        <a href="javascript:;" class="subtract">-</a>
                        <input type="text" name="" id="" class="num" value="${arr[0].num}" max=${ev.num} min=0>
                        <a href="javascript:;" class="add">+</a>
                    </div>
                </div>
                <div class="b-subtotal">${(ev.price*arr[0].num).toFixed(2)}元</div>
                <div class="b-action"><a href="javascript:;" class="del" id="${ev.id}">删</a></div>
                </div>
                `;
                $('.cart_list').html(temp);
                //删除
                $('.del').on('click',function(){
                    $(this).parent().parent().remove();
                    shop.forEach((ev,i)=>{
                        if(ev.id == parseFloat($(this).attr('id'))){
                            shop.splice(i,1);
                            cookie.set('shop',JSON.stringify(shop),1);
                        }
                    });
                    let us = 0;
                    let b = 0;//判断选中数量
                    let checks = $('.b-check').children('i').toArray();
                    checks.filter(el => {
                    if(el.innerText=="√"){
                        us += parseFloat($(el).parent().siblings('.b-subtotal').html());
                        b++;//选择数量+1
                        }else{
                            
                        }
                    })
                    // 合计
                    $('.foot_total').children('.em').html(us);

                    $('.cart_foot_left i').toArray()[0].innerHTML = $('.b-check i').length;
                    $('.cart_foot_left i').toArray()[1].innerHTML=b;
                });
            });
            // 全选
            $('.h-check').on('click',function(){
                if($('.h-check i').html()=="√"){
                    $('.h-check i').html('');
                }else{
                    $('.h-check i').html('√');
                }
                if($('.b-check i').html()=="√" || $('.b-check i').length == 0){
                    $('.h-check i').html('');
                    $('.b-check i').html('');
                }else{
                    $('.h-check i').html('√');
                    $('.b-check i').html('√');
                }
                let us = 0;
                let b = 0;//判断选中数量
                let checks = $('.b-check').children('i').toArray();
                checks.filter(el => {
                    if(el.innerText=="√"){
                    us += parseFloat($(el).parent().siblings('.b-subtotal').html());
                    b++;
                    }else{
                        
                    }
                })
                $('.cart_foot_left i').toArray()[1].innerHTML=b;
                // 合计
                $('.foot_total').children('.em').html(us);
            });
            // 单选
            $('.b-check').on('click',function(){
                if($(this).children().html()=="√"){
                    $(this).children().html('');
                    $('.h-check i').html('');
                }else{
                    $(this).children().html('√');
                    let ii = $('.b-check i').toArray();
                    let bool = ii.every(el => el.innerText=="√");
                    if(bool){
                        $('.h-check i').html('√');
                        //找到所有勾选的商品
                    }else{
                        $('.h-check i').html('');
                    }
                }
                let u = 0;
                let b = 0;//判断选中数量
                let checks = $('.b-check').children('i').toArray();
                checks.filter(el => {
                    if(el.innerText=="√"){
                    u += parseFloat($(el).parent().siblings('.b-subtotal').html());
                    b++;//选择数量+1
                    }else{
                        
                    }
                })
                $('.cart_foot_left i').toArray()[1].innerHTML=b;
                // 合计
                $('.foot_total').children('.em').html(u);
            });
            // 删除
            $('.subtract').on('click',function(){
                //数量框
                let num = $(this).siblings('.num');
                //减
                let subtract = $(this).siblings('.num').val();
                if(subtract>0){
                    subtract--;
                    if(subtract==0){
                        //数量为0时选择框为空
                        num.parent().parent().siblings('.b-check').children('i').html('');
                        //全选框也为空
                        $('.h-check i').html(' ');
                        // 直接删除商品
                        $(this).parent().parent().parent().remove();
                        // 重新计算全选
                        let qx = $('.b-check i').toArray();
                        let bool = qx.every(el => el.innerText=="√");
                        if(bool){
                            $('.h-check i').html('√');
                            //找到所有勾选的商品
                        }else{
                            $('.h-check i').html('');
                        }
                        
                        // 重新计算合计
                        let f = 0;
                        let checks = $('.b-check').children('i').toArray();
                        checks.filter(el => {
                            if(el.innerText=="√"){
                            f += parseFloat($(el).parent().siblings('.b-subtotal').html());
                            }else{
                                
                            }
                        })
                        // 合计
                        $('.foot_total').children('.em').html(f);
                    }
                }else{ 
                    
                    
                }
                // 更新数量
                num.val(subtract);
                // 小计框
                let subtotal = $(this).parent().parent().siblings('.b-subtotal');
                // 单价框
                let price = $(this).parent().parent().siblings('.b-price');
                // 计算后更新小计
                subtotal.html(parseFloat(parseFloat(price.html())*num.val()).toFixed(2)+"元");

                // 勾选框
                let check = $(this).parent().parent().siblings('.b-check').children('i');
                //判断是否选中
                let c = 0;
                if(check.html() == "√"){
                    //找到所有勾选的商品
                    let checks = $('.b-check').children('i').toArray();
                    checks.filter(el => {
                        if(el.innerText=="√"){
                           c += parseFloat($(el).parent().siblings('.b-subtotal').html());
                        }else{
                            
                        }
                    })
                    // 合计
                    $('.foot_total').children('.em').html(c);
                }


            });
            // 添加
            $('.add').on('click',function(){
                //数量框
                let num = $(this).siblings('.num');
                //添加
                let add = $(this).siblings('.num').val();
                if(add<parseFloat(num.attr('max'))){
                    add++;
                }else{
                    alert("库存不足");
                }
                // 更新数量
                num.val(add);
                 
                // 小计框
                let subtotal = $(this).parent().parent().siblings('.b-subtotal');
                // 单价框
                let price = $(this).parent().parent().siblings('.b-price');
                // 计算后更新小计
                subtotal.html(parseFloat(parseFloat(price.html())*num.val()).toFixed(2)+"元");

                // 勾选框
                let check = $(this).parent().parent().siblings('.b-check').children('i');
                //判断是否选中
                let c = 0;
                if(check.html() == "√"){
                    //找到所有勾选的商品
                    let checks = $('.b-check').children('i').toArray();
                    checks.filter(el => {
                        if(el.innerText=="√"){
                           c += parseFloat($(el).parent().siblings('.b-subtotal').html());
                        }else{
                            
                        }
                    })
                    // 合计
                    $('.foot_total').children('.em').html(c);
                }

                // // 单价
                // let price = parseFloat($(this).parent().parent().siblings('.b-price').html());
                // subtotal+=price;
                // $(this).parent().parent().siblings('.b-subtotal').html(parseFloat(subtotal).toFixed(2)+"元");
                // // 找到所有的单价
                // let ii = $('.b-check i').toArray();
                // let iis = ii.filter(el => el.innerText=="√" );
                // for(let i=0;i<iis.length;i++){
                //     hj+=parseFloat($(iis[i]).parent().siblings('.b-subtotal').html());
                    
                //     // hj+=parseFloat($(iis[i]).parent().siblings('.b-subtotal').html()).toFixed(2);
                // }
                // console.log(hj);
                // // 合计
                // $('.cart_foot_right').html(hj);
            });
            //数量框输入改变
            $('input[type="text"]').on('change',function(){
                // 小计框
                let subtotal = $(this).parent().parent().siblings('.b-subtotal');
                // 单价框
                let price = $(this).parent().parent().siblings('.b-price');
                // 计算后更新小计
                subtotal.html(parseFloat(parseFloat(price.html())*$(this).val()).toFixed(2)+"元");

                // 勾选框
                let check = $(this).parent().parent().siblings('.b-check').children('i');
                //判断是否选中
                let c = 0;
                if(check.html() == "√"){
                    //找到所有勾选的商品
                    let b = 0;//判断选中数量
                    let checks = $('.b-check').children('i').toArray();
                    checks.filter(el => {
                        if(el.innerText=="√"){
                           c += parseFloat($(el).parent().siblings('.b-subtotal').html());
                           b++;//选择数量+1
                        }else{
                            
                        }
                    })

                    $('.cart_foot_left i').toArray()[1].innerHTML=b;
                    // 合计
                    $('.foot_total').children('.em').html(c);
                }
            })
            // 商品总数
            $('.cart_foot_left i').toArray()[0].innerHTML = $('.b-check i').length;
            //购物车是否为空
            // console.log($('.b-check i'));
        }
    })
}
console.log($('.b-check i').length == 0)



