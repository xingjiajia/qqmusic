$(function(){
  var audio=$('audio').get(0);
  var database = [];
  var makelist = function(){
    $.each(database,function(k,v){
      $('<li id="ddd"><strong class="music-name" title="'+v.title+'">'+v.title+'</strong><strong class="singer-name" title="'+v.artist+'">'+v.artist+'</strong><strong class="play-time" title="'+v.duration+'">'+v.duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name=""><span></span></strong><strong class="btn_share" title="分享"><span></span></strong><strong class="btn_fav" title="收藏到歌单"><span></span></strong><strong class="btn_del" title="从列表中删除"><span></span></strong></div></li>').appendTo('.music-list');
    })
    }
  $.getJSON('/database.json')
  .done(function(data){
    database=data;
    makelist();
    $('.open-list span').text(database.length);
    console.log(data);
  })

  var onsongchange=function(){
    audio.play();
    $('.play-list-main li').removeClass('play-current')
                           .eq(currentSong)
                           .addClass('play-current')
    $('.music-name-t').text(database[currentSong].title);
    $('.singer-names').text(database[currentSong].artist);
    $('.play-date').text(database[currentSong].duration);
    $('.open-list span').text(currentSong);
    $('.music-name').on('click','li',function(){
     currentSong=$(this).index();
     console.log(currentSong);
     audio.src=database[currentSong].filename;
     onsongchange();
     audio.play();
   })
  }
   var currentSong=0;
  $('.play-list-main').on('click','li',function(){
    currentSong=$(this).index();
    console.log(currentSong)
    audio.src=database[currentSong].filename;
    onsongchange();
    audio.play();
  })
/////////////////////////////上一首下一首
   $('.next-btn').on('click',function(){
     currentSong += 1;
     console.log(currentSong)
     if(currentSong===database.length){
       currentSong=0;
     }
     audio.src = database[currentSong].filename;
     onsongchange();
   })
   $('.prev-btn').on('click',function(){
     currentSong -=1;
     if(currentSong===-1){
       currentSong=database.length-1;
     }
     audio.src = database[currentSong].filename;
     onsongchange();
   })
/////////////////////////////////////////////播放暂停
   $('#play').on('click',function(){
     console.log(1)
      if(audio.paused){
        $('.play-list-main li').removeClass('play-current').eq(currentSong).addClass('play-current')
        audio.play();
      }else{
        audio.pause();
      }
   })
   $('#play').on('click',function(){
     if(audio.paused){
         $('#play').removeClass('play').addClass('play-btn');
     }else{
        $('#play').removeClass('play-btn').addClass('play');
     }
   })
/////////////////////////////
      var yuanlai=0.3;
      audio.ontimeupdate = function(){
       var volume=(this.currentTime/this.duration).toFixed(2)*100+'%';
       console.log(volume)
       $('.current-bar').css({width:volume});
       $('.progress-bar').css({left:volume});
   }
/////////////////////////////
      $('.volume-regulate').on('click',function(e){
       audio.volume=e.offsetX/$(this).width();
       console.log(audio.volume)
   })

      audio.onvolumechange = function(){
      var left=audio.volume.toFixed(2)*100 +'%'
      console.log(left);
      $('.valume-bar').css({width:left});
      $('.valume-op').css({left:left});
      console.log(audio.volume)
   }

      audio.onvolumechange = function(){
      $('.valume-bar').css({width:this.volume*100 + '%'})
      $('.valume-op').css({left:this.volume*100 + '%'})
      if(this.volume == 0){
        $('.mute').addClass('volume-cha').removeClass('volume-icon');
      }else{
        $('.mute').addClass('volume-icon').removeClass('volume-cha') ;
      }
   };

   $('.mute').on('click',function(){
    if(audio.volume!==0){
      $('.mute').removeClass('volume-icon').addClass('volume-cha');
      audio.volume=0;
    }else{
      $('.mute').removeClass('volume-cha').addClass('volume-icon');
      audio.volume=yuanlai;
    }
   })
/////////////////////////////////收起上半部分
   $('.close-list').on('click',function(){
     $('.player-list-frame').animate({opacity:0},230,function(){
       $(this).css('display','none');
     });
   })
   $('.open-list').on('click',function(){
     if($(this).hasClass('key')){
       $('.player-list-frame').animate({opacity:0},230,function(){
       $(this).css('display','none');
     });
       $(this).removeClass('key');
     }else{
    $('.player-list-frame').animate({opacity:1},230,function(){
       $(this).css('display','block');
     });
    $(this).addClass('key');
     }
   })
////////////////////////////////////
   $('#liu').on('click',function(){
     if($(this).hasClass('todo')){
       $('#my-player').animate({left:'-536'},230);
      $('.music-info').animate({opacity:0},230);
      $('.player-list-frame').animate({opacity:0},230,function(){
       $(this).css('display','none');
      });
      $(this).removeClass('todo');
     }else{
       $('#my-player').animate({left:'0'},230);
      $('.music-info').animate({opacity:1},230);
      $('.player-list-frame').animate({opacity:1},230,function(){
       $(this).css('display','block');
     });
       $(this).addClass('todo');
   }
})
////////////////////////////////////删除

   $('.music-list').on('mouseenter','li',function(){
      $(this).find('.list_cp').css({display:'block'});
   })
   $('.music-list').on('mouseleave','li',function(){
      $('.list_cp').css({display:'none'});
   })
  $('.music-list').on('click','.btn_del',function(){
    $(this).closest('li').remove();
  })

})
