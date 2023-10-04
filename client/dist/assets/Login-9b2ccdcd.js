import{u as g,r as f,o as d,c as m,a as e,w as p,b as a,d as l,v as n,e as r,f as u,g as x,R as _}from"./index-0f3924ee.js";const w={class:"flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"},v=e("div",{class:"sm:mx-auto sm:w-full sm:max-w-sm"},[e("img",{class:"mx-auto h-10 w-auto",src:"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",alt:"Your Company"}),e("h2",{class:"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"},"Iniciar sesión")],-1),h={class:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm"},b=e("label",{for:"email",class:"block text-sm font-medium leading-6 text-gray-900"},"Correo",-1),y={class:"mt-2"},k=e("div",{class:"flex items-center justify-between"},[e("label",{for:"password",class:"block text-sm font-medium leading-6 text-gray-900"},"Password")],-1),V={class:"mt-2"},N=e("div",null,[e("button",{type:"submit",class:"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"},"Iniciar sesión")],-1),j={class:"mt-10 text-center text-sm text-gray-500"},B={__name:"Login",setup(c){const i=g(),s=f({email:"",password:""});return(C,t)=>(d(),m("div",w,[v,e("div",h,[e("form",{onSubmit:t[2]||(t[2]=p(o=>a(i).login(s.value),["prevent"])),class:"space-y-6"},[e("div",null,[b,e("div",y,[l(e("input",{"onUpdate:modelValue":t[0]||(t[0]=o=>s.value.email=o),id:"email",name:"email",type:"email",autocomplete:"email",required:"",class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"},null,512),[[n,s.value.email]])])]),e("div",null,[k,e("div",V,[l(e("input",{"onUpdate:modelValue":t[1]||(t[1]=o=>s.value.password=o),id:"password",name:"password",type:"password",autocomplete:"current-password",required:"",class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"},null,512),[[n,s.value.password]])])]),N],32),e("p",j,[r(" ¿No estas registrado? "),u(a(_),{to:"/register",class:"font-semibold leading-6 text-indigo-600 hover:text-indigo-500"},{default:x(()=>[r("Registrarse ")]),_:1})])])]))}},R={__name:"Login",setup(c){return(i,s)=>(d(),m("main",null,[u(B)]))}};export{R as default};
