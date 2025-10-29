const http = require('http');
const https = require('https');
function check(url){
  return new Promise(resolve=>{
    try{
      const lib = url.startsWith('https') ? https : http;
      const req = lib.get(url, res => {
        const { statusCode, headers } = res;
        let size = 0;
        res.on('data', c => size += c.length);
        res.on('end', () => resolve({ url, statusCode, headers, size }));
      });
      req.on('error', e => resolve({ url, err: e.message }));
    }catch(e){
      resolve({ url, err: e.message });
    }
  });
}

(async ()=>{
  const urls = [
    'http://localhost:3000/hotels?_page=1&_limit=1',
    'http://localhost:4200/assets/no-image.svg',
    'http://localhost:4200/assets/logo.png',
    'https://via.placeholder.com/240x180?text=Hotel'
  ];
  for(const u of urls){
    const r = await check(u);
    console.log(JSON.stringify(r));
  }
})();
