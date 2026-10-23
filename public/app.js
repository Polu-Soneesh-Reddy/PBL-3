(() => {
  "use strict";
  const KEY="carepoint-demo-appointments-v3";
  const el=id=>document.getElementById(id);
  const d=new Date(), today=[d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");
  let appointments=[];
  try { const v=JSON.parse(sessionStorage.getItem(KEY)||"[]"); if(Array.isArray(v)) appointments=v.filter(x=>x&&typeof x.name==="string"&&typeof x.date==="string"); } catch {}
  const save=()=>{try{sessionStorage.setItem(KEY,JSON.stringify(appointments));}catch{}};
  const node=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;};
  function summary(){const total=appointments.length;const upcoming=appointments.filter(a=>!a.completed&&a.date>=today).length;const done=appointments.filter(a=>a.completed).length;
    if(el("totalCount"))el("totalCount").textContent=total;if(el("upcomingCount"))el("upcomingCount").textContent=upcoming;if(el("completedCount"))el("completedCount").textContent=done;
    if(el("navAppointmentCount"))el("navAppointmentCount").textContent=total;if(el("listCount"))el("listCount").textContent=`${total} ${total===1?"record":"records"}`;
  }
  function render(){const list=el("appointmentsList");if(!list){summary();return;}list.replaceChildren();const f=el("appointmentFilter")?.value||"all";
    const rows=appointments.filter(a=>f==="all"||(f==="upcoming"&&!a.completed&&a.date>=today)||(f==="completed"&&a.completed)).sort((a,b)=>a.date.localeCompare(b.date));
    if(!rows.length){const empty=node("div","empty-state");empty.append(node("span","","▣"),node("strong","",appointments.length?"No matching appointments":"No appointments yet"),node("p","",appointments.length?"Try another filter.":"Your demo appointments will appear here."));list.append(empty);summary();return;}
    rows.forEach(a=>{const card=node("article","appointment-card"),details=node("div","");details.append(node("h3","",a.name),node("p","",a.email),node("p","","Date: "+a.date),node("span","department-tag",a.department));const actions=node("div","appointment-actions");actions.append(node("span","status"+(a.completed?" done":""),a.completed?"Completed":"Scheduled"));const toggle=node("button","text-button",a.completed?"Reopen":"Mark complete");toggle.type="button";toggle.onclick=()=>{a.completed=!a.completed;save();render();};const del=node("button","text-button danger","Delete");del.type="button";del.onclick=()=>{appointments=appointments.filter(x=>x.id!==a.id);save();render();};actions.append(toggle,del);card.append(details,actions);list.append(card);});summary();}
  const form=el("appointmentForm");
  if(form){const date=el("appointmentDate");date.min=today;form.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(form),name=String(fd.get("patientName")||"").trim(),email=String(fd.get("patientEmail")||"").trim(),department=String(fd.get("department")||""),dateValue=String(fd.get("appointmentDate")||"");const msg=el("formMessage");if(!name||!email||!department||!dateValue){msg.textContent="Please complete every field.";return;}if(dateValue<today){msg.textContent="Choose today or a future date.";return;}appointments.push({id:Date.now(),name,email,department,date:dateValue,completed:false});save();form.reset();date.min=today;msg.textContent="Demo appointment added.";render();});}
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".sidebar nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) link.classList.add("active");
  });
  el("appointmentFilter")?.addEventListener("change",render);
  el("dismissNotice")?.addEventListener("click",()=>document.querySelector(".notice")?.remove());
  el("mobileMenu")?.addEventListener("click",()=>document.querySelector(".sidebar")?.classList.toggle("sidebar-open"));
  summary();render();
})();