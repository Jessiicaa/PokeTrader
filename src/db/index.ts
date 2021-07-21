import { connect, connection } from 'mongoose';
import { env } from 'process';

export default () => {
  const connectionDB = () => {
    connect(env.URI_DB ? env.URI_DB : 'mongodb+srv://pokemon:<pokemonPwd>@cluster0.9pkxh.mongodb.net/pokeTrade',
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        user: env.USER_DB ? env.USER_DB : 'pokemon',
        pass: env.USER_PWD_DB ? env.USER_PWD_DB : 'pokemonPwd',
        authSource: 'admin',
      }).catch((error: any) => (console.error('Crashed => ', error)));
  };
  connectionDB();
  connection.on('error', () => (console.error('🤬  Not possible connect on MongoDb.')));
};
