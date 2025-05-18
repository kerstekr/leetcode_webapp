const express = require('express');
const mongoose = require('mongoose');
const profileRoute = require('./routes/profileRoutes');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');




const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: 'https://leetcode-webapp-ki9k.vercel.app/',   // ← your Vercel domain here
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true,                       // if you need to send cookies/auth headers
  })
);
app.use('/api/auth', authRoutes);

mongoose.connect(
  'mongodb+srv://root:root@cluster0.3s7r0qm.mongodb.net/leetcode?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));



// ✅ Mount the profile routes
app.use('/api', profileRoute);

// Just for test — not needed if route works


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
