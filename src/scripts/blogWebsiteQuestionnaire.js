(() => {
  for (const root of document.querySelectorAll('[data-blog-questionnaire]')) {
    if (root.dataset.ready) continue;
    root.dataset.ready = 'true';
    const form=root.querySelector('[data-bq-form]');
    const panels=[...root.querySelectorAll('[data-bq-panel]')];
    const next=root.querySelector('[data-bq-next]');
    const back=root.querySelector('[data-bq-back]');
    const error=root.querySelector('#bq-error');
    const email=root.querySelector('[name=email]');
    const result=root.querySelector('[data-bq-result]');
    const fields=['updateFrequency','contentOwner','updateObstacle'];
    const preview=root.dataset.preview!=='false'||location.protocol==='file:';
    let step=0,busy=false,advancing=false,lastChoiceAt=-Infinity,requestId,submittedPayload;
    const value=name=>form.elements.namedItem(name).value;
    const clearError=()=>{error.hidden=true;error.textContent='';email.removeAttribute('aria-invalid');};
    const showError=(text,focus)=>{error.textContent=text;error.hidden=false;if(focus)focus.focus();};
    const showStep=(target,focus=true)=>{
      step=target;clearError();
      panels.forEach((panel,i)=>{panel.hidden=i!==step;});
      back.hidden=step===0;
      const progress=root.querySelector('[data-bq-progress]');
      progress.textContent=step<3?`Frage ${step+1} von 3`:'';progress.hidden=step===3;
      if(step===3){
        const answers=root.querySelector('[data-bq-answers]');answers.replaceChildren();
        fields.forEach((name,i)=>{
          const selected=form.querySelector(`[data-name="${name}"][data-value="${value(name)}"]`);
          const dt=document.createElement('dt');dt.textContent=panels[i].querySelector('h3').textContent;
          const dd=document.createElement('dd');dd.textContent=selected?.querySelector('.bq-choice-label').textContent??'Noch nicht beantwortet';answers.append(dt,dd);
        });
      }
      if(focus)panels[step].querySelector('h3').focus({preventScroll:true});
    };
    for(const button of root.querySelectorAll('[data-bq-choice]'))button.addEventListener('click',()=>{
      if(busy||advancing||performance.now()-lastChoiceAt<400)return;
      lastChoiceAt=performance.now();
      const {name,value:selected}=button.dataset;
      form.elements.namedItem(name).value=selected;
      for(const option of root.querySelectorAll(`[data-name="${name}"]`))option.setAttribute('aria-pressed',String(option===button));
      advancing=true;
      const delay=matchMedia('(prefers-reduced-motion: reduce)').matches?0:140;
      setTimeout(()=>{showStep(Math.min(step+1,3));advancing=false;},delay);
    });
    back.addEventListener('click',()=>{if(!busy&&!advancing)showStep(Math.max(0,step-1));});
    root.querySelector('[data-bq-edit]').addEventListener('click',()=>{if(!busy)showStep(0);});
    form.addEventListener('input',clearError);
    root.querySelector('[data-bq-restart]').addEventListener('click',()=>{result.hidden=true;form.hidden=false;showStep(0);});
    form.addEventListener('submit',async event=>{
      event.preventDefault();if(busy||advancing)return;clearError();
      for(let i=0;i<fields.length;i++)if(!value(fields[i])){showStep(i);showError('Bitte wählen Sie eine Antwort aus.',panels[i].querySelector('button'));return;}
      email.value=email.value.trim();
      if(!email.validity.valid||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email.value)){email.setAttribute('aria-invalid','true');showError('Bitte geben Sie eine gültige E-Mail-Adresse ein.',email);return;}
      const complete=(title,copy)=>{form.hidden=true;result.hidden=false;root.querySelector('[data-bq-result-title]').textContent=title;root.querySelector('[data-bq-result-copy]').textContent=copy;result.focus({preventScroll:true});};
      if(preview){complete('Vorschau erfolgreich geprüft','Ihre Antworten und die E-Mail-Adresse sind vollständig. Es wurde keine Anfrage versendet und nichts gespeichert.');return;}
      const data=new FormData(form);
      const payload={email:data.get('email'),updateFrequency:data.get('updateFrequency'),contentOwner:data.get('contentOwner'),updateObstacle:data.get('updateObstacle'),companyWebsite:data.get('companyWebsite')};
      const serialized=JSON.stringify(payload);
      if(serialized!==submittedPayload){requestId=crypto.randomUUID();submittedPayload=serialized;}
      busy=true;for(const control of form.querySelectorAll('input,button'))control.disabled=true;
      next.textContent='Anfrage wird gesendet …';form.setAttribute('aria-busy','true');
      const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
      try{
        const response=await fetch('/api/blog-inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,requestId}),signal:controller.signal});
        const body=await response.json().catch(()=>({}));
        if(!response.ok||body.ok!==true||body.reference!==requestId)throw new Error('unconfirmed');
        complete('Vielen Dank für Ihre Anfrage',`Ihre Anfrage ist eingegangen. Wir melden uns per E-Mail zu Ihren Antworten. Ihre Referenz: ${body.reference}`);
      }catch{
        showError('Der Eingang Ihrer Anfrage konnte nicht bestätigt werden. Bitte versuchen Sie es erneut oder schreiben Sie an contact@vibeperform.com.');
      }finally{
        clearTimeout(timeout);busy=false;for(const control of form.querySelectorAll('input,button'))control.disabled=false;
        next.textContent='Senden';form.removeAttribute('aria-busy');if(!error.hidden)next.focus();
      }
    });
    form.hidden=false;showStep(0,false);
  }
})();
