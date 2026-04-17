const https = require('https');

https.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUClNqxp3O0Xe5wzWgwN-EfLQ', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(JSON.parse(data).items[0]);
  });
}).on('error', (err) => {
  console.error(err);
});
