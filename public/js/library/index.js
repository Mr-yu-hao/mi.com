import $ from './jquery.js'
// 购物车
$('.block').slideUp();
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
$('.nav-left-list>li').on('mouseover', function() {
    $('.nav-noll>div').eq($(this).index()).css('display', 'block');
})
$('.nav-left-list>li').on('mouseout', function() {
    $('.nav-noll>div').eq($(this).index()).css('display', 'none');
})