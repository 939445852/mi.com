import './library/jquery.js';
import {cookie} from './library/cookie.js';
let id = location.search.split('=')[1];
$.ajax({
    type: "get",
    url: "../../interface/getID.php",
    data:{
        id:id
    },
    dataType:"json",
    success:function(res){
        let picture = JSON.parse(res.picture); 
        let temp = `
            <h1>${res.title}${res.intro}</h1>
            <div class=""><img src="../${picture[0].src}"></div>
            <div><span>￥：</span>${res.price}</div>
            <div>库存：${res.num}</div>
            <div class="b-num-new" id="num"><a href="javascript:;" class="subtract">-</a><input type="text" name="" id="" class="num" value="1"><a href="javascript:;" class="add">+</a></div>
            <input type="button" id="addItem" value="加入购物车"></input>
            <div>${res.details}<div>
        `;
        $('#sp').append(temp).find('#addItem').on('click',function(){
            addItem(res.id,res.price,$('.num').val());
        });
        $('.subtract').on('click',function(){
            let c = $(this).siblings('.num').val();
            c--;
            $(this).siblings('.num').val(c);
        });
        $('.add').on('click',function(){
            // 价格框
            let add = $(this).siblings('.num').val();
            add++;
            $(this).siblings('.num').val(add);
        });
    }
})
function addItem(id,price,num){
    let shop = cookie.get('shop');
    let product = {
        id:id,
        price:price,
        num:num
    }
    if(shop){
        shop = JSON.parse(shop);
        if(shop.some(el=>el.id == id)){
            shop.forEach(e=>{
                e.id == id?e.num=num:null;
            })
        }else{
            shop.push(product);
        }
    }else{
        shop = [];
        shop.push(product);
    }
    cookie.set('shop',JSON.stringify(shop),1);
}
