var $divElem = $('<div/>', {class: "drag"});
$('body').prepend([$('<div/>', {class: "drag"}),$('<div/>', {class: "drag"}), $divElem ])

$(".drag").css({
    padding: "10px", 
    backgroundColor: "grey",
    margin: "3px",
    marginBottom: "50px",
    marginTop: "30px",
    width: "40px",    
});

$.each($('.drag'), function(index, value){    
    /*console.log("This Object Top :    ", $(this).offset.top);
    console.log("This Object Left :    ", $(this).offset.left);*/
    $(this).attr({id: index+1}).text("Div"+(index+1));    
})



var initial = {};
var final = {};
var e = {};


function handler(e, thisObj) { 
    console.log("Initial  :  ",initial.X);
    console.log("Final  :  ",final.X);
    var changeInX = final.X - initial.X;
    var changeInY = final.Y - initial.Y;
    var beforePosition = thisObj.offset();
//    console.log("#########",divOffset);
    console.log("Change X   :    ",changeInX);
    console.log("Change Y   :    ",changeInY)
    thisObj.offset({ 
        top: beforePosition.top + changeInY,
        left: beforePosition.left + changeInX
    })
}

$('.drag').bind("mousedown", function(event){   
    $(this).bind({mousemove: function(e){ 
        console.log("Final length  :  ", final);        
        initial = (!$.isEmptyObject(final)) ? final : ({X: event.clientX, Y: event.clientY});
        console.log("Final Initial combo  :    ", initial);
        final = {X: e.clientX, Y: e.clientY};
        e = e;
    handler(e, $(this))},
        mouseup: function(){
            console.log("%%%%%%%%%");
            $(this).unbind("mousemove");
        }
    });
    /*console.log("PosotionOf div :  ",$(this).position());
    console.log(event.clientX + " " + event.clientY);*/
})