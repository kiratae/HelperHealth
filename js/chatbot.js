$().ready(function(){

    $('.chat-footer').hide()

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
})

/*
* sleep
* sleep the porcess 
* @input milliseconds
* @output -
* @author Tanaphon Kleaklom (TL)
* @Create Date 2018-10-09
*/
const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}