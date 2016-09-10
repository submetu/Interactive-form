var checkedAll=false;
var checkedFram=false;
var checkedExp=false;
var checkedLib=false;
var checkedNode=false;
var checkedBuilTools=false;
var checkedNpm=false;
var Total=0;

var activityData1=[];
var activityData2=[];
var activityData3=[];
var activityData4=[];
var activityData5=[];
var activityData6=[];
var activityData7=[];

var activityString1=$('.activities label').eq(0).text();
var activityString2=$('.activities label').eq(1).text();
var activityString3=$('.activities label').eq(2).text();
var activityString4=$('.activities label').eq(3).text();
var activityString5=$('.activities label').eq(4).text();
var activityString6=$('.activities label').eq(5).text();
var activityString7=$('.activities label').eq(6).text();

var toBeDisabled=[]; //array that holds the checkboxes that need to be disabled

//extracts activity data and returns it in the form of an array
function getActivityData(datestring){
    if (datestring.indexOf(',') > -1){ //if there is a comma in the datestring then proceed
        var time = datestring.split(',')[0];
        var dayTemporary=time.split(' — ')[1];
        var sp = time.match(/\d+/g)
        var day=dayTemporary.split(' ')[0];
        var firstTime=parseInt(sp[0]);
        var secondTime=parseInt(sp[1]);
        if(firstTime>=1 && firstTime<=5){
             firstTime+=12;
        }
        if(secondTime>=1 && secondTime<=5){
            secondTime+=12;
        }
        var activityData=[];
        activityData.push(day,firstTime,secondTime);
        return activityData;
    }
}

//Fills activityData array with the extracted activity data
function fillerFunc(ref,toBeFilledarray,fillerArray){
    if(fillerArray){ //if the filler array is not empty then proceed. Filler array is empty when there is no comma in the datestring above
        for(var i=0;i<fillerArray.length;i++){
            toBeFilledarray[i]=fillerArray[i];
        }
        toBeFilledarray.unshift(ref);
    }
}
// filling the different activityData arrays with activity data such as day, starting time, ending time and reference number
fillerFunc(1,activityData1,getActivityData(activityString1));
fillerFunc(2,activityData2,getActivityData(activityString2));
fillerFunc(3,activityData3,getActivityData(activityString3));
fillerFunc(4,activityData4,getActivityData(activityString4));
fillerFunc(5,activityData5,getActivityData(activityString5));
fillerFunc(6,activityData6,getActivityData(activityString6));
fillerFunc(7,activityData7,getActivityData(activityString7));


//function that checks other activities that clash with the passed 'data' array activity
function onClickChecker(data){
    if(data[0]!==activityData1[0]){ //if they are not the same arrays by comparing reference numbers
            //check if they have the same day, starting time and ending time
            if(data[1]===activityData1[1] && data[2]===activityData1[2] && data[3]===activityData1[3]){
                toBeDisabled.push(0);
            }
    }
    if(data[0]!==activityData2[0]){ //if they are not the same
            if(data[1]===activityData2[1] && data[2]===activityData2[2] && data[3]===activityData2[3]){
                toBeDisabled.push(1);
            }
    }
    if(data[0]!==activityData3[0]){ //if they are not the same
            if(data[1]===activityData3[1] && data[2]===activityData3[2] && data[3]===activityData3[3]){
                toBeDisabled.push(2);
            }
    }
    if(data[0]!==activityData4[0]){ //if they are not the same
            if(data[1]===activityData4[1] && data[2]===activityData4[2] && data[3]===activityData4[3]){
                toBeDisabled.push(3);
            }
    }
    if(data[0]!==activityData5[0]){ //if they are not the same
            if(data[1]===activityData5[1] && data[2]===activityData5[2] && data[3]===activityData5[3]){
                toBeDisabled.push(4);
            }
    }
    if(data[0]!==activityData6[0]){ //if they are not the same
            if(data[1]===activityData6[1] && data[2]===activityData6[2] && data[3]===activityData6[3]){
                toBeDisabled.push(5);
            }
    }
    if(data[0]!==activityData7[0]){ //if they are not the same
            if(data[1]===activityData7[1] && data[2]===activityData7[2] && data[3]===activityData7[3]){
                toBeDisabled.push(6);
            }
    }
 return toBeDisabled; //returned toBeDisabled array
}

