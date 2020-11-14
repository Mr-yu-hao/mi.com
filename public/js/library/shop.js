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
                <div> ${elm.price.toFixed(2)}</div>
                <div>
                    <div>
                        <a>-</a>
                        <input type="text" value="${arr[0].num}" min="1" max="${elm.number}">
                        <a>+</a>
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
                for (let i = 0; i < $('.pri').length; i++) {
                    console.log(i);
                }
                // console.log($('.pri').html());
                let all = `<span class="allpri">${elm.price.toFixed(2)}</span>`;
                $('.shoping').append(template);
            });
        }
    });
}