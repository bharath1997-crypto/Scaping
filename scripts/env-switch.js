#!/usr/bin/env node
/**
 * Environment Switcher
 * Switches between .env.local and .env.production
 * Usage: node scripts/env-switch.js [local|production]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const env = process.argv[2] || 'local';

if (!['local', 'production'].includes(env)) {
  console.error('❌ Invalid environment. Use "local" or "production"');
  process.exit(1);
}

const sourceFile = join(rootDir, `.env.${env}`);
const targetFile = join(rootDir, '.env');

if (!existsSync(sourceFile)) {
  console.error(`❌ ${sourceFile} not found!`);
  console.error(`   Please create .env.${env} first`);
  process.exit(1);
}

try {
  const content = readFileSync(sourceFile, 'utf8');
  writeFileSync(targetFile, content, 'utf8');
  
  console.log(`\n✅ Switched to ${env.toUpperCase()} environment`);
  console.log(`   Copied .env.${env} → .env\n`);
  
  // Show key config values
  const lines = content.split('\n');
  const keyVars = ['NODE_ENV', 'CORS_ORIGIN', 'FRONTEND_URL', 'GOOGLE_CALLBACK_URL'];
  
  console.log('📋 Current configuration:');
  lines.forEach(line => {
    const [key] = line.split('=');
    if (keyVars.includes(key.trim())) {
      console.log(`   ${line}`);
    }
  });
  
  if (env === 'production') {
    console.log('\n⚠️  WARNING: You are now using PRODUCTION settings!');
    console.log('   Make sure you\'re deploying to the correct server!\n');
  } else {
    console.log('\n✅ Ready for local development!');
    console.log('   Run: npm run dev\n');
  }
} catch (error) {
  console.error(`❌ Error switching environment: ${error.message}`);
  process.exit(1);
}

