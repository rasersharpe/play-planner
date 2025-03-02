import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
 const forceDatabaseRefresh = false;

 import express from 'express';
 import sequelize from './config/connection.js';
 import routes from './routes/index.js';

 const app = express();
 const PORT = process.env.PORT || 3001;

 // Serves static files in the entire client's dist folder
 app.use(express.static(path.join(__dirname, '../../client/dist'))); // serves static files

 app.use(express.json());
 app.use(routes);

 app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'), function (err) {
      if (err) {
          res.status(500).send(err)
      }
  })
})

 sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
   app.listen(PORT, () => {
     console.log(`Server is listening on port ${PORT}`);
   });
 });