//EVENT LISTENERS ON THE CHECK BOXES

///////////////First checkbox
$('.activities input[name="all"]').on("change",function(){ //if there is a change in the checkox with name=all
    
    if($('input[name="all"]').is(':checked')){ //if the checkbox is checked
            toBeDisabled=onClickChecker(activityData1); // get which checkboxes to disable in the toBeDisabled array
            if(toBeDisabled){ //if the array is not empty
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",true);//set the property on inputto disabled
                    $('.activities label').eq(toBeDisabled[i]).addClass("disabled");//give the parent of input a class of disabled
                }
            }
            toBeDisabled=[];
            Total+=200;//increment the total price by 200
            $TotalPara.text("$"+Total);//Update the Total Price
            checkedAll=true;//set this boolean to true
    } 
    if($('input[name="all"]:checkbox'). prop("checked") !== true){//if the checkbox is unchecked
        if(checkedAll){ //check if the checkbox went from a checked to an unchecked state
            toBeDisabled=onClickChecker(activityData1);
            if(toBeDisabled){ //if the array is not empty
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",false);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).removeClass("disabled");//give the parent of input a class of disabled
                }
            }
            Total-=200; //decrement by 200
            $TotalPara.text("$"+Total);//Update the Total Price
        }
        toBeDisabled=[]; //reset the toBeDisabled array for other checkbox clicks that might happen
        checkedAll=false;//set this boolean to false to know that the checkbox has no longer changed state anymore
    }
});



///////////////Second checkbox
$('.activities input[name="js-frameworks"]').on("change",function(){//if there is a change in the checkox with name=js-frameworks
    if($('input[name="js-frameworks"]').is(':checked')){    //if the checkbox is checked
        toBeDisabled=onClickChecker(activityData2);
        if(toBeDisabled){
            for(var i=0;i<toBeDisabled.length;i++){
                $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",true);//set the property on input to disabled
                $('.activities label').eq(toBeDisabled[i]).addClass("disabled");//give the parent of a class of disabled
            }
        }
        toBeDisabled=[];
        Total+=100;//increment by 100
        $TotalPara.text("$"+Total);//Update the Total Price
        checkedFram=true;//set this boolean to True
    }
    if($('input[name="js-frameworks"]:checkbox'). prop("checked") !== true){ //if the checkbox is unchecked
        if(checkedFram){    //check if the checkbox went from a checked to an unchecked state
            toBeDisabled=onClickChecker(activityData2);
            if(toBeDisabled){
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",false);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).removeClass("disabled");//give the parent of input a class of disabled
                }
            }
            Total-=100;//decrement by 100
            $TotalPara.text("$"+Total);//Update the Total Price
        }
        toBeDisabled=[];
        checkedFram=false;//set this boolean to false to know that the checkbox has no longer changed state anymore
    }
});

    

/////////////Third checkbox
$('.activities input[name="js-libs"]').on("change",function(){
    if($('input[name="js-libs"]').is(':checked')){
        toBeDisabled=onClickChecker(activityData3);
        if(toBeDisabled){
            for(var i=0;i<toBeDisabled.length;i++){
                $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",true);//set the property on input to disabled
                $('.activities label').eq(toBeDisabled[i]).addClass("disabled");//give the parent of a class of disabled
            }
        }
        toBeDisabled=[];
        Total+=100;
        $TotalPara.text("$"+Total);//Update the Total Price
        checkedLib=true;
    }
    if($('input[name="js-libs"]:checkbox'). prop("checked") !== true){
        if(checkedLib){
            toBeDisabled=onClickChecker(activityData3);
            if(toBeDisabled){
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",false);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).removeClass("disabled");//give the parent of input a class of disabled
                }
            }
            Total-=100;
            $TotalPara.text("$"+Total);//Update the Total Price
        }
        toBeDisabled=[];
        checkedLib=false;
    }
});

