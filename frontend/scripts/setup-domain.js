#!/usr/bin/env node

/**
 * Domain Setup Script for AppCortex
 * Helps configure environment variables for your domain
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('\n🚀 AppCortex Domain Setup');
  console.log('========================\n');

  // Get domain
  const domain = await question('Enter your domain (e.g., appcortex.pro): ');
  
  if (!domain || domain.trim() === '') {
    console.log('❌ Domain is required!');
    rl.close();
    process.exit(1);
  }

  // Get environment
  console.log('\nSelect environment:');
  console.log('1) Production (https://' + domain + ')');
  console.log('2) Development (http://localhost:3000)');
  const envChoice = await question('Enter choice [1-2]: ');

  let envType, apiUrl, siteUrl, finalDomain;

  switch (envChoice.trim()) {
    case '1':
      envType = 'production';
      apiUrl = `https://${domain}/api/v1`;
      siteUrl = `https://${domain}`;
      finalDomain = domain;
      break;
    case '2':
      envType = 'development';
      apiUrl = 'http://localhost:4000/api/v1';
      siteUrl = 'http://localhost:3000';
      finalDomain = 'localhost';
      break;
    default:
      console.log('❌ Invalid choice!');
      rl.close();
      process.exit(1);
  }

  // Create .env.local file
  const envFile = path.join(__dirname, '..', '.env.local');
  const content = `# AppCortex Environment Variables (${envType})
# Generated on ${new Date().toISOString()}

# API URL
NEXT_PUBLIC_API_URL=${apiUrl}

# Domain Configuration
NEXT_PUBLIC_DOMAIN=${finalDomain}
NEXT_PUBLIC_SITE_URL=${siteUrl}
`;

  try {
    fs.writeFileSync(envFile, content, 'utf8');
    console.log('\n✅ Created .env.local');
    console.log('\n📋 Configuration:');
    console.log(`   Domain: ${finalDomain}`);
    console.log(`   API URL: ${apiUrl}`);
    console.log(`   Site URL: ${siteUrl}`);
    console.log('\n✅ Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Review .env.local and update if needed');
    console.log('2. Update Google OAuth settings with your domain');
    console.log('3. Configure DNS records');
    console.log('4. Set up SSL certificate');
    console.log('\nSee DOMAIN_SETUP.md for detailed instructions.\n');
  } catch (error) {
    console.error('❌ Error creating .env.local:', error.message);
    process.exit(1);
  }

  rl.close();
}

main();

