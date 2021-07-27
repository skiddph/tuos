var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,A=(t,n,a)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[n]=a,l=(e,t)=>{for(var n in t||(t={}))s.call(t,n)&&A(e,n,t[n]);if(a)for(var n of a(t))o.call(t,n)&&A(e,n,t[n]);return e};import{o as r,c as i,r as u,w as c,a as d,t as p,b as m,d as g,e as h,f,g as y,h as b,v,i as Q,j as x,k as E,V as P,s as S,l as C,m as T,n as k,_ as B,C as D,p as q}from"./vendor.acd62b1c.js";const w={name:"App"};w.render=function(e,t,n,a,s,o){const A=u("router-view");return r(),i(A)};const L={};L.render=function(e,t){const n=u("router-view"),a=u("lo-default");return r(),i(a,null,{default:c((()=>[d(n)])),_:1})};const O={name:"AuthLoginRegisterForm",props:{title:String,res:Object},data:()=>({xdata:{type:"",message:""},prompt:!1}),methods:{submit(e){const t={},n=e.srcElement.getElementsByTagName("input");for(let a=0;a<n.length;a++)if("submit"!=n[a].type){const e=n[a].name,s=n[a].value;t[e]=s}this.prompt=!1,this.$emit("onSubmit",t)},resHandler(e){this.xdata=e,this.prompt=!0,window.scrollTo({top:0,behavior:"smooth"})}},watch:{res:{handler:"resHandler",immediate:!0}}},U={class:"p-auth"},H={key:0,class:"prompts"},I={class:"inputs"},M=d("hr",null,null,-1),j={class:"notes"};O.render=function(e,t,n,a,s,o){return r(),i("div",U,[d("h1",null,p(n.title),1),d("form",{onSubmit:t[2]||(t[2]=h(((...e)=>o.submit&&o.submit(...e)),["prevent"]))},[n.res&&n.res.type?(r(),i("div",H,[d("div",{type:n.res.type,class:e.prompt?"":"out"},[d("div",null,p(n.res.message),1),d("i",{class:"fa fa-times-circle",onClick:t[1]||(t[1]=t=>e.prompt=!1),"aria-hidden":"true"})],10,["type"])])):m("",!0),d("div",I,[g(e.$slots,"form")])],32),M,d("div",j,[g(e.$slots,"notes")])])};const V={components:{AuthForm:O},data:()=>({loading:!1,serv:{type:"",message:""}}),methods:{onAuthStateChanged(e){e&&this.$router.push("/home")}}},z=d("div",null,[d("label",null,"Username"),d("input",{type:"text",name:"user",autocomplete:"email",required:""})],-1),G=d("div",null,[d("label",null,"Password"),d("input",{type:"password",name:"pass",autocomplete:"",required:""})],-1),R={type:"submit",value:"Authenticate"},J=b(" By logging in, you agree to our "),N=b("Terms and Agreements"),W=b(" Do not have an account? "),X=b("Register");V.render=function(e,t,n,a,s,o){const A=u("router-link"),l=u("auth-form"),p=f("btnload");return r(),i(l,{title:"Login",onOnSubmit:e.authFormLogin,res:e.serv},{form:c((()=>[z,G,d("div",null,[y(d("button",R,null,512),[[p,e.loading]])])])),notes:c((()=>[d("p",null,[J,d(A,{to:"/"},{default:c((()=>[N])),_:1})]),d("p",null,[W,d(A,{to:"/register"},{default:c((()=>[X])),_:1})])])),_:1},8,["onOnSubmit","res"])};const F={components:{AuthForm:O},data:()=>({loading:!1,serv:{type:"",message:""}}),methods:{onAuthStateChanged(e){e&&this.$router.push("/home")}}},K=d("div",null,[d("label",null,"Name"),d("input",{type:"text",name:"name",required:""})],-1),Y=d("div",null,[d("label",null,"Username"),d("input",{type:"text",name:"user",required:""})],-1),Z=d("div",null,[d("label",null,"Email"),d("input",{type:"email",name:"email",required:""})],-1),$=d("div",null,[d("label",null,"Phone"),d("input",{type:"tel",name:"phone",required:""})],-1),_=d("div",null,[d("label",null,"Password"),d("input",{type:"password",name:"pass",autocomplete:"",required:""})],-1),ee=d("div",null,[d("label",null,"Confirm Password"),d("input",{type:"password",name:"cpass",autocomplete:"",required:""})],-1),te={type:"submit",value:"Create Account"},ne=b(" By creating an account, you agree to our "),ae=b("Terms and Agreements"),se=b(" Already have an account? "),oe=b("Login");F.render=function(e,t,n,a,s,o){const A=u("router-link"),l=u("auth-form"),p=f("btnload");return r(),i(l,{title:"Register",onOnSubmit:e.authFormRegister,res:e.serv},{form:c((()=>[K,Y,Z,$,_,ee,d("div",null,[y(d("button",te,null,512),[[p,e.loading]])])])),notes:c((()=>[d("p",null,[ne,d(A,{to:"/"},{default:c((()=>[ae])),_:1})]),d("p",null,[se,d(A,{to:"/login"},{default:c((()=>[oe])),_:1})])])),_:1},8,["onOnSubmit","res"])};const Ae={methods:{logoutBtn(){this.resetStore(),this.$router.push("/")},cancelBtn(){this.$router.go(-1)}}};Ae.render=function(e,t,n,a,s,o){const A=u("confirm-dialog");return r(),i(A,{title:"Logout",message:"Are you sure you want to logout?",onOnConfirm:o.logoutBtn,onOnClose:o.cancelBtn,onOnCancel:o.cancelBtn},null,8,["onOnConfirm","onOnClose","onOnCancel"])};const le={};le.render=function(e,t){const n=u("router-view"),a=u("lo-user");return r(),i(a,null,{default:c((()=>[d(n)])),_:1})};const re={async created(){const e=await this.$tuos.auth.userMe();console.log(e)}},ie=d("h1",null,"Home sweet home",-1),ue=b("Logout");re.render=function(e,t,n,a,s,o){const A=u("router-link");return r(),i("div",null,[ie,d(A,{to:"/logout"},{default:c((()=>[ue])),_:1})])};const ce={};ce.render=function(e,t){const n=u("router-view"),a=u("lo-settings");return r(),i(a,null,{default:c((()=>[d(n)])),_:1})};const de={data:()=>({isComponentLoading:!0,loading:!1,odata:{name:"",user:"",email:"",phone:""},data:{name:"",user:"",email:"",phone:"",pass:"",cpass:""},opass:"",serv:{type:"",message:""}}),async created(){this.odata=await this.$tuos.auth.userMe(),console.log(this.odata),this.data=this.odata}},pe={class:"basic-info-container"},me=d("div",{class:"header"},"Basic Information",-1),ge={class:"forms-container"},he=d("div",{class:"dp-form"},[d("img",{src:"data:image/jpeg;base64,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",alt:""}),d("button",{class:"upload"},"UPLOAD")],-1),fe={class:"info-form"},ye=d("label",{for:"name"},"Name",-1),be=d("label",{for:"name"},"Username",-1),ve=d("label",{for:"name"},"Email",-1),Qe=d("label",{for:"name"},"Phone",-1),xe=d("label",{for:"pass"},"New Password",-1),Ee=d("label",{for:"pass"},"Confirm New Password",-1);de.render=function(e,t,n,a,s,o){const A=u("confirm-dialog"),l=f("btnload");return r(),i("div",pe,[me,d(A),d("form",ge,[he,d("div",fe,[ye,y(d("input",{type:"text",name:"name","onUpdate:modelValue":t[1]||(t[1]=t=>e.data.name=t),disabled:e.loading},null,8,["disabled"]),[[v,e.data.name]]),be,y(d("input",{type:"text",name:"user","onUpdate:modelValue":t[2]||(t[2]=t=>e.data.user=t),disabled:e.loading},null,8,["disabled"]),[[v,e.data.user]]),ve,y(d("input",{type:"email",name:"email","onUpdate:modelValue":t[3]||(t[3]=t=>e.data.email=t),disabled:e.loading},null,8,["disabled"]),[[v,e.data.email]]),Qe,y(d("input",{type:"text",name:"phone","onUpdate:modelValue":t[4]||(t[4]=t=>e.data.phone=t),disabled:e.loading},null,8,["disabled"]),[[v,e.data.phone]]),xe,y(d("input",{type:"password",name:"pass","onUpdate:modelValue":t[5]||(t[5]=t=>e.data.pass=t),disabled:e.loading,autocomplete:""},null,8,["disabled"]),[[v,e.data.pass]]),Ee,y(d("input",{type:"password",name:"cpass","onUpdate:modelValue":t[6]||(t[6]=t=>e.data.cpass=t),disabled:e.loading,autocomplete:""},null,8,["disabled"]),[[v,e.data.cpass]]),y(d("button",{type:"submit",onClick:t[7]||(t[7]=t=>e.loading=!e.loading),value:"SAVE"},null,512),[[l,e.loading]])])])])};const Pe={components:{BasicInfo:de}},Se={class:"p-settings-profile"};Pe.render=function(e,t,n,a,s,o){const A=u("basic-info");return r(),i("div",Se,[d(A)])};const Ce={},Te={class:"p-user-profile"},ke=d("h1",null,"User Profile",-1);Ce.render=function(e,t){return r(),i("div",Te,[ke])};const Be=Q({history:x(),routes:[{path:"/",component:L,children:[{path:"",component:V},{path:"login",component:V},{path:"register",component:F},{path:"logout",component:Ae}]},{path:"/user",component:le,children:[{path:"/me",component:Ce},{path:"/home",component:re},{path:"/settings",component:ce,children:[{path:"",component:Pe}]}]}]}),De={name:"defaultLayout"},qe={class:"lo-default"};De.render=function(e,t,n,a,s,o){return r(),i("div",qe,[g(e.$slots,"default")])};const we={name:"layoutUser",data:()=>({menu:!1})},Le={class:"lo-user"},Oe={class:"brand__search"},Ue=E('<li class="search"><form action=""><input type="text" placeholder="Search" name="q"><button type="Submit"><i class="fa fa-search"></i></button></form></li>',1),He={class:"main__navi"},Ie=d("i",{class:"fa fa-home"},null,-1),Me=d("i",{class:"fa fa-cog"},null,-1),je=d("i",{class:"fa fa-caret-down"},null,-1),Ve={class:"menu-content"},ze={class:"items"},Ge=d("i",{class:"fa fa-user-circle"},null,-1),Re=d("span",null,"Profile",-1),Je=d("i",{class:"fa fa-sign-out"},null,-1),Ne=d("span",null,"Logout",-1),We={class:"main"};we.render=function(e,t,n,a,s,o){const A=u("router-link");return r(),i("div",Le,[d("header",null,[d("ul",Oe,[d("li",{class:"brand",onClick:t[1]||(t[1]=t=>e.$router.go(0))},"Tuos"),Ue]),d("ul",He,[d("li",null,[d(A,{to:"/home",onClick:t[2]||(t[2]=t=>e.menu=!1)},{default:c((()=>[Ie])),_:1})]),d("li",null,[d(A,{to:"/settings",onClick:t[3]||(t[3]=t=>e.menu=!1)},{default:c((()=>[Me])),_:1})]),d("li",null,[d("div",{class:"menu",active:e.menu},[d("a",{href:"#",class:"toggle-menu",onClick:t[4]||(t[4]=t=>e.menu=!e.menu)},[je]),d("div",Ve,[d("div",ze,[d(A,{to:"/me",class:"item"},{default:c((()=>[Ge,Re])),_:1}),d(A,{to:"/logout",class:"item"},{default:c((()=>[Je,Ne])),_:1})])])],8,["active"])])])]),d("div",We,[g(e.$slots,"default")])])};const Xe={},Fe={class:"lo-settings"},Ke={class:"left-nav"},Ye=b("Edit Profile"),Ze=b("Home"),$e={class:"main"};Xe.render=function(e,t,n,a,s,o){const A=u("router-link");return r(),i("div",Fe,[d("div",Ke,[d(A,{to:"/settings"},{default:c((()=>[Ye])),_:1}),d(A,{to:"/home"},{default:c((()=>[Ze])),_:1})]),d("div",$e,[g(e.$slots,"default")])])};var _e={install:e=>{e.component("lo-default",De),e.component("lo-user",we),e.component("lo-settings",Xe)}};const et={props:{ConfirmText:{type:String,default:"Confirm"},CancelText:{type:String,default:"Cancel"},title:{type:String,default:"Confirm"},message:{type:String,default:"Are you sure?"}},data:()=>({dialog:!0}),methods:{closeDialog(){this.$emit("onClose"),this.dialog=!1},cancelDialog(){this.$emit("onCancel"),this.dialog=!1},confirmDialog(){this.$emit("onConfirm"),this.dialog=!1}}},tt={key:0,class:"c-confirm-dialog-container"},nt={class:"dialog"},at={class:"title"},st={class:"message"},ot={class:"actions"};et.render=function(e,t,n,a,s,o){return e.dialog?(r(),i("dialog",tt,[d("div",nt,[d("div",at,[d("span",null,p(n.title),1),d("button",{onClick:t[1]||(t[1]=(...e)=>o.cancelDialog&&o.cancelDialog(...e))},"x")]),d("div",st,p(n.message),1),d("div",ot,[d("button",{onClick:t[2]||(t[2]=(...e)=>o.cancelDialog&&o.cancelDialog(...e))},p(n.CancelText),1),d("button",{onClick:t[3]||(t[3]=(...e)=>o.confirmDialog&&o.confirmDialog(...e))},p(n.ConfirmText),1)])])])):m("",!0)};var At={install:e=>{e.component("confirm-dialog",et)}},lt=(e,t)=>{var n;const a=null!=(n=t.value)&&n;e.innerHTML=a?'<i class="fa fa-spinner fa-spin"></i>':e.value,a?e.setAttribute("disabled",!0):e.removeAttribute("disabled")},rt={install:(e,t)=>{e.directive("btnload",lt)}};const it=new P({storage:window.localStorage}),ut=S.get("vuex")||{},ct={accessToken:"",authenticated:!1};var dt={store:C({plugins:[T(),it.plugin],state:(()=>{const e={};for(let t in ct)e[t]=ut[t]||ct[t];return e})(),mutations:(()=>{const e={};for(let t in ct)e[t]=(e,n)=>{e[t]=n};return e})()}),state:ct};var pt={proto:function(e){const{host:t}=e,n={login:"/api/auth/login",register:"/api/auth/register",userMe:"/api/user"},a=e=>t+n[e];return{login:async(e={})=>{const t={method:"POST",url:a("login"),headers:{"content-type":"application/json"},data:e};return await D.request(t).then((e=>e.data)).catch((()=>({type:"error",message:"Unknown error occur."})))},register:async(e={})=>{const t={method:"POST",url:a("register"),headers:{"content-type":"application/json"},data:e};return await D.request(t).then((e=>e.data)).catch((()=>({type:"error",message:"Unknown error occur."})))},userMe:async()=>{const e=S.get("vuex").accessToken||"",t={method:"GET",url:a("userMe"),headers:{authorization:"Bearer "+e}};return await D.request(t).then((e=>e.data)).catch((e=>({type:"error",message:"Unknown error occur.",e:e})))}}},mixin:{computed:l({},k(["accessToken","authenticated"])),methods:{accessTokenHandler(){},accessTokenValidateChange(e){e&&"string"==typeof e&&e.length>0?this.$store.commit("authenticated",!0):this.$store.commit("authenticated",!1)},onAuthStateChanged(){},resetStore(){S.clearAll();const e=dt.state;for(let t in e)this.$store.commit(t,e[t])},async authFormLogin(e){this.loading=!0,await this.$tuos.auth.login(e).then((e=>{this.serv=e,this.$store.commit("accessToken",e.token)})).catch((()=>this.serv={type:"error",message:"Unknown error occur."})).finally((()=>{this.loading=!1}))},async authFormRegister(e){Boolean(e.pass)&&Boolean(e.cpass)&&e.pass==e.cpass?(this.loading=!0,await this.$tuos.auth.register(B.omit(e,["cpass"])).then((e=>{this.serv=e,this.$store.commit("accessToken",e.token)})).catch((()=>this.serv={type:"error",message:"Unknown error occur."})).finally((()=>{this.loading=!1}))):this.serv={type:"error",message:"Password doesn't match"}}},watch:{accessToken:{handler:"accessTokenHandler",immediate:!0},accessToken:{handler:"accessTokenValidateChange",immediate:!0},authenticated:{handler:"onAuthStateChanged",immediate:!0}}}},mt={install:(e,a)=>{const s=a.host||"",o=a.devHost||s,A=s;var r;r=l({},a),a=t(r,n({prodHost:s,devHost:o,host:A})),e.config.globalProperties.$tuos={auth:pt.proto(a)},e.mixin(pt.mixin)}};const gt=q(w);gt.use(dt.store),gt.use(Be),gt.use(At),gt.use(_e),gt.use(rt),gt.use(mt,{devHost:"http://localhost:8080"}),gt.mount("#app");