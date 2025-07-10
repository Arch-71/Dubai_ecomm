const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { _id: 'SOME_ADMIN_ID', role: 'admin' }, // payload
  'yourSuperSecretKey123!@2025',            // your secret
  { expiresIn: '7d' }
);
console.log(token);