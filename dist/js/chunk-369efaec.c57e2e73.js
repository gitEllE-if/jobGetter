(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-369efaec"],{"0418":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header-top-row"},[s("router-link",{staticClass:"logo",attrs:{to:"/"}},[s("svg",{staticClass:"logo-svg",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 385 512"}},[s("path",{attrs:{d:"M42.6 403.3h2.8c12.7 0 25.5 0 38.2.1 1.6 0 3.1-.4 3.6 2.1 7.1 34.9 30 54.6 62.9 63.9 26.9 7.6 54.1 7.8 81.3 1.8 33.8-7.4 56-28.3 68-60.4 8-21.5 10.7-43.8 11-66.5.1-5.8.3-47-.2-52.8l-.9-.3c-.8 1.5-1.7 2.9-2.5 4.4-22.1 43.1-61.3 67.4-105.4 69.1-103 4-169.4-57-172-176.2-.5-23.7 1.8-46.9 8.3-69.7C58.3 47.7 112.3.6 191.6 0c61.3-.4 101.5 38.7 116.2 70.3.5 1.1 1.3 2.3 2.4 1.9V10.6h44.3c0 280.3.1 332.2.1 332.2-.1 78.5-26.7 143.7-103 162.2-69.5 16.9-159 4.8-196-57.2-8-13.5-11.8-28.3-13-44.5zM188.9 36.5c-52.5-.5-108.5 40.7-115 133.8-4.1 59 14.8 122.2 71.5 148.6 27.6 12.9 74.3 15 108.3-8.7 47.6-33.2 62.7-97 54.8-154-9.7-71.1-47.8-120-119.6-119.7z"}})]),s("span",{staticClass:"logo-txt"},[t._v("Job‑getter")])]),s("div",{staticClass:"header-top-cnt"},[s("input",{staticClass:"mobile-input-btn",attrs:{id:"mobile-btn",type:"checkbox"}}),t._m(0),s("ul",{staticClass:"main-header-list"},[s("li",{staticClass:"main-header-list-item"},[s("router-link",{staticClass:"list-item-link",attrs:{to:"/"}},[t._v("Home")])],1),t._m(1),s("li",{staticClass:"main-header-list-item"},["unknown"===t.userLogin?s("Account"):t._e()],1),"unknown"!==t.userLogin?s("li",[s("div",{staticClass:"header-buttons-cnt"},[s("label",{staticClass:"form-search-label dropdown",attrs:{for:"searchbox"},on:{click:t.toggleClick}},[s("svg",{staticClass:"header-search-svg",attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",width:"32",height:"32",viewBox:"0 0 40 40"}},[s("path",{attrs:{d:"M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"}}),s("path",{attrs:{d:"M16,17a5,5,0,1,1,5-5A5,5,0,0,1,16,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,9Z"}}),s("path",{attrs:{d:"M25.55,24a1,1,0,0,1-.74-.32A11.35,11.35,0,0,0,16.46,20h-.92a11.27,11.27,0,0,0-7.85,3.16,1,1,0,0,1-1.38-1.44A13.24,13.24,0,0,1,15.54,18h.92a13.39,13.39,0,0,1,9.82,4.32A1,1,0,0,1,25.55,24Z"}})]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],staticClass:"dropdown__menu"},[s("router-link",{attrs:{to:"/profile"}},[t._v(" Профиль")]),s("router-link",{attrs:{to:"/settings"}},[t._v(" Настройки")]),s("router-link",{attrs:{to:"/vacancies_favorite"}},[t._v(" Избранное "),t.favoritesCnt?s("span",{staticClass:"favoritesCnt"},[t._v(" "+t._s(t.favoritesCnt)+" ")]):t._e()]),s("router-link",{attrs:{to:"/cv"}},[t._v(" Резюме")]),s("hr"),s("a",{on:{click:t.logout}},[t._v("Выход")])],1)])])]):t._e()])])],1)},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("label",{staticClass:"mobile-label-btn",attrs:{for:"mobile-btn"}},[s("div",{staticClass:"mobile-menu__icon"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",{staticClass:"main-header-list-item"},[s("a",{staticClass:"list-item-link",attrs:{href:"#"}},[t._v("About")])])}],n=s("5530"),r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"account"},[s("button",{staticClass:"account-button",on:{click:function(e){t.showAccount=!t.showAccount}}},[t._v(" Login ")]),s("form",{ref:"formLogin"}),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showAccount,expression:"showAccount"}],staticClass:"dropAccount"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.user,expression:"user"}],staticClass:"dropAccount-name"},[t._v(" Welcome, You signed as:"),s("span",[t._v(" "+t._s(t.user))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.message,expression:"message"}],staticClass:"dropAccount-message"},[t._v(" "+t._s(t.message)+" ")]),s("label",{staticClass:"dropAccount-label",attrs:{for:"login"}},[t._v("Login")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.login,expression:"login"}],attrs:{name:"login",type:"text"},domProps:{value:t.login},on:{input:function(e){e.target.composing||(t.login=e.target.value)}}}),s("label",{staticClass:"dropAccount-label",attrs:{for:"password"}},[t._v("Password")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{name:"password",type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),s("div",{staticClass:"dropAccount-buttons"},[s("button",{staticClass:"account-button dropAccount-button",attrs:{name:"login"},on:{click:function(e){return e.preventDefault(),t.loginRequest(e)}}},[t._v(" Sign in ")]),s("button",{staticClass:"account-button dropAccount-button",attrs:{name:"register"},on:{click:function(e){return e.preventDefault(),t.loginRequest(e)}}},[t._v(" Register ")])])])])},i=[],c=s("1da1"),l=(s("b0c0"),s("96cf"),{data:function(){return{showAccount:!1,login:"",password:"",user:"",message:""}},mounted:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.message="",t.user="",e.prev=2,e.next=5,t.$store.dispatch("getUser");case 5:s=e.sent,s.result?t.user=s.result.login:t.message=s.message,e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](2),t.message="The error occurred while login",console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,9]])})))()},methods:{loginRequest:function(t){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function s(){var a,o;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(e.message="",s.prev=1,!e.login||!e.password){s.next=11;break}return a={login:e.login,password:e.password,action:t.target.name},s.next=6,e.$store.dispatch("login",a);case 6:o=s.sent,o.user&&(e.user=o.user.login,e.$refs.formLogin.submit()),o.message&&(e.message=o.message),s.next=12;break;case 11:e.message="Please enter login and password";case 12:s.next=18;break;case 14:s.prev=14,s.t0=s["catch"](1),e.message="The error occurred while login",console.log(s.t0);case 18:case"end":return s.stop()}}),s,null,[[1,14]])})))()}}}),u=l,d=s("2877"),v=Object(d["a"])(u,r,i,!1,null,null,null),p=v.exports,m=s("2f62"),h={name:"Header",components:{Account:p},data:function(){return{isOpen:!1}},mounted:function(){},methods:{toggleClick:function(){this.isOpen=!this.isOpen},logout:function(){this.$router.push("/"),location.reload(),window.localStorage.removeItem("tokenAuth"),this.$store.commit("setUserLogin","unknown"),this.$store.commit("setUser",null)}},computed:Object(n["a"])(Object(n["a"])(Object(n["a"])({},Object(m["b"])({userLogin:"userLogin_getter"})),Object(m["b"])({itemsFavorite:"vacanciesFavorite_getter"})),{},{favoritesCnt:function(){return this.itemsFavorite.length}})},g=h,f=(s("e504"),Object(d["a"])(g,a,o,!1,null,"76b09878",null));e["a"]=f.exports},"4d2a":function(t,e,s){},9703:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container-main"},[s("header",[s("Header")],1),t._m(0),s("Footer")],1)},o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",[s("div",{staticClass:"container"},[s("div",{staticClass:"notfound-cnt"},[s("div",{staticClass:"notfound-page"},[s("h1",{staticClass:"notfound-404"},[t._v("404")]),s("h3",{staticClass:"notfound-text"},[t._v("Такой страницы у нас нет... Зато есть другие "),s("span",[t._v("(=^ｪ^=)")])])])])])])}],n=s("0418"),r=s("fd2d"),i={name:"NotFound",components:{Header:n["a"],Footer:r["a"]}},c=i,l=s("2877"),u=Object(l["a"])(c,a,o,!1,null,null,null);e["default"]=u.exports},b0c0:function(t,e,s){var a=s("83ab"),o=s("5e77").EXISTS,n=s("e330"),r=s("9bf2").f,i=Function.prototype,c=n(i.toString),l=/^\s*function ([^ (]*)/,u=n(l.exec),d="name";a&&!o&&r(i,d,{configurable:!0,get:function(){try{return u(l,c(this))[1]}catch(t){return""}}})},e504:function(t,e,s){"use strict";s("4d2a")},fd2d:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",{staticClass:"footer"},[s("div",{staticClass:"footer-nav"},[s("p",{staticClass:"footer-nav__p"},[t._v(" Copyright © "+t._s(t.year)+" "),s("a",{staticClass:"footer-logo",attrs:{href:"/"}},[t._v("Job-getter")])]),s("a",{attrs:{href:"#"}},[t._v("Политика конфеденциальности")]),s("router-link",{attrs:{to:"/about"}},[t._v("О компании")]),s("a",{attrs:{href:"#"}},[t._v("Вопросы и ответы")]),s("a",{attrs:{href:"#"}},[t._v("Поддержка")])],1),s("div",{staticClass:"footer-icon"},[s("div",{staticClass:"footer-icon__title"},[t._v("Вакансии предоставлены с сайтов:")]),s("div",{staticClass:"footer-icon__items"},[s("a",{attrs:{href:"https://hh.ru"}},[s("svg-provider-1",{staticClass:"footer-icon__svg"})],1),s("a",{attrs:{href:"https://superjob.ru"}},[s("svg-provider-2",{staticClass:"footer-icon__svg footer-icon__svg__small"})],1)])])])},o=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.0",width:"35.0pt",height:"35.0pt",viewBox:"0 0 800.000000 800.000000",preserveAspectRatio:"xMidYMid meet"}},[s("g",{attrs:{transform:"translate(0.000000,800.000000) scale(0.100000,-0.100000)",stroke:"none"}},[s("path",{attrs:{d:"M3680 7994 c-19 -2 -80 -9 -135 -15 -967 -103 -1904 -591 -2549 -1329 -541 -618 -862 -1332 -973 -2160 -23 -171 -26 -772 -5 -940 100 -792 383 -1467 870 -2075 124 -154 433 -463 587 -587 633 -507 1369 -805 2170 -878 142 -13 568 -13 710 0 801 73 1536 370 2170 878 154 123 464 433 587 587 488 609 770 1283 870 2075 21 168 18 769 -5 940 -63 471 -185 876 -387 1285 -527 1064 -1485 1834 -2634 2116 -326 79 -509 100 -906 104 -184 2 -351 1 -370 -1z m-1420 -2733 l0 -680 75 74 c91 90 232 185 334 224 237 91 538 78 759 -33 153 -77 240 -164 312 -309 94 -192 100 -270 100 -1323 l0 -834 -324 0 -324 0 -5 823 c-5 876 -8 925 -54 1030 -84 188 -348 252 -580 141 -166 -79 -251 -225 -283 -484 -6 -51 -10 -367 -10 -797 l0 -713 -330 0 -330 0 0 1780 0 1780 330 0 330 0 0 -679z m2550 -3 l0 -681 73 70 c139 135 263 210 424 260 81 24 102 27 258 27 200 -1 273 -16 420 -89 155 -77 242 -164 316 -320 89 -185 91 -213 96 -1252 l5 -893 -331 0 -331 0 0 795 c0 827 -5 943 -41 1042 -61 162 -266 248 -477 198 -223 -53 -342 -198 -389 -474 -12 -69 -16 -234 -20 -823 l-5 -738 -324 0 -324 0 0 1780 0 1780 325 0 325 0 0 -682z"}})])])},r=[],i={name:"SvgProvider1"},c=i,l=s("2877"),u=Object(l["a"])(c,n,r,!1,null,null,null),d=u.exports,v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("svg",{attrs:{"xmlns:inkscape":"http://www.inkscape.org/namespaces/inkscape","xmlns:sodipodi":"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd",xmlns:"http://www.w3.org/2000/svg","xmlns:svg":"http://www.w3.org/2000/svg",version:"1.0",width:"150pt",height:"34pt",viewBox:"0 0 600 136",preserveAspectRatio:"xMidYMid meet",id:"svg18","sodipodi:docname":"1af0844ec5d784b2e9786ffdacd74559.svg"}},[s("defs",{attrs:{id:"defs22"}}),s("sodipodi:namedview",{attrs:{id:"namedview20",pagecolor:"#ffffff",bordercolor:"#666666",borderopacity:"1.0","inkscape:pageshadow":"2","inkscape:pageopacity":"0.0","inkscape:pagecheckerboard":"0","inkscape:document-units":"pt"}}),s("g",{attrs:{transform:"matrix(0.1,0,0,-0.1,0,136)",stroke:"none",id:"g16"}},[s("path",{attrs:{d:"M 0,919 V 479 l 90,47 89,47 45,-50 c 66,-73 146,-107 251,-107 133,0 205,49 205,137 0,66 -46,92 -270,152 -212,57 -280,97 -326,192 -25,49 -29,70 -28,138 0,66 4,89 26,130 45,86 115,143 215,175 l 58,19 H 178 l -178,1 z",id:"path4"}}),s("path",{attrs:{d:"m 615,1346 c 102,-32 226,-122 267,-194 l 18,-30 -93,-55 -92,-56 -15,22 c -75,114 -199,161 -325,123 -59,-18 -93,-49 -101,-93 C 260,990 311,958 521,905 749,848 827,803 877,702 914,627 916,513 881,433 855,375 785,303 722,271 615,217 400,201 278,240 193,266 98,330 43,399 L 0,451 V 225 0 h 900 900 v 510 510 h 100 100 v -31 -31 l 30,25 c 52,44 110,60 202,55 97,-5 142,-25 206,-89 86,-87 128,-214 119,-354 -10,-157 -79,-273 -202,-335 -61,-32 -76,-35 -149,-35 -82,1 -140,20 -188,63 -17,14 -18,7 -18,-136 V 0 h 2000 2000 v 680 680 l -2712,-1 c -2209,0 -2706,-3 -2673,-13 z M 4278,903 c -6,-509 -6,-516 -89,-595 -62,-61 -129,-82 -259,-83 -135,0 -130,-5 -130,114 v 100 l 33,-7 c 51,-11 129,-8 165,7 66,28 67,30 70,489 l 3,412 h 105 106 z m 1132,246 V 958 l 30,25 c 73,62 236,76 328,28 128,-66 202,-203 202,-376 0,-229 -127,-391 -317,-403 -87,-6 -148,9 -203,49 l -40,29 v -35 -35 h -95 -95 v 550 550 h 95 95 z M 3181,1013 c 123,-56 197,-176 214,-350 l 8,-73 h -287 c -324,0 -307,5 -263,-80 65,-131 245,-148 346,-34 l 39,45 82,-41 81,-41 -18,-30 c -47,-81 -166,-157 -281,-179 -137,-27 -264,10 -358,104 -87,88 -108,144 -109,301 0,114 1,123 31,185 46,96 121,166 215,201 73,27 232,23 300,-8 z m 729,-73 V 840 h -26 c -102,0 -193,-68 -213,-159 -6,-29 -11,-140 -11,-246 V 240 h -95 -95 v 390 390 h 95 95 v -47 -47 l 32,33 c 39,40 76,60 131,71 92,18 87,23 87,-90 z m 1012,53 c 85,-40 151,-106 191,-191 29,-61 32,-75 32,-167 0,-92 -3,-106 -32,-167 -40,-85 -106,-151 -191,-191 -62,-30 -75,-32 -172,-32 -93,0 -111,3 -163,27 -163,76 -259,257 -228,427 22,119 90,220 189,278 70,41 119,53 217,50 78,-2 99,-6 157,-34 z M 1172,758 c 3,-294 7,-311 72,-342 63,-30 137,-18 189,32 48,46 57,101 57,349 v 223 h 100 100 V 630 240 h -100 -100 v 30 30 l -60,-30 c -73,-37 -172,-53 -244,-39 -81,15 -136,55 -171,124 l -30,59 -3,303 -3,303 h 95 95 z",id:"path6"}}),s("path",{attrs:{d:"m 5547,856 c -52,-19 -76,-42 -103,-101 -51,-109 -20,-263 64,-320 43,-29 116,-34 161,-10 157,81 136,388 -30,435 -42,12 -45,12 -92,-4 z",id:"path8"}}),s("path",{attrs:{d:"m 2969,871 c -46,-15 -69,-32 -99,-73 -50,-69 -52,-68 146,-68 h 176 l -7,27 c -22,88 -123,141 -216,114 z",id:"path10"}}),s("path",{attrs:{d:"m 4700,858 c -56,-16 -91,-48 -117,-105 -58,-127 -15,-286 91,-334 109,-49 224,10 261,133 19,65 19,101 0,166 -33,111 -132,170 -235,140 z",id:"path12"}}),s("path",{attrs:{d:"m 2105,837 c -174,-98 -118,-427 73,-427 100,0 170,76 180,195 6,80 -10,141 -51,190 -54,67 -131,82 -202,42 z",id:"path14"}})])],1)},p=[],m={name:"SvgProvider2"},h=m,g=Object(l["a"])(h,v,p,!1,null,null,null),f=g.exports,w={components:{SvgProvider1:d,SvgProvider2:f},name:"Footer",computed:{year:function(){return(new Date).getFullYear()}}},_=w,b=Object(l["a"])(_,a,o,!1,null,null,null);e["a"]=b.exports}}]);