import mongoose from 'mongoose';

const connexion = mongoose.connect(
    'mongodb+srv://baamm:WildCodeSchool@cluster0.ogdzi.mongodb.net/Baamm?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  },
() => console.log('DB connected '));

module.exports = connexion;