import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './todos';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/todos', router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
