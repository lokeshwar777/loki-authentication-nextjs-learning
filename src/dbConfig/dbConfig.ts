import mongoose from 'mongoose'

export async function connect() {
  try {
    // await mongoose.connect(process.env.MONGO_URI!)
    await mongoose.connect(process.env.MONGO_URI || '')
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log('MongoDB connected')
    })

    connection.on('error', (error) => {
      console.error('MongoDB connection error, please make sure db is up and running', error)
      process.exit()
    })
  } catch (error) {
    console.error('Something went wrong connecting to DB', error)
  }
}
