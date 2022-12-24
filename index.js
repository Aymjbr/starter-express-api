

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// GET request to send a form to the main route
app.get('/', (req, res) => {
  let form = `
    <form method="post" action="/save">
      <input type="text" name="keyword" placeholder="Type an AI request...">
      <button>Submit</button>
    </form>
  `;
  res.send(form);
});

// POST request to save the form data to a new route and send an API request
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

/*
const OpenAI = require('openai');
const { Configuration, OpenAIApi } =OpenAI;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const configuration = new Configuration({
    organization: "org-fmS5CDEiKyMUKORsysjGNHGx",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

///

app.use(bodyParser.urlencoded({ extended: false })); 
app.post("/", async (request, response) => { 
  global.question = request.body.question; 
  const respo = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${global.question}`,
    max_tokens: 3400,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });  
  
  console.log(respo.prompt);
  console.log(respo.data);
  
  global.rew = respo.data.choices[0].text;
  response.redirect("/");
});  


app.get("/", (request, response) => {
  console.log(global.rew)
  if (global.question == undefined) {
    response.send(`
    <h3> Ask a question </h3>
    <form action="/" method="post">
      <input type="text" name="question" placeholder="Enter Your Name" required /> 
      <button type="submit">Submit</button>
    </form>`);
  } else {
    response.send(`
    <h3> Ask a question </h3>
    <form action="/" method="post">
      <input type="text" name="question" placeholder="Enter Your Name" required /> 
      <button type="submit">Submit</button>
    </form>
    <div>${global.rew}</div>`);
    
  }
});



app.listen(3000);
*/