$('.activities input').on("change",function(){
    
    if($('input[name="all"]').is(':checked')){
        if(!checkedAll){
            Total+=200;
            showHideTotal();
            checkedAll=true;
        }
    } 
    if($('input[name="all"]:checkbox'). prop("checked") != true){
        if(checkedAll){
            Total-=200;
            showHideTotal();
        }
        checkedAll=false;
    }
    
    ///////////////FRAM
    if($('input[name="js-frameworks"]').is(':checked')){
        console.log("js-frameworks");
        $('input[name="express"]').prop("disabled",true);
        $('input[name="express"]').parent().addClass("disabled");
        Total+=100;
        showHideTotal();
        checked=true;
    }
    if($('input[name="js-frameworks"]:checkbox'). prop("checked") != true){
        if(checked){
            $('input[name="express"]').prop("disabled",false);
            $('input[name="express"]').parent().removeClass("disabled");
            Total-=100;
            showHideTotal();
        }
        checked=false;
    }
    
    
    
    /////////////LIB
    
    
    if($('input[name="js-libs"]').is(':checked')){
        console.log("js-libs");
        $('input[name="node"]').prop("disabled",true);
        $('input[name="node"]').parent().addClass("disabled");
        checkedLib=true;
    }
    if($('input[name="js-libs"]:checkbox'). prop("checked") != true){
        if(checkedLib){
            $('input[name="node"]').prop("disabled",false);
            $('input[name="node"]').parent().removeClass("disabled");
        }
        checkedLib=false;
    }
    
    
    
    /////////////EXP
    if($('input[name="express"]').is(':checked')){
        $('input[name="js-frameworks"]').prop("disabled",true);
        $('input[name="js-frameworks"]').parent().addClass("disabled");
        checkedExp=true;
    } 
    if($('input[name="express"]:checkbox'). prop("checked") != true){
        if(checkedExp){
            $('input[name="js-frameworks"]').prop("disabled",false);
            $('input[name="js-frameworks"]').parent().removeClass("disabled");
        }
        checkedExp=false;
    }
    
    
    ///////////////NODE
    if($('input[name="node"]').is(':checked')){
        console.log("node");
        $('input[name="js-libs"]').prop("disabled",true);
        $('input[name="js-libs"]').parent().addClass("disabled");
        checkedNode=true;
    } 
    if($('input[name="node"]'). prop("checked") != true){
        if(checkedNode){
            $('input[name="js-libs"]').prop("disabled",false);
            $('input[name="js-libs"]').parent().removeClass("disabled");
        }
        checkedNode=false;
    }
    
    if($('input[name="build-tools"]').is(':checked')){
        console.log("build-tools");
    } 
    if($('input[name="npm"]').is(':checked')){
        console.log("npm");
    }
});