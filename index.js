const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  let form = `
    <form method="post" action="/save">
      <input type="text" name="keyword" placeholder="Type an AI request...">
      <button>Submit</button>
    </form>
  `;
  res.send(form);
});
app.post('/save', (req, res) => {
  let formData = req.body.keyword;
  let options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/engines/davinci/completions',
    headers: {
      'Authorization': 'Bearer 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',
    },
    json: {
      'prompt': formData,
      'max_tokens': 3500,
      'temperature': 0.7,
      'top_p': 1,
      'n': 1,
    }
  }
  request(options, (err, res, body) => {
    if (err) console.log(err);
    console.log(body.choices[0].text);
  });
  res.redirect('/');
});
app.listen(3000, () => console.log('Listening on port 3000!'));

