import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { connectDb } from './models';
 
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const eraseDatabaseOnSync = true;

const createUsersWithMessages = async () => {
    const user1 = new models.User({
      username: 'rwieruch',
    });
   
    const user2 = new models.User({
      username: 'ddavids',
    });
   
    const message1 = new models.Message({
      text: 'Published the Road to learn React',
      user: user1.id,
    });
   
    const message2 = new models.Message({
      text: 'Happy to release ...',
      user: user2.id,
    });
   
    const message3 = new models.Message({
      text: 'Published a complete ...',
      user: user2.id,
    });
   
    await message1.save();
    await message2.save();
    await message3.save();
   
    await user1.save();
    await user2.save();
};

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
          models.User.deleteMany({}),
          models.Message.deleteMany({}),
        ]);
        createUsersWithMessages();
    }
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});