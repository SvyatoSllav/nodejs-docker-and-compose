require('dotenv').config({ path: '.env.deploy' });

module.exports = {
  apps: [
    {
      name: 'kpd-frontend',
      script: 'npx',
      args: 'serve -s build -l 8081',
    },
  ],
  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_REF || 'origin/main',
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      'post-deploy': 'cd frontend && npm install && npm run build',
    },
  },
};
