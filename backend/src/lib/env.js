import "dotenv/config";


export const ENV ={

PORT: process.env.PORT || 3000,
MONGO_URI: process.env.MONGO_URI,
NODE_ENV: process.env.NODE_ENV,
JWT_SECRET: process.env.JWT_SECRET,
CLIENT_URL: process.env.CLIENT_URL,

RESEND_API_KEY: process.env.RESEND_API_KEY,
EMAIL_FROM: process.env.EMAIL_FROM,
EMAIL_FROM_NAME: process.env.EMIAL_FROM_NAME,

}


// PORT=3000
// MONGO_URI=mongodb+srv://sanketkanade2525_db_user:qZXnPteB5aTYjUO8@cluster0.igsyioy.mongodb.net/?appName=Cluster0
// NODE_ENV=development
// JWT_SECRET=your_jwt_secret_key

// RESEND_API_KEY=re_KWSRSfZB_7aN4UBUuSUAZXkFBjYfKs8V6

// EMAIL_FROM="onboarding@resend.dev"
// EMIAL_FROM_NAME="sanket kanade"

// CLIENT_URL=http://localhost:5173