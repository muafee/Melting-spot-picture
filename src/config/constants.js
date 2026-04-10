/* ═══════════════════════════════════════════════════════════════════════════
   1. CONFIGURATION & CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */
const BANNERS = {
  ratio_1_1:    { ratio:1,        cols:4, label:'Carre 1:1',        desc:'1000x1000',    group:'ratio' },
  ratio_5_4:    { ratio:5/4,      cols:4, label:'Paysage 5:4',      desc:'1250x1000',    group:'ratio' },
  ratio_4_3:    { ratio:4/3,      cols:3, label:'Paysage 4:3',      desc:'1600x1200',    group:'ratio' },
  ratio_3_2:    { ratio:3/2,      cols:3, label:'Paysage 3:2',      desc:'1500x1000',    group:'ratio' },
  ratio_5_3:    { ratio:5/3,      cols:3, label:'Paysage 5:3',      desc:'1500x900',     group:'ratio' },
  ratio_16_10:  { ratio:16/10,    cols:3, label:'Paysage 16:10',    desc:'1920x1200',    group:'ratio' },
  ratio_16_9:   { ratio:16/9,     cols:3, label:'Paysage 16:9',     desc:'1920x1080',    group:'ratio' },
  ratio_2_1:    { ratio:2,        cols:3, label:'Paysage 2:1',      desc:'2000x1000',    group:'ratio' },
  ratio_21_9:   { ratio:21/9,     cols:2, label:'Ultrawide 21:9',   desc:'2520x1080',    group:'ratio' },
  ratio_32_9:   { ratio:32/9,     cols:2, label:'Ultrawide 32:9',   desc:'3840x1080',    group:'ratio' },
  ratio_4_5:    { ratio:4/5,      cols:4, label:'Portrait 4:5',     desc:'1080x1350',    group:'ratio' },
  ratio_3_4:    { ratio:3/4,      cols:4, label:'Portrait 3:4',     desc:'1200x1600',    group:'ratio' },
  ratio_2_3:    { ratio:2/3,      cols:4, label:'Portrait 2:3',     desc:'1000x1500',    group:'ratio' },
  ratio_9_16:   { ratio:9/16,     cols:4, label:'Portrait 9:16',    desc:'1080x1920',    group:'ratio' },
  ratio_1_2:    { ratio:1/2,      cols:5, label:'Portrait 1:2',     desc:'600x1200',     group:'ratio' },
  // BD / Manga formats
  bd_a4_portrait: { w:2480, h:3508, cols:1, label:'A4 Portrait',       desc:'2480x3508 (300DPI)', group:'bd' },
  bd_a4_paysage:  { w:3508, h:2480, cols:1, label:'A4 Paysage',        desc:'3508x2480',          group:'bd' },
  bd_a3_portrait: { w:3508, h:4961, cols:1, label:'A3 Portrait',       desc:'3508x4961',          group:'bd' },
  bd_us_portrait: { w:1988, h:3075, cols:1, label:'US Comics',         desc:'1988x3075',          group:'bd' },
  manga_tankobon: { w:1772, h:2598, cols:1, label:'Manga Tankobon B6', desc:'1772x2598',          group:'bd' },
};

const PRESETS = [
  // Print
  { label:'A4',      w:210, h:297, unit:'mm', group:'Impression' },
  { label:'A3',      w:297, h:420, unit:'mm', group:'Impression' },
  { label:'A2',      w:420, h:594, unit:'mm', group:'Impression' },
  { label:'A1',      w:594, h:841, unit:'mm', group:'Impression' },
  { label:'A0',      w:841, h:1189,unit:'mm', group:'Impression' },
  { label:'Letter',  w:8.5, h:11,  unit:'in', group:'Impression' },
  // Screen
  { label:'Full HD', w:1920,h:1080,unit:'px', group:'Ecran' },
  { label:'4K',      w:3840,h:2160,unit:'px', group:'Ecran' },
  // Instagram
  { label:'Insta Post',    w:1080,h:1080,unit:'px', group:'Instagram' },
  { label:'Insta Portrait', w:1080,h:1350,unit:'px', group:'Instagram' },
  { label:'Insta Paysage', w:1080,h:566, unit:'px', group:'Instagram' },
  { label:'Insta Story',   w:1080,h:1920,unit:'px', group:'Instagram' },
  // Facebook
  { label:'FB Post',       w:1200,h:630, unit:'px', group:'Facebook' },
  { label:'FB Cover',      w:820, h:312, unit:'px', group:'Facebook' },
  { label:'FB Story',      w:1080,h:1920,unit:'px', group:'Facebook' },
  { label:'FB Event',      w:1920,h:1080,unit:'px', group:'Facebook' },
  // TikTok
  { label:'TikTok',        w:1080,h:1920,unit:'px', group:'TikTok' },
  { label:'TikTok Paysage',w:1920,h:1080,unit:'px', group:'TikTok' },
  // X / Twitter
  { label:'X Post',        w:1600,h:900, unit:'px', group:'X / Twitter' },
  { label:'X Header',      w:1500,h:500, unit:'px', group:'X / Twitter' },
  // LinkedIn
  { label:'LinkedIn Post',  w:1200,h:627, unit:'px', group:'LinkedIn' },
  { label:'LinkedIn Cover', w:1584,h:396, unit:'px', group:'LinkedIn' },
  { label:'LinkedIn Story', w:1080,h:1920,unit:'px', group:'LinkedIn' },
  // Pinterest
  { label:'Pin Standard',  w:1000,h:1500,unit:'px', group:'Pinterest' },
  { label:'Pin Carre',     w:1000,h:1000,unit:'px', group:'Pinterest' },
  { label:'Pin Long',      w:1000,h:2100,unit:'px', group:'Pinterest' },
  // YouTube
  { label:'YT Thumbnail',  w:1280,h:720, unit:'px', group:'YouTube' },
  { label:'YT Banner',     w:2560,h:1440,unit:'px', group:'YouTube' },
];

const RATIO_STDS = [
  {l:'1:1',v:1},{l:'4:3',v:4/3},{l:'3:2',v:3/2},{l:'5:4',v:5/4},{l:'5:3',v:5/3},
  {l:'16:9',v:16/9},{l:'16:10',v:16/10},{l:'2:1',v:2},{l:'21:9',v:21/9},
  {l:'3:4',v:3/4},{l:'2:3',v:2/3},{l:'4:5',v:4/5},{l:'9:16',v:9/16},{l:'1:2',v:1/2},
];
const RATIO_KEY_MAP = {
  '1:1':'ratio_1_1','5:4':'ratio_5_4','4:3':'ratio_4_3','3:2':'ratio_3_2',
  '5:3':'ratio_5_3','16:10':'ratio_16_10','16:9':'ratio_16_9','2:1':'ratio_2_1',
  '21:9':'ratio_21_9','4:5':'ratio_4_5','3:4':'ratio_3_4','2:3':'ratio_2_3',
  '9:16':'ratio_9_16','1:2':'ratio_1_2'
};
