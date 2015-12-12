var $input = $('#counter');

var getNum = function(){
    return $input.val().length;
}

var render = function(){
    var num = getNum();

    if($('#counter_text').length == 0){
        $input.after("<span id='counter_text'></span>");
    };

    $('#counter_text').html(num);
}

$input.on("keyup",function(){
    render();
})

render();