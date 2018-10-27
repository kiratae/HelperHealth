$().ready(function(){

    $('.chat-footer').hide()

    $('input').data('holder', $('input').attr('placeholder'));

    $('input').focusin(function(){
        $(this).attr('placeholder', '');
    })
    $('input').focusout(function(){
        $(this).attr('placeholder', $(this).data('holder'));
    })

    $('#chat_btn').click(function(){
        if ( !$('.chat-box').hasClass('chat-box-active') ) {
            $('.chat-footer').show()
            $('.chat-box').addClass('chat-box-active')
            $(this).addClass('chat-btn-active')
            sleep(700).then(() => {
                $('.arrow').removeClass('fa-angle-up')
                $('.arrow').addClass('fa-angle-down')
            })
        } else {
            $('.chat-box').removeClass('chat-box-active')
            $(this).removeClass('chat-btn-active')
            sleep(700).then(() => {
                $('.chat-footer').hide()
                $('.arrow').addClass('fa-angle-up')
                $('.arrow').removeClass('fa-angle-down')
            })
        }
    })

    $('#chat_input').enterKey(function () {
        sendMsg()
    })

    $('#msg_send_btn').click(function () {
        sendMsg()
    })

})

function sendMsg(){
    const msg = $('#chat_input').val()
    if(msg != ''){
        const msg_item = `<li class="me">${msg}</li>`
    
        $('#chat_zone').append(msg_item)

        jump('.me:last-child')

        $('#chat_input').val('')
    }else{
        return
    }
}

/*
* sleep
* sleep the porcess 
* @input milliseconds
* @output -
* @author Tanaphon Kleaklom (TL)
* @create Date 2018-10-09
*/
const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/*
* enterKey
* detect key event
* @input -
* @output -
* @author Tanaphon Kleaklom (TL)
* @create Date 2018-10-27
*/
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

/*
* jump
* jump to target elelment
* @input target
* @output -
* @author Tanaphon Kleaklom (TL)
* @Create Date 2018-10-09
*/
function jump(target){
	$('.popup-area').animate({
          scrollTop: $(target).offset().top
	}, 0)
}