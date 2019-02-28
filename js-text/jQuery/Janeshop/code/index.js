$(function(){
    var index=0;

    var adTimer=null;

    var x=20,y=20;
    //header 
    $("#nav li").hover(function(){
        $(this).find("div").toggle();
    })

    //content top_item 中的轮播图
    $("#carousel li").mouseover(function(){
        index=$(this).index();
        $(this).addClass("change").siblings().removeClass("change");
        showImg(index);
    }).eq(0).mouseover();

    $("#imgWrap").hover(function(){
        if(adTimer){
            clearInterval(adTimer);
        }
    },function(){
        adTimer=setInterval(() => {
            showImg(index);
            index++;
            if(index==$("#carousel li").length){
                index=0;
            }
        }, 4000);
    }).trigger("mouseleave");
    
    function showImg(index){
        $("#imgWrap").find("img")
                    .eq(index).stop(true,true).fadeIn()
                    .siblings().fadeOut();
        $("#carousel li").removeClass("change").eq(index).addClass("change");
    }

    //content top_item 中的a标签悬浮标题
    $("#news_page li a").mouseover(function(e){
        this.myTitle=this.title;
        this.title="";
        var tooltip="<div id='tooltip'>"+this.myTitle+"</div>";
        $("body").append(tooltip);
        $("#tooltip").css({
                "top":(e.pageY+y)+"px",
                "left":(e.pageX+x)+"px"
        }).show("fast");
    }).mouseout(function(){
        this.title=this.myTitle;
        $("#tooltip").remove();
    }).mousemove(function(e){
        $("#tooltip").css({
                "top":(e.pageY+y)+"px",
                "left":(e.pageX+x)+"px"
        })
    })

    //content bottom_item 中的点击翻转图片
    $("#select li a").click(function(){
        var idx=$("#select li a").index(this);
        $(this).parent().addClass("select_it").siblings().removeClass("select_it");
        showSelect(idx);
        return false;
    }).eq(0).click();

    function showSelect(idx){
        var rollWidth=$("#all_list li").outerWidth();
        rollWidth=rollWidth*4;
        $("#all_list").stop(true,true).animate({left:-rollWidth*idx},1000);
    }

})