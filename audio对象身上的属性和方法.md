css->css2+字体，变形动画
html5->
html +section nav audio
Math
XMLHttpRequest
Date
Localstorage
el.classList

***audio 对象身上的属性和方法
>一个audio对象是一个普通的dom对象
>比其他的dom对象多一些自己独有的属性方法和事件
````javascript
var audio=$('audio').get(0) //普通的dom对象
````
##属性
*audio.volume  (读写)音量
*audio.src    (读写) 歌曲地址
*audio.currentTime （读写） 歌曲当前已播放时长
*audio.duration (读) 歌曲的总时长

*audio.paused  (读写)布尔类型 是否处于暂停状态
*audio.ended （读） 布尔类型 歌曲是否已经播放完毕

##方法
*audio.play() 让歌曲开始播放
*audio.pause() 让歌曲暂停
<!-- *audio.fastseek() 让歌曲来到指定位置 -->

#事件
*audio.oncanplay=fn() 当歌曲下载完之后调用fn
*audio.onvolumechange=fn() 当audio.volume发生变换的时候调用fn
*audio.onplay=fn() 歌曲开始播放之后调用fn
*audio.onpause=fn() 歌曲暂停之后调用fn
*audio.ontimeupdate=fn() 歌曲在播放过程中会一直调用fn
*audio.onended=fn() 一首歌曲播放完之后调用fn


ffprobe -v
cmd切换到qqmusic/music/ffprobe -v quiet -print_format json -show_format 1.mp3
npm install -g http-server
http-server

个人主页要求
技能掌握
工作经历
工作能力
个人作品
其他作品
个人介绍 技能介绍  作品链接  联系信息 工作经历
