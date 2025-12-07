#!/bin/bash

# Domain Setup Script for AppCortex
# This script helps you set up environment variables for your domain

echo "🚀 AppCortex Domain Setup"
echo "========================"
echo ""

# Ask for domain
read -p "Enter your domain (e.g., appcortex.pro): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Domain is required!"
    exit 1
fi

# Ask for environment
echo ""
echo "Select environment:"
echo "1) Production (https://$DOMAIN)"
echo "2) Development (http://localhost:3000)"
read -p "Enter choice [1-2]: " ENV_CHOICE

case $ENV_CHOICE in
    1)
        ENV_TYPE="production"
        API_URL="https://$DOMAIN/api/v1"
        SITE_URL="https://$DOMAIN"
        ;;
    2)
        ENV_TYPE="development"
        API_URL="http://localhost:4000/api/v1"
        SITE_URL="http://localhost:3000"
        DOMAIN="localhost"
        ;;
    *)
        echo "❌ Invalid choice!"
        exit 1
        ;;
esac

# Create .env.local file
ENV_FILE=".env.local"

echo ""
echo "📝 Creating $ENV_FILE..."

cat > "$ENV_FILE" << EOF
# AppCortex Environment Variables ($ENV_TYPE)
# Generated on $(date)

# API URL
NEXT_PUBLIC_API_URL=$API_URL

# Domain Configuration
NEXT_PUBLIC_DOMAIN=$DOMAIN
NEXT_PUBLIC_SITE_URL=$SITE_URL
EOF

echo "✅ Created $ENV_FILE"
echo ""
echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   API URL: $API_URL"
echo "   Site URL: $SITE_URL"
echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Review $ENV_FILE and update if needed"
echo "2. Update Google OAuth settings with your domain"
echo "3. Configure DNS records"
echo "4. Set up SSL certificate"
echo ""
echo "See DOMAIN_SETUP.md for detailed instructions."

