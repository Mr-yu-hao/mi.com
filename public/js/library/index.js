// import {get } from 'jquery';
import $ from './jquery.js'
// 购物车
// $('.block').slideUp();
$('.bth').on('mouseenter', function() {
    $('.block').stop(true, true).slideDown("slow");
    $(this).css('color', '#ff6700');
    $(this).css('background', '#fff');
});
$('.bth').on('mouseleave', function() {
    $('.block').slideUp("slow");
    $(this).css('color', '#b0b0b0');
    $(this).css('background', '#424242');
});
$('.block').on('mouseenter', function() {
    $('.bth').css('background', '#fff');
    $('.bth').css('color', '#ff6700');
});
// 列表部分
// $('.search-list-noll').slideDown("slow");
$('.search-list').on('mouseenter', function() {
    $('.search-list-noll').stop(true, true).slideDown("slow");
})
$('.search-list').on('mouseleave', function() {

    $('.search-list-noll').slideUp("slow");

})

$('.search-list>a').on('mouseenter', function() {
    $('.search-list-noll>div').eq($(this).index()).addClass('noll-top');
    $('.search-list-noll>div').eq($(this).index()).siblings().removeClass('noll-top');
})

// 轮播图列表切换
$('.nav-left-list').on('mouseenter', function() {
    $('.nav-noll').css('display', 'block');
})

$('.nav-left-list>li').on('mouseenter', function() {
    $(this).css('background', '#ff6700');
    $(this).siblings('li').css('background', 'rgba(105,101,101)')
    $(this).siblings('li').css('background-', 'rgba(105,101,101)')
    $('.nav-noll>div').eq($(this).index()).css('display', 'block');
    $('.nav-noll>div').eq($(this).index()).siblings().css('display', 'none');
})
$('.nav-left-list').on('mouseleave', function() {
    $('.nav-noll').css('display', 'none');
    $('.nav-noll>div').css('display', 'none');
    $(this).children('li').css('background', 'rgba(105,101,101)')
});
$('.nav-noll>div').on('mouseleave', function() {
    console.log(1);
    $('.nav-left-list>li').css('background', 'rgba(105,101,101)');
    console.log(1);
    console.log($('.nav-noll'));
    $('.nav-noll').css('color', 'red');
    $(this).css('display', 'none');

});
$('.nav-noll>div>ul>li').on('mouseover', function() {
    $(this).children().css('color', '#ff6700');
});
$('.nav-noll>div>ul>li').on('mouseout', function() {
    $(this).children().css('color', '#333');
});


// 回到顶部
$('.top-last').hide();
$(window).scroll(function(e) {
    if ($(window).scrollTop() > 400)

        $(".top-last").fadeIn(500);

    else

        $(".top-last").fadeOut(500);

});
$(".top-last").on('click', function() {
        $('body,html').animate({
                scrollTop: 0
            },
            500);
    })
    //倒计时
function obj() {
    var nowtime = new Date();
    var time = new Date(nowtime.getFullYear(), nowtime.getMonth(), nowtime.getDate() + 1);
    var hour = parseInt((time - nowtime) / 3600000);
    var minutes = parseInt(((time - nowtime) - (hour * 3600000)) / 60000);
    var second = parseInt(((time - nowtime) / 1000) % 60);
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    second = second < 10 ? '0' + second : second;
    $('.hour').html(hour);
    $('.minutes').html(minutes);
    $('.second').html(second);
}
obj();
setInterval(function() {
        obj()
    }, 1000)
    // 登录框&&遮罩层
$('.log').on('click', function() {
    $('#login').css('display', 'block');
    $('#cover').css('display', 'block');
})
$('#cover').on('click', function() {
    $('#login').css('display', 'none');
    $('#cover').css('display', 'none');
})
$('.login-top>li').on('mouseover', function() {
    $(this).css('color', '#ff6700');
})
$('.login-top>li').on('mouseout', function() {
    $(this).css('color', '#666');
})
$('.login-top>li').on('click', function() {
    $('#login>div').eq($(this).index()).css('display', 'block');
    $('#login>div').eq($(this).index()).siblings('div').css('display', 'none');
})

// 请求ajax

import { baseUrl } from './config.js';
$.ajax({
    type: "get",
    url: `${baseUrl}/product/getProducts`,
    dateType: "json",
    success: function(res) {
        // console.log(response);
        let tempLi = '';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.pricture);
            console.log(elm);
            tempLi += `
                <a href="./html/goods.html?id=${elm.id}">
                <li> 
                <img src="${picture[0].src}" alt="">
                <p>${elm.title}</p>
                <p class="last">${elm.exp}</p>
                <span>${elm.price}元</span>
                </li>
                </a>`;
        });
        $('.phone-right').append(tempLi);
    }

})




// import './jquery.js';
import './jquery.md5.js';
$('.button').on('click', function() {
    // alert(2)
    // console.log(2);
    // console.log($('.password').val())

    // console.log($('.login-shuru').val());
    // console.log($.md5($('.lo-password').val()));


    $.ajax({
        type: "post",
        url: "/users/login",
        data: {
            username: $('.login-shuru').val(),
            userpassword: $.md5($('.lo-password').val()),
        },

        dataType: "json",
        success: function(response) {
            console.log(response.error);
            // console.log(1)
            // if (response.error) {
            //     $('.text').html(response.msg).css('color', 'red');
            // } else {
            //     $('.text').html(response.msg).css('color', 'green');
            // }
            if (response.error) {
                $('#login').css('display', 'none');
                $('#cover').css('display', 'none');
                alert('登录成功');
            } else {
                alert('用户名或密码错误');
            }

        }
    });

})