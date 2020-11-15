import './jquery.js';
import cookie from './cookie.js';
import { baseUrl } from './config.js';

let shop = cookie.get('shop');

if (shop) {
    shop = JSON.parse(shop);

    let idList = shop.map(elm => elm.id).join()

    // console.log(idList);


    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getItems`,
        data: {
            idList: idList
        },
        dataType: "json",
        success: function(res) {
            let num = 1;
            $('.shoping').on('click', '.red', function() {
                // alert(1)d
                $('.num').val($('.num').val() - 1);
                console.log(Number($('.num').val()));
                console.log(Number($('.unp')[0]));
                // console.log($('.unp')[0].text());
                if ($('.num').val() < 1) {
                    $('.num').val(1);
                }
                // $('.pri').text(Number($('.num').val()) * Number(($('.unp')[0]).text()));
            })
            $('.shoping').on('click', '.add', function() {
                // alert(1)
                $('.num').val(Number($('.num').val()) + 1);
                console.log($('.num').val());
                if ($('.num').val() > 999) {
                    $('.num').val(999);
                }
            })


            console.log(res)
            let template = '';

            // console.log(arr);
            res.forEach((elm, i) => {
                let arr = shop.filter(val => val.id === elm.id);
                let picture = JSON.parse(elm.pricture);
                template += ` <li class="shop-li">
                <div>
                    <input type="checkbox">
                </div>
                <div><img src=".${picture[0].src}" alt=""></div>
                <div>${elm.title}</div>
                <div class="unp"> ${elm.price.toFixed(2)}</div>
                <div>
                    <div>
                        <a class="red">-</a>
                        <input type="text" value="${arr[0].num}" min="1" max="${elm.number}" class="num">
                        <a class="add">+</a>
                    </div>
                </div>
                <div class="pri">${(elm.price*arr[0].num).toFixed(2)}元</div>
                <div>
                    <div>
                        <a class="del">
                        x
                        </a>
                    </div>
                </div>
            </li>`
                    // for (let i = 0; i < $('.pri').length; i++) {
                    //     console.log(i);
                    // }
                    // console.log($('.pri').html());
                let all = `<span class="allpri">${elm.price.toFixed(2)}</span>`;
                $('.shoping').append(template);
            });
        }
    });
}