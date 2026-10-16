const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),els=new Map();function el(){return {innerHTML:'',textContent:'',value:'',style:{setProperty(){}},dataset:{},classList:{toggle(){},remove(){},contains(){return false},add(){}},setAttribute(){},removeAttribute(){},addEventListener(){},scrollIntoView(){}}}
const events=new Map();
const ctx={console,window:{scrollTo(){},addEventListener(){},print(){}},document:{querySelector(s){if(!els.has(s))els.set(s,el());return els.get(s)},querySelectorAll(){return []},getElementById(s){return this.querySelector('#'+s)},body:el(),documentElement:el(),addEventListener(name,fn){if(!events.has(name))events.set(name,[]);events.get(name).push(fn);}},location:{hash:'#home'},localStorage:{getItem(){return null},setItem(){}},setTimeout(){},clearTimeout(){},Blob,URL,confirm(){return false}};vm.createContext(ctx);
for(const f of ['data.js','conjugations.js','lexicon.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
const run=s=>vm.runInContext(s,ctx),L=ctx.window.LESSONS,T=ctx.window.SARF_TABLES;
assert.equal(L.length,72);assert.equal(new Set(L.map(l=>l.id)).size,72);assert.equal(run('curriculum.length'),72);assert.equal(run('new Set(curriculum.map(l=>l.id)).size'),72);
for(const l of L){assert(l.explanation.length>80);assert(l.synthesis&&l.transfer.synthesis);assert(l.root&&l.weight&&l.family);for(const [key,ids] of Object.entries(l.coverage)){assert(ids.every(id=>l.quiz.some(q=>q.id===id)));}for(const q of l.quiz){assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert(q.explanation.length>10,q.id);assert(q.answer>=0&&q.answer<4);}}
for(const page of ['home','lessons','paths','map','patterns','coverage','practice','review','sources','conjugator','noun-tables','unknown','books','masadir','workshop','safwa','word-review','chapter/nasr','sarf']){ctx.location.hash='#'+page;run('route()');assert(!els.get('#view').innerHTML.includes('undefined'),page);}
for(const l of L)for(const tab of ['read','analysis','qa','quiz']){ctx.location.hash=`#lesson/${l.id}/${tab}`;run('route()');assert(els.get('#view').innerHTML.includes(l.title));assert(!els.get('#view').innerHTML.includes('undefined'),l.id+tab);}
for(const m of T.models)for(const [mode,rows] of Object.entries(m.modes)){assert.equal(rows.length,['command','prohibition'].includes(mode)?6:14);assert(rows.every(r=>r.form&&r.pronoun&&r.person&&r.meaning));}
assert.equal(run('questionPool().length'),run('lexiconQuestions().length')+L.reduce((n,l)=>n+l.quiz.length,0)+T.models.reduce((n,m)=>n+Object.values(m.modes).reduce((n,a)=>n+a.length,0),0));
for(const q of run('questionPool()')){assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);}
run("startQuiz('all')");assert.equal(run('quiz.items.length'),24);assert.equal(run('new Set(quiz.items.map(q=>STAGES.findIndex(s=>s.ids.includes(q.lesson)))).size'),12);run('answer(quiz.options.findIndex(o=>o.correct))');assert.equal(run('quiz.score'),1);run('answer(0)');assert.equal(run('quiz.score'),1);run('nextQuestion();answer(quiz.options.findIndex(o=>!o.correct))');run("startQuiz('mistakes')");assert.equal(run('quiz.items.length'),1);
for(const m of T.models)for(const mode of Object.keys(m.modes)){els.get('#verb-select').value=m.id;run(`modeChoice=${JSON.stringify(mode)};renderConjugation()`);assert(!els.get('#conjugation-table').innerHTML.includes('undefined'));}
const nasr=T.models.find(m=>m.id==='nasr'),qawl=T.models.find(m=>m.id==='qawl'),ramy=T.models.find(m=>m.id==='ramy');
assert.equal(nasr.modes.past[12].form,'نَصَرْتُ');assert.equal(nasr.modes.present[11].form,'تَنْصُرْنَ');assert.equal(nasr.modes.subjunctive[8].form,'لَنْ تَنْصُرُوا');assert.equal(nasr.modes.pastPassive[0].form,'نُصِرَ');assert.equal(qawl.modes.command[0].form,'قُلْ');assert.equal(qawl.modes.past[12].form,'قُلْتُ');assert.equal(ramy.modes.command[0].form,'اِرْمِ');
assert(run("rich('هذه نَصَرَ').includes('lang=\"ar\"')"));assert(run("rich('<script>نَصَرَ</script>').includes('&lt;script&gt;')"));
assert(!fs.readFileSync(path.join(root,'index.html'),'utf8').includes('id="print"'));assert(!fs.readFileSync(path.join(root,'app.js'),'utf8').includes('hayat-maiah'));
for(const file of ['index.html','styles.css','data.js','app.js','conjugations.js','content.json','assets/fonts/Amiri-Regular.woff2','assets/fonts/JameelNooriNastaleeq.woff2'])assert(fs.statSync(path.join(root,file)).size>0,file);
console.log(`PASS: 72 lessons; ${L.reduce((n,l)=>n+l.quiz.length,0)} authored MCQs; ${run('questionPool().length')} total questions including conjugation; 288 lesson views; all routes; 14 model tables; scoring; mistake review; balanced stages; fonts.`);

const V=ctx.window.SARF_LEXICON;assert.equal(V.length,453);assert.equal(new Set(V.map(v=>v.id)).size,V.length);for(const v of V){for(const f of ['past','present','masdar','command','active','root','prohibition'])assert(v[f],v.id+f);assert(v.source==='supplement'||v.pdfPage>0);}
assert.equal(V.find(v=>v.past==='اِسْتَعَانَ').prohibition,'لَا تَسْتَعِنْ');assert.equal(V.find(v=>v.past==='اِسْتَقَامَ').prohibition,'لَا تَسْتَقِمْ');assert.equal(V.find(v=>v.past==='دَعَا').prohibition,'لَا تَدْعُ');assert.equal(V.find(v=>v.past==='آخَذَ').present,'يُؤَاخِذُ');
run("lexState.bab='افتعال';lexState.term='';renderLexicon()");assert(run("lexResults().every(v=>v.bab==='افتعال')"));run("lexState.term='انتظر';renderLexicon()");assert.equal(run('lexResults().length'),1);
run("lexState.term='';lexState.bab='';lexState.page=999;renderLexicon()");assert(els.get('#lex-next').disabled);
els.get('#write-mode').value='masdar';els.get('#write-bab').value='';run("newWriting('v001')");run("$('#write-answer').value='نصر'");run('checkWriting()');assert(els.get('#write-feedback').innerHTML.includes('بنیادی صورت درست'));
console.log('PASS: '+V.length+' vocabulary entries; filters, written recall and weak-form fixtures.');

function fire(name,target){for(const fn of events.get(name)||[])fn({target,key:'Enter',preventDefault(){}});}
const button=id=>({id,dataset:{},closest(){return this}});
const before=run('lexState.hidden');fire('click',button('lex-hide'));assert.notEqual(run('lexState.hidden'),before);
fire('input',{id:'lex-search',value:'استغفار'});assert.equal(run('lexResults().length'),1);
fire('change',{id:'lex-source',value:'bushra'});assert.equal(run('lexResults().length'),0);
fire('click',button('lex-reset'));assert.equal(run('lexState.term'),'');
run("newWriting('v001')");run("$('#write-answer').value='نصر'");fire('click',button('write-check'));assert(els.get('#write-feedback').innerHTML.includes('بنیادی صورت درست'));
console.log('PASS: search, filter, reset, hide and written-answer click handlers are connected.');

for(const v of V)for(const tab of ['meaning','forms','practice']){ctx.location.hash='#learn/'+v.id+'/'+tab;run('route()');assert(!els.get('#view').innerHTML.includes('undefined'),v.id+tab);assert(els.get('#view').innerHTML.includes('#chapter/'));assert(els.get('#view').innerHTML.includes(v.id));}
for(const [,slug] of run('SAFWA_BABS')){ctx.location.hash='#chapter/'+slug;run('route()');assert(!els.get('#view').innerHTML.includes('undefined'));}
ctx.location.hash='#learn/v001/practice';run('route()');run("startWordQuiz('v001')");assert.equal(run('quiz.items.length'),7);for(let i=0;i<7;i++){run('answer(quiz.options.findIndex(o=>o.correct));nextQuestion()');}assert.equal(run("wordStatus('v001')"),'known');assert(els.get('#quiz-area').innerHTML.includes('لفظ سیکھ لیا'));
run("startWordQuiz('v001');answer(quiz.options.findIndex(o=>!o.correct));nextQuestion()");for(let i=1;i<7;i++)run('answer(quiz.options.findIndex(o=>o.correct));nextQuestion()');assert.equal(run("wordStatus('v001')"),'review');
fire('click',{dataset:{wordHard:'v002'},closest(){return this;}});assert.equal(run("wordStatus('v002')"),'review');
ctx.location.hash='#word-review';run('route()');assert(els.get('#view').innerHTML.includes('v002'));
ctx.location.hash='#home';run('route()');assert(els.get('#view').innerHTML.includes('#learn/'));assert(els.get('#view').innerHTML.includes('صفوۃ المصادر'));
for(const bad of ['#learn/missing','#chapter/missing']){ctx.location.hash=bad;run('route()');assert(els.get('#view').innerHTML.includes('نہیں ملا'));}
assert.equal(V.find(v=>v.past==='أَقَامَ').prohibition,'لَا تُقِمْ');assert.equal(V.find(v=>v.past==='قَوَّى').masdar,'تَقْوِيَةٌ');
assert.equal(run('new Set(questionPool().map(q=>q.id)).size'),run('questionPool().length'));
console.log('PASS: all word learning tabs and bab routes; 7-question mastery, wrong-answer review, direct homepage start, supplemental forms, stable question IDs.');

// Learner pages must not expose extraction metadata or bibliographic scan labels.
for(const hash of ['#home','#sources','#books','#masadir','#learn/v001/meaning','#learn/v001/forms','#learn/v001/practice']){ctx.location.hash=hash;run('route()');const html=els.get('#view').innerHTML;assert(!/PDF|AAKHERAIN|\.pdf|۹۲۵|۱۰۵ صفحات|مکتبۃ البشریٰ/.test(html),hash);if(hash==='#masadir')assert(!/PDF|\.pdf/.test(els.get('#lex-grid').innerHTML));}
ctx.location.hash='#sources';run('route()');assert(els.get('#view').innerHTML.includes('ڈاکٹر عمران حیات کی تدریسی کاوش'));
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');assert(css.includes('--header-height'));assert(css.includes('@media(max-width:1280px)'));assert(css.includes('@media(max-width:700px)'));assert(css.includes('.sf-hero h1{color:#fff3d8!important'));assert(css.includes('backdrop-filter:none'));
console.log('PASS: teaching attribution; no PDF/page/scan notices on learner pages; responsive breakpoints and explicit hero text contrast.');
