(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["artist"],{"04ad":function(t,e,r){"use strict";r.r(e);r("a4d3"),r("e01a");var n=r("7a23"),a=Object(n["S"])("data-v-6a04f7ee");Object(n["y"])("data-v-6a04f7ee");var i={id:"artist"},c={class:"artist-body g-card-container"},u={class:"mdui-tab mdui-tab-full-width","mdui-tab":""},s=Object(n["k"])("a",{href:"#artist-tab1",class:"mdui-ripple mdui-tab-active"},"热门作品",-1),o={id:"artist-tab1",class:"mdui-p-t-2 mdui-p-b-2"},d={id:"artist-tab2",class:"mdui-p-t-2 mdui-p-b-2"},l={id:"artist-tab3",class:"mdui-p-t-2 mdui-p-b-2"},b={id:"artist-tab4",class:"mdui-p-t-2 mdui-p-b-2"};Object(n["w"])();var m=a((function(t,e,r,a,m,p){var f=Object(n["D"])("play-list-header"),h=Object(n["D"])("play-list-detail"),v=Object(n["D"])("card");return Object(n["v"])(),Object(n["g"])("div",i,[Object(n["k"])(f,{headerDetail:t.headerDetail},null,8,["headerDetail"]),Object(n["k"])("div",c,[Object(n["k"])("div",u,[s,Object(n["k"])("a",{href:"#artist-tab2",class:"mdui-ripple",onClick:e[1]||(e[1]=function(e){return t.getArtistAlbum(t.id)})},"热门专辑"),Object(n["k"])("a",{href:"#artist-tab3",class:"mdui-ripple",onClick:e[2]||(e[2]=function(e){return t.getArtistMv(t.id)})},"相关MV"),Object(n["k"])("a",{href:"#artist-tab4",class:"mdui-ripple",onClick:e[3]||(e[3]=function(e){return t.getArtistDesc(t.id)})},"艺人介绍")]),Object(n["k"])("div",o,[Object(n["k"])(h,{listDetail:t.listDetail,onHandleListPlay:t.handlePlay,onHandleListShare:t.handleShare},null,8,["listDetail","onHandleListPlay","onHandleListShare"])]),Object(n["k"])("div",d,[(Object(n["v"])(!0),Object(n["g"])(n["a"],null,Object(n["B"])(t.cardList,(function(t){return Object(n["v"])(),Object(n["g"])(v,{key:t.id,item:t},null,8,["item"])})),128))]),Object(n["k"])("div",l,[(Object(n["v"])(!0),Object(n["g"])(n["a"],null,Object(n["B"])(t.mvCardList,(function(t){return Object(n["v"])(),Object(n["g"])(v,{key:t.id,item:t},null,8,["item"])})),128))]),Object(n["k"])("div",b,[(Object(n["v"])(!0),Object(n["g"])(n["a"],null,Object(n["B"])(t.description,(function(t){return Object(n["v"])(),Object(n["g"])("div",{class:"mdui-typo",key:t.ti,item:t},[Object(n["k"])("h4",null,Object(n["H"])(t.ti),1),Object(n["k"])("p",null,Object(n["H"])(t.txt),1)],8,["item"])})),128))])])])})),p=(r("b0c0"),r("a9e3"),r("96cf"),r("1da1")),f=r("6c02"),h=r("c057"),v=r("8ceb"),g=r("ff86"),j=r("6e1d"),O=r("a0f4"),k=r("79f6"),w=Object(n["l"])({name:"Artist",components:{Card:g["a"],PlayListHeader:j["a"],PlayListDetail:O["a"]},setup:function(){var t=Object(f["d"])(),e=Object(n["A"])(0),r=Object(n["A"])({}),a=Object(n["z"])([]),i=Object(n["z"])([]),c=Object(n["z"])([]),u=Object(n["z"])([]),s=function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(e){var n,a,i,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r.value={coverImgUrl:"",desc:"",name:""},t.next=3,k["a"]["httpGET"]("GET_ARTIST",{id:e});case 3:for(n=t.sent,a=n.artist,i=n.hotSongs,r.value={coverImgUrl:a.img1v1Url+"?param=264y264",desc:a.briefDesc,name:a.name},u.length=0,c=0;c<i.length;c++)u[c]={name:i[c].name,id:"/song?id="+i[c].id,artist:i[c].ar,artistUrl:"/artist?id="+i[c].ar[0].id,imgUrl:i[c].al.picUrl,time:i[c].dt};case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(e){var r,n,i,c,u=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=u.length>1&&void 0!==u[1]?u[1]:30,!a.length){t.next=3;break}return t.abrupt("return");case 3:return t.next=5,k["a"]["httpGET"]("GET_ARTIST_ALBUM",{id:e,limit:r});case 5:for(n=t.sent,i=n.hotAlbums,c=0;c<i.length;c++)a[c]={id:"/album?id="+i[c].id,name:i[c].name,artist:i[c].artists[0].name,picUrl:i[c].picUrl};case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),d=function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(e){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!i.length){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,k["a"]["httpGET"]("GET_ARTIST_MV",{id:e});case 4:for(r=t.sent,n=r.mvs,a=0;a<n.length;a++)i[a]={id:"/mv?id="+n[a].id,name:n[a].name,artist:n[a].artist.name,picUrl:n[a].imgurl};case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(e){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!c.length){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,k["a"]["httpGET"]("GET_ARTIST_DESC",{id:e});case 4:for(r=t.sent,n=r.introduction,a=0;a<n.length;a++)c[a]={ti:n[a].ti,txt:n[a].txt};case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return t.query.id&&(e.value=Number(t.query.id),s(e.value)),Object(f["c"])((function(){setTimeout((function(){t.query.id&&(e.value=Number(t.query.id),s(e.value))}),20)})),Object(n["t"])((function(){v["a"].mutation()})),{listDetail:u,headerDetail:r,cardList:a,mvCardList:i,getArtistAlbum:o,getArtistMv:d,getArtistDesc:l,id:e,description:c,handlePlay:h["b"],handleShare:h["c"]}}});r("968b");w.render=m,w.__scopeId="data-v-6a04f7ee";e["default"]=w},8607:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return a}));r("99af"),r("a9e3"),r("d3b7"),r("ac1f"),r("25f0"),r("1276");var n=function(t){var e=new Date(t);return"".concat(e.getFullYear(),"年").concat(e.getMonth()+1,"月").concat(e.getDate(),"日")},a=function(t){var e=new Date,r=t.split("年")[0],n=t.split("年")[1].split("月")[0],a=t.split("月")[1].split("日")[0];return e.setFullYear(Number(r)),e.setMonth(Number(n)-1),e.setDate(Number(a)),e.getTime().toString()}},"968b":function(t,e,r){"use strict";r("dde1")},c057:function(t,e,r){"use strict";r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return o})),r.d(e,"d",(function(){return b})),r.d(e,"a",(function(){return p}));var n=r("ade3"),a=(r("96cf"),r("1da1")),i=r("0613"),c=r("79f6"),u=r("8ceb"),s=function(t){i["a"].commit("setSongList",t),u["a"].snackbar({message:"已添加到播放列表",position:"right-bottom",timeout:1200})},o=function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e,r,n){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c["a"]["httpGET"]("SHARE_RESOURCE",{id:e,type:r,msg:n});case 2:a=t.sent,i=a.code,200===i?u["a"].snackbar({message:"成功分享到动态",position:"right-bottom",timeout:1200}):u["a"].snackbar({message:"分享失败",position:"right-bottom",timeout:1200});case 5:case"end":return t.stop()}}),t)})));return function(e,r,n){return t.apply(this,arguments)}}(),d=function(t){switch(t){case"playlist":return"PLAYLIST_SUBSCRIBE";case"album":return"ALBUM_SUB";case"djradio":return"DJ_SUB";case"mv":return"MV_SUB";case"video":return"VIDEO_SUB";default:return"PLAYLIST_SUBSCRIBE"}},l=function(t){switch(t){case"djradio":return"rid";case"mv":return"mvid";default:return"id"}},b=function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e,r){var a,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c["a"]["httpGET"](d(r),(a={},Object(n["a"])(a,l(r),e),Object(n["a"])(a,"t",1),a));case 2:i=t.sent,s=i.code,200===s?u["a"].snackbar({message:"收藏成功",position:"right-bottom",timeout:1200}):u["a"].snackbar({message:"收藏失败",position:"right-bottom",timeout:1200});case 5:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),m=function(t){switch(t){case"djprogram":return"4";case"video":return"5";default:return"1"}},p=function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e,r){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c["a"]["httpGET"]("RESOURCE_LIKE",{id:e,t:1,type:m(r)});case 2:n=t.sent,a=n.code,200===a&&u["a"].snackbar({message:"已点赞",position:"right-bottom",timeout:1200});case 5:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}()},dde1:function(t,e,r){}}]);