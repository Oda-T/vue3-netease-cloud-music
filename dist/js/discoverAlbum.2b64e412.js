(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["discoverAlbum"],{"0204":function(e,t,a){},"0e2d":function(e,t,a){"use strict";a("0204")},8957:function(e,t,a){"use strict";a.r(t);var n=a("7a23"),c=Object(n["P"])("data-v-7f9c94d6");Object(n["w"])("data-v-7f9c94d6");var i={id:"discoverAlbum"},r={class:"album-card-container"};Object(n["u"])();var u=c((function(e,t,a,c,u,o){var d=Object(n["B"])("recommend"),b=Object(n["B"])("card"),l=Object(n["B"])("pagination");return Object(n["t"])(),Object(n["f"])("div",i,[Object(n["j"])(d,{topTitle:"全部新碟",activeName:e.activeName,topList:e.TopList,onGetId:e.getIdCallBack},null,8,["activeName","topList","onGetId"]),Object(n["j"])("div",r,[(Object(n["t"])(!0),Object(n["f"])(n["a"],null,Object(n["z"])(e.cardList,(function(e){return Object(n["t"])(),Object(n["f"])(b,{key:e.id,item:e},null,8,["item"])})),128))]),Object(n["j"])(l,{pageCount:e.totalListCount,onPageNumber:e.pageNumber,key:e.forceUpdate},null,8,["pageCount","onPageNumber"])])})),o=(a("b0c0"),a("96cf"),a("1da1")),d=a("6c02"),b=a("bca1"),l=a("ff86"),s=a("6407"),m=a("79f6"),f=Object(n["k"])({name:"discoverAlbum",components:{Recommend:b["a"],Card:l["a"],Pagination:s["a"]},setup:function(){var e=Object(d["d"])(),t=Object(d["e"])(),a=Object(n["x"])([]),c=Object(n["y"])(0),i=Object(n["y"])(""),r={id:"ALL",name:"全部"},u=Object(n["y"])("全部"),b=[{id:"ALL",name:"全部"},{id:"ZH",name:"华语"},{id:"EA",name:"欧美"},{id:"KR",name:"韩国"},{id:"JP",name:"日本"}],l=Object(n["y"])("全部"),s=function(e){for(var t=0;t<b.length;t++)b[t].id===e&&(u.value=b[t].name);return u.value},f=function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var n,r,u,o,d,b=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=b.length>1&&void 0!==b[1]?b[1]:1,a.length=0,e.next=4,m["a"]["httpGET"]("GET_ALBUM_NEW",{area:t,limit:60,offset:60*(n-1)});case 4:for(r=e.sent,u=r.albums,o=r.total,1===n&&(c.value=Math.ceil(o/60),i.value=t),d=0;d<u.length;d++)a[d]={id:"/album?id="+u[d].id,name:u[d].name,artist:u[d].artists[0].name,picUrl:u[d].picUrl};case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(e){r=e,t.push("/discover/album?area=".concat(e.id))},v=function(e){f(r.id,e)};return Object(n["L"])((function(){"/discover/album"===e.path&&"string"===typeof e.query.area?(l.value=s(e.query.area),f(e.query.area)):(l.value="全部",f("ALL"))})),{activeName:l,TopList:b,cardList:a,totalListCount:c,pageNumber:v,forceUpdate:i,getIdCallBack:p}}});a("0e2d");f.render=u,f.__scopeId="data-v-7f9c94d6";t["default"]=f}}]);