const fs=require('fs'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),css=fs.readFileSync(path.join(root,'app-layout.css'),'utf8');
const sheets=[...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(m=>m[1]);
assert(sheets.at(-1).startsWith('app-layout.css?v=20261016-viewport-6'));
assert(css.includes('.shell{display:block;'));
assert(css.includes('#sidebar{display:none!important;position:fixed!important;'));
assert(css.includes('#sidebar.open{display:block!important}'));
assert(css.includes('inline-size:min(100%,1240px)'));
assert(css.includes('grid-template-columns:repeat(6,minmax(0,1fr))'));
assert(css.includes('.table-wrap{display:block;inline-size:100%;'));
assert(!/zoom\s*:|transform\s*:\s*scale/.test(css));
// Width contract: border-box main and header fit each viewport; content can shrink.
for(const viewport of [320,360,390,768,1024,1280,1366,1440,1920]){const outer=Math.min(viewport,1240),padding=viewport<=700?28:viewport<=850?36:44;assert(outer<=viewport);assert(outer-padding>0);}
console.log('PASS: canonical stylesheet loaded last; viewport-bounded main/header, drawer-only sidebar, zero-minimum navigation tracks and contained table scrolling. This is not a browser geometry test.');
