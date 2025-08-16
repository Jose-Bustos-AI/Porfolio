// Temporary server starter
const { spawn } = require('child_process');

console.log('Starting server with ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);

const server = spawn('tsx', ['server/index.ts'], {
  env: { ...process.env, NODE_ENV: 'development' },
  stdio: 'inherit'
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});