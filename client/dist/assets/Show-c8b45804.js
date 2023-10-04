import{u as j,h as m,o as r,c as n,a as t,t as _,b as d,f as o,g as B,R as C,i as f,j as I,F as S,n as A,p as D,q as E,k as L,r as $}from"./index-0f3924ee.js";import{E as z,D as N,L as P}from"./LoadingButton-447b037d.js";const R={class:"shadow-sm mb-4 p-4 rounded-sm"},V={class:"bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter"},F={class:"font-bold text-xl mb-1 text-cyan-800"},M={key:0,class:"mt-2 flex"},U={__name:"TaskCard",props:{task:Object},setup(s){const l=j();m.defaults.headers.common.Authorization=`Bearer ${l.authToken}`;const c=(a,e)=>{I(e,`/tasks/${a}`,"")};return(a,e)=>(r(),n("div",R,[t("div",V,[t("h1",F,_(s.task.title),1),t("p",null,_(s.task.description),1),d(l).authUser===1?(r(),n("div",M,[o(d(C),{to:{name:"editTask",params:{id:s.task.id}},class:"hover:text-green-800"},{default:B(()=>[o(z)]),_:1},8,["to"]),t("button",{class:"hover:text-red-800",onClick:e[0]||(e[0]=u=>c(s.task.id,"tarea"))},[o(N)])])):f("",!0)])]))}},q={class:"flex px-4 pb-8 items-start overflow-x-scroll border border-cyan-800 bg-slate-400 bg-opacity-20"},H={class:"rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3"},O={class:"flex justify-between py-1"},G={class:"text-sm font-bold"},J={class:"text-sm mt-2"},K={class:"text-sm mt-2"},h={__name:"TaskColum",props:{title:String,tasks:Array},setup(s){return(l,c)=>(r(),n("div",q,[t("div",H,[t("div",O,[t("h3",G,_(s.title),1)]),t("div",J,[t("div",K,[(r(!0),n(S,null,A(s.tasks,a=>(r(),D(U,{key:a.id,task:a},null,8,["task"]))),128))])])])]))}},Q={class:"container mx-auto mt-6"},W={class:"w-full shadow-md p-5"},X={key:0,class:"w-full"},Y=t("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})],-1),Z={class:"w-full flex justify-center align-items-center mt-10 mx-2 px-2"},tt={key:0,class:"min-h-screen w-full h-full fixed top-[0] flex items-center justify-center bg-gray-500 bg-opacity-[10%]"},ot={__name:"Show",setup(s){const l=E(),c=j();m.defaults.headers.common.Authorization=`Bearer ${c.authToken}`;let a;L(()=>{var i;a=(i=l.params)==null?void 0:i.projectId,T()});const e=$({}),u=$(!1),T=async()=>{await m.get(`/projects/${a}`).then(i=>{e.value=i.data}),u.value=!0};return(i,et)=>{var k,p,x,v,g,b,w,y;return r(),n(S,null,[t("div",Q,[t("div",W,[d(c).authUser===1?(r(),n("div",X,[o(d(C),{to:{name:"createTask",params:{projectId:(p=(k=e.value)==null?void 0:k.project)==null?void 0:p.id}},class:"flex justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"},{default:B(()=>[Y]),_:1},8,["to"])])):f("",!0)])]),t("div",Z,[o(h,{title:"Pendiente",tasks:(v=(x=e.value)==null?void 0:x.tasks)==null?void 0:v.pendiente},null,8,["tasks"]),o(h,{title:"En progreso",tasks:(b=(g=e.value)==null?void 0:g.tasks)==null?void 0:b.en_progreso},null,8,["tasks"]),o(h,{title:"Completada",tasks:(y=(w=e.value)==null?void 0:w.tasks)==null?void 0:y.completada},null,8,["tasks"])]),u.value?f("",!0):(r(),n("div",tt,[o(P)]))],64)}}};export{ot as default};
