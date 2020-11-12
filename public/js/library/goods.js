import './jquery.js';

import { baseUrl } from './config.js';

let id = location.search.split('=')[1];
// console.log(baseUrl);
// console.log(id);
$.ajax({
    type: "get",
    url: `${baseUrl}/product/getItem`,
    data: { id: id },
    dataType: "json",
    success: function(res) {
        res = res[0];
        let picture = JSON.parse(res.pricture);
        // console.log(res.id);
        let template = `
        <h2><img src="../img/mi-10-11.11.jpg" alt="">${res.title}</h2>
        <p>${res.detalls}</p>
        <p class="title">小米自营</p>
        <div class="price">${res.price}元</div>
        `;

        let pay = `
        <div class="all-price">
        <li>${res.title} 8GB+256GB 陶瓷黑 <span>${res.price}元</span></li>
        <div>总计:${res.price}</div>
    </div>
        `;
        let nav = `
            <div class="body-left">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img src=".${picture[0].src}" alt="">
                    </div>
                    <div class="item">
                        <img src=".${picture[1].src}" alt="">
                    </div>
                    <div class="item">
                        <img src=".${picture[2].src}" alt="">
                    </div>
                    <div class="item">
                        <img src=".${picture[3].src}" alt="">
                    </div>
                    <div class="item">
                        <img src=".${picture[4].src}" alt="">
                    </div>
                </div>
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
            `
        $('.body-left').html(nav);
        $('.date').html(template);
        $('.all-price').html(pay);

    }
});