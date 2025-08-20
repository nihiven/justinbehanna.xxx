module.exports = {
  apps: [{
    name: 'fitness-tracker',
    script: 'build/index.js',
    cwd: '/home/ubuntu/fitness-tracker',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    log_file: '/home/ubuntu/logs/fitness-tracker.log',
    error_file: '/home/ubuntu/logs/fitness-tracker-error.log',
    out_file: '/home/ubuntu/logs/fitness-tracker-out.log',
    time: true
  }]
};