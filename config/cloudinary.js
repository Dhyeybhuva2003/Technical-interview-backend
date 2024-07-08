const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const checkCloudinaryConnection = async () => {
  try {
    await cloudinary.api.ping();
    console.log('Cloudinary connected successfully');
  } catch (error) {
    console.error('Cloudinary connection failed:', error);
  }
};

// Call the function to check the connection
checkCloudinaryConnection();

module.exports = cloudinary;
