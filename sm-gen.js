const request = require('request');
const SitemapGenerator = require('sitemap-generator');
const base_url = 'https://elijoestudiar.edu.uy/#';
// create generator
const generator = SitemapGenerator('https://elijoestudiar.edu.uy', {
  stripQuerystring: false,
  lastMod: true,
  priorityMap: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0],
  changeFreq: 'monthly'
});
const crawler = generator.getCrawler();
const sitemap = generator.getSitemap();

var urls = [];

function getCentros() {
  return new Promise((resolve, reject) => {
    request('http://backend.elijoestudiar.uy/api/centros-ids', { json: true }, (err, res, body) => {
      if (err) { reject(err); }
      for ( var key in body ) {
        if (body.hasOwnProperty(key)) {
          urls.push( base_url + "centro/" + body[key].nid);
        }
      }
      resolve(body);
    });
  }).catch(error => {
    // Will not execute
    console.log('caught', err.message);
  });;
}
function getCursos() {
  return new Promise((resolve, reject) => {
    request('http://backend.elijoestudiar.uy/api/cursos-ids', { json: true }, (err, res, body) => {
      if (err) { reject(err); }
      var cursos_ids = {};
      body.forEach( curso => {
        //Backend devuelve ids duplicados
        if ( !(curso.orientacion in cursos_ids) ) {
          urls.push( base_url + "busco/cursos/all/all/all/all/all/" + curso.tipo+ "/" + curso.orientacion);
          cursos_ids[curso.orientacion] = 1;
        }
      });
      resolve();
    });
  }).catch(error => {
    // Will not execute
    console.log('caught', err.message);
  });;
}

function writeApis() {
  urls.forEach( url => {
    sitemap.addURL(url);
  });
}

crawler.on('crawlstart', () => {
  sitemap.addURL(base_url+'centros');
  sitemap.addURL(base_url+'cursos');
  sitemap.addURL(base_url+'intro');
  sitemap.addURL(base_url+'sobre-el-proyecto');
  console.log('A GET CENT');
  writeApis();
});
try {
  getCentros().then((centros_ids) => {
    getCursos().then((cursos_ids) => {
      generator.start();
    });
  });
}
catch (error) {
  console.error('ERROR:');
  console.error(error);
}
// register event listeners
generator.on('done', () => {
  // sitemap created
  console.error('sitemap created');
});

// start the crawler


/*const o2x = require('object-to-xml');

var centros = [];
var cursos =[];

var result = {
'?xml version=\"1.0\" encoding=\"UTF-8\"?' : null,
urlset: {
'@': {
"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
"xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
"xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1"
"xmlns:video": "http://www.google.com/schemas/sitemap-video/1.1"
"xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9"
"xmlns:mobile": "http://www.google.com/schemas/sitemap-mobile/1.0"
"xmlns:pagemap": "http://www.google.com/schemas/sitemap-pagemap/1.0"
"xmlns:xhtml": "http://www.w3.org/1999/xhtml"
},
'#': {
url: {
'#': {
loc: "https://elijoestudiar.edu.uy/",
lastmod: ""
}
}
}
}

<url>
<loc>https://derechosdeestudiantes.edu.uy</loc>
<>2019-11-10T21:32:50-06:00</lastmod>
<changefreq>always</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>https://derechosdeestudiantes.edu.uy</loc>
<lastmod>2019-11-10T21:32:50-06:00</lastmod>
<changefreq>monthly</changefreq>
<priority>0.9</priority>
</url>
<url>
<loc>https://derechosdeestudiantes.edu.uy/sobre-nosotros</loc>
<lastmod>2019-11-10T21:32:50-06:00</lastmod>
<changefreq>monthly</changefreq>
<priority>0.5</priority>
</url>
<url>
<loc>https://derechosdeestudiantes.edu.uy/denuncias/nueva</loc>
<lastmod>2019-11-10T21:32:50-06:00</lastmod>
<changefreq>monthly</changefreq>
<priority>0.5</priority>
</url>
<url>
<loc>https://derechosdeestudiantes.edu.uy/preguntas</loc><lastmod>2019-11-10T21:32:50-06:00</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url><url><loc>https://derechosdeestudiantes.edu.uy/preguntas/463</loc><lastmod>2019-11-04T05:35:12+00:00</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://derechosdeestudiantes.edu.uy/preguntas/464</loc><lastmod>2019-10-16T03:00:49+00:00</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url><url><loc>https://derechosdeestudiantes.edu.uy/preguntas/465</loc><lastmod>2019-10-16T03:00:49+00:00</lastmod><changefreq>weekl
request : {
  '@' : {
    type : 'product',
    id : 12344556
  },
  '#' : {
    query : {
      vendor : 'redhat',
      name : 'linux'
    }
  }
}
};

console.log(o2x(obj));
*/
