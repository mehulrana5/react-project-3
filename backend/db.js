const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017"
const connectToMongo = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/inotebook', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
    }
  };
module.exports=connectToMongo 