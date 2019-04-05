const express = require('express')
const app = express()

app.use(express.json())

var cors = require('cors');

app.use(cors());

const port = 5000

var ai = 4;

let database = [
  {
    id: 1,
    title: 'Foobar',
  },
  {
    id: 2,
    title: 'Title',
    description: 'Do this by this asd',
  },
  {
    id: 3,
    title: 'Lorem',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor tortor elit, in accumsan felis suscipit et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pretium.'
  }
];

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/todos', (req, res) => {
  res.json(database.reverse())
});
app.post('/todos', (req, res) => {
  let data = req.body;
  if(data['title'] !== undefined){
    if(data['description'] !== undefined){
      database.push({title: data['title'], description: data['description'], id: ai});
      ai++;
    } else {
      database.push({title: data['title'], id: ai});
      ai++;
    }

    res.json(database[database.length - 1])
  } else {
    res.json({error: true})
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
