import './library/jquery.js';
$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(response){
        // console.log(response);
        let temp = '';
        response.forEach((el,i) => {
            let picture = JSON.parse(el.picture);
            temp+=`<li>
            <a href="../html/goods.html?id=${el.id}">
                <div class="content">
                    <div class="thumb"><img class="lazy" data-original="../${picture[0].src}" alt=""></div>
                    <h3 class="title">${el.title}</h3>
                    <p class="desc">${el.intro}</p>
                    <p class="price"><span>${el.price}</span>元<span>起</span></p>
                </div>
            </a>
        </li>`;
        });
        $('.list-2').append(temp);
    }
});
import "../js/library/jquery.lazyload.js";
$(function(){
    $("img.lazy").lazyload({effect: "fadeIn"});
});
//秒杀倒计时 
let now = 0;
let nowh = 0;
let nowm = 0;
let nows = 0;
let xh = 0;
let xm = 0;
let xs = 0;
let h = 24;
let spans = $('.countdown span').toArray();
let time = setInterval(function(){
    // 新的小时变动
    xh = h-nowh-1>10?h-nowh-1:"0"+(h-nowh-1);
    xm = 59-nowm>=10?59-nowm:"0"+(59-nowm);
    xs = 59-nows>=10?59-nows:"0"+(59-nows);
    now = new Date();
    nowh = now.getHours();
    nowm = now.getMinutes();
    nows = now.getSeconds();
    switch(nowh){
        case 0:;
        case 1:;
        case 2: h = 2;break;
        case 3:;
        case 4:;
        case 5:;
        case 6:;
        case 7:;
        case 8:;
        case 9:;
        case 10: h = 10;break;
        case 11:;
        case 12:;
        case 13:;
        case 14: h = 14;break;
        case 15:;
        case 16:;
        case 17:;
        case 18: h = 18;break;
        case 19:;
        case 20:;
        case 21:;
        case 22:;
        case 23: h = 24;break;
    }
    spans[0].innerHTML = xh;
    spans[1].innerHTML = xm;
    spans[2].innerHTML = xs;
    $('.countdown').siblings('.field').html(h>10?h+":00场":"0"+h+":00场");
},1000);

// 二级效果

$('.header-nav').on('mouseenter',function(){
    $('.header-nav-menu').removeClass('show');
});
$('.header-nav').on('mouseleave',function(){
    $('.header-nav-menu').addClass('show');
});

$('.left-nav>ul').on('mouseenter',function(){
    $('.right-nav').removeClass('show');
});
$('.left-nav>ul').on('mouseleave',function(){
    $('.right-nav').addClass('show');
});

