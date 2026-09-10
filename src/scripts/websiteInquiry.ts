import { installAnimatedDisclosures } from './animatedDisclosures';
import { websiteInquiryContent } from '../data/websiteInquiryContent';
import { websiteCopy } from '../data/websiteServiceContent';

const root = document.querySelector<HTMLElement>('[data-website-service]');
if (root) {
 installAnimatedDisclosures(root);
 const locale = root.dataset.locale === 'en' ? 'en' : 'de';
 const t = websiteCopy(locale);
 const c = websiteInquiryContent[locale];
 const form = root.querySelector<HTMLFormElement>('#inquiry-form')!;
 const question = root.querySelector<HTMLElement>('#question')!;
 const error = root.querySelector<HTMLElement>('#form-error')!;
 const back = root.querySelector<HTMLButtonElement>('#back')!;
 const next = root.querySelector<HTMLButtonElement>('#next')!;
 const actions = root.querySelector<HTMLElement>('.form-actions')!;
 const heading = () => question.querySelector<HTMLElement>('#question-title');
 const escape = (value: string) => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
 const arrow = '<svg class="arrow" aria-hidden="true"><use href="#arrow"/></svg>';
 let step = 0, editing = false, other = '', email = '', message = '', busy = false;
 let pendingId = '', pendingPayload = '';
 const finalStep = c.steps.length - 1;
 const endpoint = root.dataset.inquiryEndpoint ?? '';
 const ids = {project:['new','improve','unsure'],business:['property-maintenance','joinery','carpentry','construction','other'],priority:['services','portfolio','enquiries','hiring','appearance','unsure']};
 const values = ['', '', '', ''];
 function focusQuestion() {
  heading()?.focus({preventScroll:true});
  const y = question.getBoundingClientRect().top;
  if (y < 0 || y > window.innerHeight - 100) question.scrollIntoView({block:'start',behavior:'instant'});
 }
 const panels = [
  ['DAS bieten Sie an.','Ihre Leistungen klar dargestellt, helfen Besuchern einzuschätzen, ob ihr Vorhaben gut umgesetzt wird.'],
  ['Das haben Sie umgesetzt.','Eigene Arbeiten machen Qualität und Ausführung nachvollziehbar. Wir setzen in Szene, was Sie leisten können.'],
  ['So beginnt ein Projekt mit Ihnen.','Ein verständlicher nächster Schritt macht es Interessenten leicht, ihr Vorhaben anzufragen.']
 ];
 function selectPanel(index: number) {
  root!.querySelectorAll<HTMLElement>('[data-panel]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.panel) === index)));
  root!.querySelector('#trust-title')!.textContent = t(panels[index][0]);
  root!.querySelector('#trust-description')!.textContent = t(panels[index][1]);
  root!.querySelectorAll<HTMLImageElement>('[data-trust-image]').forEach(image => {
   const selected = Number(image.dataset.trustImage) === index;
   image.classList.toggle('is-active', selected);
   image.setAttribute('aria-hidden', String(!selected));
  });
 }
 root.querySelectorAll<HTMLElement>('[data-panel]').forEach(button => button.addEventListener('click',()=>selectPanel(Number(button.dataset.panel))));
 root.querySelectorAll<HTMLElement>('[data-trust]').forEach(button => button.addEventListener('click',()=>{
  selectPanel(Number(button.dataset.trust));
  root.querySelector('#vertrauen')!.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }));
 function save() {
  if(step===1) other=question.querySelector<HTMLInputElement>('#other')?.value.trim() ?? other;
  if(step===3) values[3]=question.querySelector<HTMLInputElement>('#website')!.value.trim();
  if(step===finalStep) {message=question.querySelector<HTMLTextAreaElement>('#note')!.value.trim();email=question.querySelector<HTMLInputElement>('#email')!.value.trim();}
 }
 const valueText = (i:number) => i===1 && values[1]===c.steps[1].options[4] && other ? `${values[1]} · ${other}` : values[i] || c.none;
 function render(focus=false) {
  error.hidden=true; actions.hidden=false;
  root!.querySelector('#step-count')!.textContent=step===finalStep?c.contactLabel:`${c.questionLabel} ${step+1} / ${finalStep}`;
  root!.querySelector<HTMLElement>('#progress-bar')!.style.width=`${(step+1)/c.steps.length*100}%`;
  const s=c.steps[step];
  let html=`<h3 id="question-title" tabindex="-1">${escape(s.title)}</h3>`;
  if('options' in s) {
   html+=`<fieldset class="choices" aria-labelledby="question-title">${s.options.map(option=>`<label class="choice"><input type="radio" name="answer" value="${escape(option)}" ${values[step]===option?'checked':''}><span>${escape(option)}</span></label>`).join('')}</fieldset>`;
   if(step===1)html+=`<div id="other-wrap" ${values[1]===s.options[4]?'':'hidden'}><label class="field-label" for="other">${c.other}</label><input class="text-field" id="other" maxlength="120" value="${escape(other)}" placeholder="${c.otherHint}"></div>`;
  } else if(s.type==='url') html+=`<p class="form-hint">${c.urlHint}</p><label class="field-label" for="website">${c.urlLabel}</label><input class="text-field" type="text" inputmode="url" id="website" name="website" maxlength="250" placeholder="${c.urlPlaceholder}" value="${escape(values[3])}">`;
  else {
   html+=`<details class="review-answers"><summary>${c.review}</summary><dl class="summary-list">${values.map((_,i)=>`<div class="summary-row"><div><dt>${c.steps[i].label}</dt><dd>${escape(valueText(i))}</dd></div><button class="edit" type="button" data-edit="${i}" aria-label="${c.steps[i].label} ${c.editLabel}">${c.edit}</button></div>`).join('')}</dl></details><p class="form-hint">${c.summaryHint}</p><label class="field-label" for="note">${c.noteLabel}</label><textarea class="text-field" id="note" name="message" maxlength="1000" rows="3" placeholder="${c.notePlaceholder}">${escape(message)}</textarea><label class="field-label" for="email">${c.emailLabel}</label><input class="text-field" type="email" id="email" name="email" required maxlength="254" autocomplete="email" inputmode="email" value="${escape(email)}" placeholder="${c.emailPlaceholder}"><div class="form-trap" aria-hidden="true"><label for="company-website">${c.honeypot}</label><input id="company-website" type="text" tabindex="-1" autocomplete="off" name="company_website"></div><p class="caption">${c.emailHint} <a href="/${locale}/${locale==='de'?'datenschutz':'privacy'}/">${c.privacy}</a></p>`;
  }
  question.innerHTML=html;
  back.hidden=step===0;
  next.innerHTML=escape(step===finalStep?c.submit:editing?c.apply:step===3?c.skip:c.next)+' '+arrow;
  question.querySelectorAll<HTMLInputElement>('[name="answer"]').forEach(radio=>radio.addEventListener('change',()=>{
   values[step]=radio.value;
   if(step===1)question.querySelector<HTMLElement>('#other-wrap')!.hidden=radio.value!==c.steps[1].options[4];
   error.hidden=true;
  }));
  question.querySelectorAll<HTMLElement>('[data-edit]').forEach(button=>button.addEventListener('click',()=>{save();step=Number(button.dataset.edit);editing=true;render(true)}));
  if(focus)focusQuestion();
 }
 function invalid(message:string,target?:HTMLElement|null) {
  error.textContent=message;error.hidden=false;target?.setAttribute('aria-invalid','true');target?.setAttribute('aria-describedby','form-error');target?.focus();
 }
 async function submitInquiry() {
  if(busy)return;
  if(!endpoint) {invalid(c.unavailableError);return;}
  const payload={
   locale,
   projectType:ids.project[c.steps[0].options.indexOf(values[0] as never)],
   businessType:ids.business[c.steps[1].options.indexOf(values[1] as never)],
   otherTrade:values[1]===c.steps[1].options[4]?other:'',
   priority:ids.priority[c.steps[2].options.indexOf(values[2] as never)],
   website:values[3],message,email,
   companyWebsite:question.querySelector<HTMLInputElement>('#company-website')!.value
  };
  const serialized=JSON.stringify(payload);
  // Reuse the same id after a timeout so a retry cannot create a second enquiry.
  if(pendingPayload!==serialized||!pendingId){pendingId=crypto.randomUUID();pendingPayload=serialized;}
  busy=true;error.hidden=true;form.setAttribute('aria-busy','true');
  const controls=[...form.querySelectorAll<HTMLInputElement|HTMLButtonElement|HTMLTextAreaElement>('input,button,textarea')];
  controls.forEach(control=>control.disabled=true);next.textContent=c.sending;
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  try {
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',body:JSON.stringify({...payload,requestId:pendingId}),signal:controller.signal});
   const result=await response.json();
   if(response.status===429)throw new Error('Rate limited');
   if(!response.ok||result.status!=='accepted'||result.requestId!==pendingId)throw new Error('Unconfirmed request');
   question.innerHTML=`<div class="success-icon"><svg class="arrow" aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg></div><h3 tabindex="-1" id="question-title">${c.successTitle}</h3><p class="form-hint">${c.successBody}</p><p class="caption">${c.successReference}: <span>${escape(pendingId)}</span></p><button type="button" class="btn secondary" id="new-inquiry">${c.newInquiry}</button>`;
   actions.hidden=true;
   question.querySelector('#new-inquiry')!.addEventListener('click',()=>{step=0;editing=false;other='';email='';message='';values.fill('');pendingId='';pendingPayload='';render(true)});
   focusQuestion();
  } catch(e) {
   invalid(e instanceof Error&&e.name==='AbortError'?c.timeoutError:e instanceof Error&&e.message==='Rate limited'?c.rateError:c.retryError);
   error.setAttribute('tabindex','-1');error.focus();
  } finally {
   clearTimeout(timeout);busy=false;form.removeAttribute('aria-busy');controls.forEach(control=>control.disabled=false);next.innerHTML=escape(c.submit)+' '+arrow;
  }
 }
 form.addEventListener('input',event=>{error.hidden=true;if(event.target instanceof HTMLElement){event.target.removeAttribute('aria-invalid');event.target.removeAttribute('aria-describedby')}});
 form.addEventListener('submit',event=>{
  event.preventDefault();if(busy)return;save();
  if('options' in c.steps[step]&&!values[step])return invalid(c.selectError,question.querySelector('input'));
  if(step===3&&values[3]) {
   try{const url=new URL(/^[a-z]+:\/\//i.test(values[3])?values[3]:'https://'+values[3]);if(!['http:','https:'].includes(url.protocol)||!url.hostname.includes('.')||/\s/.test(values[3]))throw Error();}
   catch{return invalid(c.urlError,question.querySelector<HTMLInputElement>('#website'));}
  }
  if(step===finalStep){const input=question.querySelector<HTMLInputElement>('#email')!;if(message.length>1000)return invalid(c.messageError,question.querySelector<HTMLTextAreaElement>('#note'));if(!email||!input.validity.valid||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))return invalid(c.emailError,input);void submitInquiry();return;}
  if(editing){step=finalStep;editing=false;}else step++;
  render(true);
 });
 back.addEventListener('click',()=>{if(busy)return;save();if(editing){step=finalStep;editing=false;}else step--;render(true)});
 render();
}
