import express from 'express';
import router from './old/todos';

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/api/todos', router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
