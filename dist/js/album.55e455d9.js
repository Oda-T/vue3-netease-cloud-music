(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["album"],{"62d3":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return c}));n("d3b7"),n("96cf");var r=n("1da1"),a=n("79f6"),i=n("8ceb"),u=function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){var u,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"]["httpGET"]("COMMENT",{t:1,type:n,id:t,content:r});case 2:u=e.sent,c=u.code,200===c?i["a"].snackbar({message:"评论成功",position:"right-bottom",timeout:1200,onClose:function(){return Promise.resolve()}}):i["a"].snackbar({message:"评论失败",position:"right-bottom",timeout:1200,onClose:function(){return Promise.reject()}});case 5:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),c=function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){var i,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a["a"]["httpGET"]("COMMENT_LIKE",{id:t,type:n,t:1,cid:r});case 2:if(i=e.sent,u=i.code,200!==u){e.next=8;break}return e.abrupt("return",Promise.resolve());case 8:return e.abrupt("return",Promise.reject());case 9:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},6529:function(e,t,n){"use strict";var r;n.d(t,"a",(function(){return r})),function(e){e[e["歌曲"]=0]="歌曲",e[e["mv"]=1]="mv",e[e["歌单"]=2]="歌单",e[e["专辑"]=3]="专辑",e[e["电台"]=4]="电台",e[e["视频"]=5]="视频",e[e["动态"]=6]="动态"}(r||(r={}))},c057:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return p}));var r=n("ade3"),a=(n("96cf"),n("1da1")),i=n("0613"),u=n("79f6"),c=n("8ceb"),o=function(e){i["a"].commit("setSongList",e)},s=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n,r){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"]["httpGET"]("SHARE_RESOURCE",{id:t,type:n,msg:r});case 2:a=e.sent,i=a.code,200===i?c["a"].snackbar({message:"成功分享到动态",position:"right-bottom",timeout:1200}):c["a"].snackbar({message:"分享失败",position:"right-bottom",timeout:1200});case 5:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),d=function(e){switch(e){case"playlist":return"PLAYLIST_SUBSCRIBE";case"album":return"ALBUM_SUB";case"djradio":return"DJ_SUB";case"mv":return"MV_SUB";case"video":return"VIDEO_SUB";default:return"PLAYLIST_SUBSCRIBE"}},m=function(e){switch(e){case"djradio":return"rid";case"mv":return"mvid";default:return"id"}},l=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var a,i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"]["httpGET"](d(n),(a={},Object(r["a"])(a,m(n),t),Object(r["a"])(a,"t",1),a));case 2:i=e.sent,o=i.code,200===o?c["a"].snackbar({message:"收藏成功",position:"right-bottom",timeout:1200}):c["a"].snackbar({message:"收藏失败",position:"right-bottom",timeout:1200});case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),b=function(e){switch(e){case"djprogram":return"4";case"video":return"5";default:return"1"}},p=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,n){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"]["httpGET"]("RESOURCE_LIKE",{id:t,t:1,type:b(n)});case 2:r=e.sent,a=r.code,200===a&&c["a"].snackbar({message:"已点赞",position:"right-bottom",timeout:1200});case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},dbea:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),a={id:"album"};function i(e,t,n,i,u,c){var o=Object(r["B"])("PlayListHeader"),s=Object(r["B"])("PlayListDetail"),d=Object(r["B"])("CommentsPagination");return Object(r["t"])(),Object(r["f"])("div",a,[Object(r["j"])(o,{headerDetail:e.headerDetail,onHandlePlay:t[1]||(t[1]=function(t){return e.handlePlay(e.albumList)}),onHandleShare:t[2]||(t[2]=function(t){return e.handleShare(e.id,"album","test")}),onHandleSubscribe:t[3]||(t[3]=function(t){return e.handleSubscribe(e.id,"album")})},null,8,["headerDetail"]),Object(r["j"])(s,{listDetail:e.listDetail,onHandleListPlay:e.handlePlay,onHandleListShare:e.handleShare},null,8,["listDetail","onHandleListPlay","onHandleListShare"]),Object(r["j"])(d,{reuqestURL:"GET_COMMENT_ALBUM",onGetCommentsVal:e.sendCommentsVal,onThumbUp:e.thumbUp,key:e.renderDom},null,8,["onGetCommentsVal","onThumbUp"])])}n("a4d3"),n("e01a"),n("b0c0"),n("d3b7"),n("25f0"),n("96cf");var u=n("1da1"),c=n("6c02"),o=n("6e1d"),s=n("a0f4"),d=n("fa44"),m=n("c057"),l=n("6529"),b=n("62d3"),p=n("79f6"),f=Object(r["k"])({name:"Album",components:{PlayListHeader:o["a"],PlayListDetail:s["a"],CommentsPagination:d["a"]},setup:function(){var e=Object(c["d"])(),t=Object(r["y"])({}),n=Object(r["x"])([]),a=Object(r["x"])([]),i=Object(r["y"])(""),o=Object(r["y"])(Math.random()),s=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(r){var i,u,c,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a.length=0,e.next=3,p["a"]["httpGET"]("GET_ALBUM",{id:r});case 3:for(i=e.sent,u=i.album,c=i.songs,t.value={name:u.name,coverImgUrl:u.picUrl,description:u.description,trackCount:u.trackCount,playCount:u.playCount,shareCount:u.info.shareCount,subscribedCount:u.mark,updateTime:u.publishTime,artistName:u.artist.name,artistId:u.artist.id,tags:u.tags,subscribed:u.subscribed},o=0;o<c.length;o++)n[o]={name:c[o].name,id:"/song?id="+c[o].id,artist:c[o].ar[0].name,artistUrl:"/artist?id="+c[o].ar[0].id,imgUrl:c[o].al.picUrl,time:c[o].dt},a[o]=c[o].id.toString();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(b["b"])(i.value,l["a"]["专辑"],t);case 2:Object(r["o"])((function(){o.value=Math.random()}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(b["a"])(i.value,l["a"]["专辑"],t);case 2:Object(r["o"])((function(){o.value=Math.random()}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return"string"===typeof e.query.id&&(i.value=e.query.id,s(i.value)),{headerDetail:t,listDetail:n,handlePlay:m["b"],handleShare:m["c"],handleSubscribe:m["d"],albumList:a,id:i,thumbUp:f,sendCommentsVal:d,renderDom:o}}});f.render=i;t["default"]=f}}]);