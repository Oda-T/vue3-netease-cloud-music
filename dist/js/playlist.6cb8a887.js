(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["playlist"],{"62d3":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return c}));n("d3b7"),n("96cf");var r=n("1da1"),a=n("79f6"),i=n("8ceb"),u=function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){var u,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"]["httpGET"]("COMMENT",{t:1,type:n,id:t,content:r});case 2:u=e.sent,c=u.code,200===c?i["a"].snackbar({message:"评论成功",position:"right-bottom",timeout:1200,onClose:function(){return Promise.resolve()}}):i["a"].snackbar({message:"评论失败",position:"right-bottom",timeout:1200,onClose:function(){return Promise.reject()}});case 5:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),c=function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){var i,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"]["httpGET"]("COMMENT_LIKE",{id:t,type:n,t:1,cid:r});case 2:if(i=e.sent,u=i.code,200!==u){e.next=8;break}return e.abrupt("return",Promise.resolve());case 8:return e.abrupt("return",Promise.reject());case 9:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},6529:function(e,t,n){"use strict";var r;n.d(t,"a",(function(){return r})),function(e){e[e["歌曲"]=0]="歌曲",e[e["mv"]=1]="mv",e[e["歌单"]=2]="歌单",e[e["专辑"]=3]="专辑",e[e["电台"]=4]="电台",e[e["视频"]=5]="视频",e[e["动态"]=6]="动态"}(r||(r={}))},8607:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return a}));n("99af"),n("a9e3"),n("d3b7"),n("ac1f"),n("25f0"),n("1276");var r=function(e){var t=new Date(e);return"".concat(t.getFullYear(),"年").concat(t.getMonth()+1,"月").concat(t.getDate(),"日")},a=function(e){var t=new Date,n=e.split("年")[0],r=e.split("年")[1].split("月")[0],a=e.split("月")[1].split("日")[0];return t.setFullYear(Number(n)),t.setMonth(Number(r)-1),t.setDate(Number(a)),t.getTime().toString()}},b887:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),a={id:"playlist"};function i(e,t,n,i,u,c){var o=Object(r["D"])("play-list-header"),s=Object(r["D"])("play-list-detail"),l=Object(r["D"])("comments-pagination");return Object(r["v"])(),Object(r["g"])("div",a,[Object(r["k"])(o,{headerDetail:e.headerDetail,onHandlePlay:t[1]||(t[1]=function(t){return e.handlePlay(e.songList)}),onHandleShare:t[2]||(t[2]=function(t){return e.handleShare(e.id,"playlist","test")}),onHandleSubscribe:t[3]||(t[3]=function(t){return e.handleSubscribe(e.id,"playlist")})},null,8,["headerDetail"]),Object(r["k"])(s,{listDetail:e.listDetail,onHandleListPlay:e.handlePlay,onHandleListShare:e.handleShare},null,8,["listDetail","onHandleListPlay","onHandleListShare"]),Object(r["k"])(l,{reuqestURL:"GET_COMMENT_PLAYLIST",onGetCommentsVal:e.sendCommentsVal,onThumbUp:e.thumbUp,key:e.renderDom},null,8,["onGetCommentsVal","onThumbUp"])])}n("a4d3"),n("e01a"),n("b0c0"),n("96cf");var u=n("1da1"),c=n("6c02"),o=n("6e1d"),s=n("a0f4"),l=n("fa44"),d=n("c057"),m=n("6529"),p=n("62d3"),b=n("79f6"),f=Object(r["l"])({name:"Playlist",components:{PlayListHeader:o["a"],PlayListDetail:s["a"],CommentsPagination:l["a"]},setup:function(){var e=Object(c["d"])(),t=Object(r["A"])({}),n=Object(r["z"])([]),a=Object(r["z"])([]),i=Object(r["A"])(""),o=Object(r["A"])(Math.random()),s=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(r){var i,u,c,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a.length=0,e.next=3,b["a"]["httpGET"]("GET_PLAYLIST_DETAIL",{id:r});case 3:for(i=e.sent,u=i.playlist,c=u.tracks,t.value={name:u.name,coverImgUrl:u.coverImgUrl,description:u.description,trackCount:u.trackCount,playCount:u.playCount,shareCount:u.shareCount,subscribedCount:u.subscribedCount,updateTime:u.updateTime,tags:u.tags,subscribed:u.subscribed},o=0;o<c.length;o++)n[o]={name:c[o].name,id:"/song?id="+c[o].id,artist:c[o].ar,artistUrl:"/artist?id="+c[o].ar[0].id,imgUrl:c[o].al.picUrl,time:c[o].dt},a[o]=c[o].id;case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(p["b"])(i.value,m["a"]["歌单"],t);case 2:o.value=Math.random();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(p["a"])(i.value,m["a"]["歌单"],t);case 2:o.value=Math.random();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return"string"===typeof e.query.id&&(i.value=e.query.id,s(i.value)),{headerDetail:t,listDetail:n,handlePlay:d["b"],handleShare:d["c"],handleSubscribe:d["d"],songList:a,id:i,sendCommentsVal:l,thumbUp:f,renderDom:o}}});f.render=i;t["default"]=f},c057:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return m})),n.d(t,"a",(function(){return b}));var r=n("ade3"),a=(n("96cf"),n("1da1")),i=n("0613"),u=n("79f6"),c=n("8ceb"),o=function(e){i["a"].commit("setSongList",e),c["a"].snackbar({message:"已添加到播放列表",position:"right-bottom",timeout:1200})},s=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n,r){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"]["httpGET"]("SHARE_RESOURCE",{id:t,type:n,msg:r});case 2:a=e.sent,i=a.code,200===i?c["a"].snackbar({message:"成功分享到动态",position:"right-bottom",timeout:1200}):c["a"].snackbar({message:"分享失败",position:"right-bottom",timeout:1200});case 5:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),l=function(e){switch(e){case"playlist":return"PLAYLIST_SUBSCRIBE";case"album":return"ALBUM_SUB";case"djradio":return"DJ_SUB";case"mv":return"MV_SUB";case"video":return"VIDEO_SUB";default:return"PLAYLIST_SUBSCRIBE"}},d=function(e){switch(e){case"djradio":return"rid";case"mv":return"mvid";default:return"id"}},m=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var a,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"]["httpGET"](l(n),(a={},Object(r["a"])(a,d(n),t),Object(r["a"])(a,"t",1),a));case 2:i=e.sent,o=i.code,200===o?c["a"].snackbar({message:"收藏成功",position:"right-bottom",timeout:1200}):c["a"].snackbar({message:"收藏失败",position:"right-bottom",timeout:1200});case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),p=function(e){switch(e){case"djprogram":return"4";case"video":return"5";default:return"1"}},b=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"]["httpGET"]("RESOURCE_LIKE",{id:t,t:1,type:p(n)});case 2:r=e.sent,a=r.code,200===a&&c["a"].snackbar({message:"已点赞",position:"right-bottom",timeout:1200});case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}}]);