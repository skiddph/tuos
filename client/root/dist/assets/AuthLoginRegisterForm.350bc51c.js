import{c as t,e as s,t as e,f as n,l as o,o as i}from"./vendor.ab59992e.js";const m={name:"AuthLoginRegisterForm",props:{title:{type:String}},methods:{submit(t){const s={},e=t.srcElement.getElementsByTagName("input");for(let n=0;n<e.length;n++)if("submit"!=e[n].type){const t=e[n].name,o=e[n].value;s[t]=o}this.$emit("onSubmit",s)}}},r={class:"p-auth"},a={class:"notes"};m.render=function(m,l,u,p,c,b){return i(),t("div",r,[s("h1",null,e(u.title),1),s("form",{onSubmit:l[1]||(l[1]=o(((...t)=>b.submit&&b.submit(...t)),["prevent"]))},[n(m.$slots,"form")],32),s("div",a,[n(m.$slots,"notes")])])};export{m as _};
