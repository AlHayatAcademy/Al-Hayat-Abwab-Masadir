"""Regenerate browser data from the editable JSON files. Python 3, no dependencies."""
import json
from pathlib import Path
p=Path(__file__).resolve().parents[1]
d=json.loads((p/'content.json').read_text(encoding='utf-8'))
t=json.loads((p/'conjugations.json').read_text(encoding='utf-8'))
lessons=d['lessons'];ids=[l['id'] for l in lessons]
assert len(ids)==len(set(ids))
assert sorted(ids)==sorted(i for s in d['stages'] for i in s['ids'])
for l in lessons:
 assert l['sections'] and l['quiz']
 assert len({q['id'] for q in l['quiz']})==len(l['quiz'])
 for q in l['quiz']:
  assert len(q['options'])==len(set(q['options']))==4
  assert 0<=q['answer']<4
(p/'data.js').write_text('\n'.join('window.'+name+'='+json.dumps(value,ensure_ascii=False)+';' for name,value in [('LESSONS',lessons),('SARF_STAGES',d['stages']),('PATTERNS',d['patterns'])]),encoding='utf-8')
(p/'conjugations.js').write_text('window.SARF_TABLES='+json.dumps(t,ensure_ascii=False)+';',encoding='utf-8')
audit={'scope':'Authored topic and assessment coverage; not an independent critical verification of every scanned page.','lessons':len(lessons),'lesson_mcqs':sum(len(l['quiz']) for l in lessons),'short_answers':sum(len(l['qa']) for l in lessons),'patterns':len(d['patterns']),'conjugation_forms':sum(len(r) for m in t['models'] for r in m['modes'].values()),'areas':[{'id':l['id'],'title':l['title'],'quiz_count':len(l['quiz']),'coverage':l['coverage']} for l in lessons]}
lex_path=p/'lexicon.json'
if lex_path.exists():
 lex=json.loads(lex_path.read_text(encoding='utf-8'))
 audit.update(vocabulary_entries=len(lex),vocabulary_mcqs=len(lex)*7,total_mcqs=audit['lesson_mcqs']+audit['conjugation_forms']+len(lex)*7,source_pdf_pages=925,word_for_word_review_complete=False)
(p/'coverage.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
print({k:v for k,v in audit.items() if k not in ['scope','areas']})

lex_path=p/'lexicon.json'
if lex_path.exists():
 lex=json.loads(lex_path.read_text(encoding='utf-8'))
 (p/'lexicon.js').write_text('window.SARF_LEXICON='+json.dumps(lex,ensure_ascii=False)+';',encoding='utf-8')
 print('Vocabulary entries:',len(lex))
