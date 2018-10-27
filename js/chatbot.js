$().ready(function(){

    $('.chat-footer').hide()
    $('.popup-area').hide()

    $('input, textarea').data('holder', $('input, textarea').attr('placeholder'));

    $('input, textarea').focusin(function(){
        $(this).attr('placeholder', '');
    })
    $('input, textarea').focusout(function(){
        $(this).attr('placeholder', $(this).data('holder'));
    })

    $('#chat_btn').click(function(){
        if ( !$('.chat-box').hasClass('chat-box-active') ) {
            $('.chat-footer').show()
            $('.popup-area').show()
            $('.chat-box').addClass('chat-box-active')
            $(this).addClass('chat-btn-active')
            sleep(400).then(() => {
                $('.arrow').removeClass('fa-angle-up')
                $('.arrow').addClass('fa-angle-down')
            })
        } else {
            $('.chat-box').removeClass('chat-box-active')
            $(this).removeClass('chat-btn-active')
            sleep(400).then(() => {
                $('.chat-footer').hide()
                $('.popup-area').hide()
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

        sleep(400).then(() => replyMsg(msg))

        $('#chat_input').val('')
    }else{
        return
    }
}

function replyMsg(msg){
    if(msg != ''){
        let ans = findTheAnswer(msg)
        let msg_item = null
        console.log(jQuery.type(ans))
        if(jQuery.type(ans) == 'array'){
            ans.forEach(function(e){
                msg_item += `<li class="him">${e}</li>`
            })
        }else{
            msg_item = `<li class="him">${ans}</li>`
        }
    
        $('#chat_zone').append(msg_item)

        jump('.him:last-child')

        $('#chat_input').val('')
    }else{
        return
    }
}

function findTheAnswer(ask){

    const re_10 = new RegExp(/เจ็บหน้าอก/g);
    const re_11 = new RegExp(/เจ็บอก/g);

    const re_20 = new RegExp(/แสบร้อนกลางอก/g);
    const re_21 = new RegExp(/เรอ/g);
    const re_22 = new RegExp(/แสบอก/g);

    if(re_10.test(ask) || re_11.test(ask)){
        return 'คุณมีอาการอื่นร่วมอีกไหมคะ'
    }

    if(re_20.test(ask) || re_21.test(ask) || re_22.test(ask)){
        let data = [
            'คุณมีอาการกรดไหลย้อน',
            'เราขอแนะนำให้คุณ',
            'ควรใส่เสื้อหลวม ๆ',
            'ควรงดอาหารก่อนนอน 3 ชั่วโมง'
        ]
        return data
    }

    return 'ขออภัยค่ะ ดิฉันไม่สามารถเข้าใจได้ในตอนนี้'
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