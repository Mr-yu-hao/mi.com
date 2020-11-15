import './jquery.js';

import { baseUrl } from './config.js';

import cookie from './cookie.js';

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
        let num = 0;
        $('.addcar').on('click', function() {
            num = num + 1;
            if (num > res.num) {
                num = res.num;
            }
            // $('.num').html(num);
            // console.log(num)
            // console.log($('.kind').text());
            addItem(res.id, num, Number($('.kind').text()));
            // console.log($('.num').text());
        })

    }
});

function addItem(id, num, kind) {
    // console.log(id, num);
    let shop = cookie.get('shop');
    let product = {
        id: id,
        num: num,
        kind: kind
    }
    if (shop) {
        shop = JSON.parse(shop);
        if (shop.some(elm => elm.id == id)) {
            shop.forEach((elm) => {
                elm.id === id ? elm.num = num : elm.kind = kind + 1;
            });
        } else {
            // kind = kind + 1;
            product.kind = kind + 1;
            shop.push(product);
            $('.kind').html(kind);
            console.log(1, $('.kind').text() + 1);
            // num++;
        }
    } else {
        product.kind = kind + 1;
        shop = [];
        shop.push(product);
        $('.kind').html(kind);
        console.log(product.kind);
    }
    cookie.set('shop', JSON.stringify(shop), 1);
}