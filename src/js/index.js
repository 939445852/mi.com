import './library/jquery.js';
// import '../js/library/jquery.lazyload.js';
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
            <a href="">
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
