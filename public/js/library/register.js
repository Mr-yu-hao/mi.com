import './jquery.js';
import './jquery.md5.js';
$('.button').on('click', function() {
    // alert(2)
    // console.log(2);
    // console.log($('.password').val())
    $.ajax({
        type: "post",
        url: "/users/reg",
        data: {
            username: $('.name').val(),
            userpassword: $.md5($('.password').val())
        },

        dataType: 'json',
        success: function(response) {
            console.log(response);
            // console.log(1)
            if (response.error) {
                $('.text').html(response.msg).css('color', 'red');
            } else {
                $('.text').html(response.msg).css('color', 'green');
            }

        }
    });

})