/////////////Fourth checkbox
$('.activities input[name="express"]').on("change",function(){
    if($('input[name="express"]').is(':checked')){
        toBeDisabled=onClickChecker(activityData4);
        if(toBeDisabled){
            for(var i=0;i<toBeDisabled.length;i++){
                $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",true);//set the property on input to disabled
                $('.activities label').eq(toBeDisabled[i]).addClass("disabled");//give the parent of a class of disabled
            }
        }
        toBeDisabled=[];
        Total+=100;
        $TotalPara.text("$"+Total);//Update the Total Price
        checkedExp=true;
    } 
    if($('input[name="express"]:checkbox'). prop("checked") !== true){
        if(checkedExp){
            toBeDisabled=onClickChecker(activityData4);
            if(toBeDisabled){
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",false);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).removeClass("disabled");//give the parent of input a class of disabled
                }
            }
            Total-=100;
            $TotalPara.text("$"+Total);//Update the Total Price
        }
        toBeDisabled=[];
        checkedExp=false;
    }
});
    
///////////////Fifth checkbox
$('.activities input[name="node"]').on("change",function(){    
    if($('input[name="node"]').is(':checked')){
        toBeDisabled=onClickChecker(activityData5);
        if(toBeDisabled){
            for(var i=0;i<toBeDisabled.length;i++){
                $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",true);//set the property on input to disabled
                $('.activities label').eq(toBeDisabled[i]).addClass("disabled");//give the parent of a class of disabled
            }
        }
        toBeDisabled=[];
        Total+=100;
        $TotalPara.text("$"+Total);//Update the Total Price
        checkedNode=true;
    } 
    if($('input[name="node"]'). prop("checked") !== true){
        if(checkedNode){
            toBeDisabled=onClickChecker(activityData5);
            if(toBeDisabled){
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",false);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).removeClass("disabled");//give the parent of input a class of disabled
                }
            }
            Total-=100;
            $TotalPara.text("$"+Total);//Update the Total Price
        }
        toBeDisabled=[];
        checkedNode=false;
    }
});


//////////Sixth checkbox
$('.activities input[name="build-tools"]').on("change",function(){
    if($('input[name="build-tools"]').is(':checked')){
            toBeDisabled=onClickChecker(activityData6);
            if(toBeDisabled){
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",true);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).addClass("disabled");//give the parent of a class of disabled
                }
            }
            toBeDisabled=[];
            Total+=100;
            $TotalPara.text("$"+Total);//Update the Total Price
            checkedBuilTools=true;
    }
    if($('input[name="build-tools"]:checkbox'). prop("checked") !== true){
        if(checkedBuilTools){
            toBeDisabled=onClickChecker(activityData6);
            if(toBeDisabled){
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",false);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).removeClass("disabled");//give the parent of input a class of disabled
                }
            }
            Total-=100;
            $TotalPara.text("$"+Total);//Update the Total Price
        }
        toBeDisabled=[];
        checkedBuilTools=false;
    }
});
    
    
    
/////////Seventh checkbox
$('.activities input[name="npm"]').on("change",function(){
    if($('input[name="npm"]').is(':checked')){
        toBeDisabled=onClickChecker(activityData7);
        if(toBeDisabled){
            for(var i=0;i<toBeDisabled.length;i++){
                $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",true);//set the property on input to disabled
                $('.activities label').eq(toBeDisabled[i]).addClass("disabled");//give the parent of a class of disabled
            }
        }
        toBeDisabled=[];
        Total+=100;
        $TotalPara.text("$"+Total);//Update the Total Price
        checkedNpm=true;
    }
    if($('input[name="npm"]:checkbox'). prop("checked") !== true){
        if(checkedNpm){
            toBeDisabled=onClickChecker(activityData7);
            if(toBeDisabled){
                for(var i=0;i<toBeDisabled.length;i++){
                    $('.activities label').eq(toBeDisabled[i]).children().prop("disabled",false);//set the property on input to disabled
                    $('.activities label').eq(toBeDisabled[i]).removeClass("disabled");//give the parent of input a class of disabled
                }
            }
            Total-=100;
            $TotalPara.text("$"+Total);//Update the Total Price
        }
        toBeDisabled=[];
        checkedNpm=false;
    }
    
});