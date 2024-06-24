#!/bin/bash

# Prompt user for package manager choice (npm, pnpm, or yarn)
read -p "Type your package manager (npm/pnpm/yarn): " PACKAGE_MANAGER

# Validate package manager choice
if [[ "$PACKAGE_MANAGER" != "npm" && "$PACKAGE_MANAGER" != "pnpm" && "$PACKAGE_MANAGER" != "yarn" ]]; then
    echo "Invalid package manager choice. Please run the script again and choose either 'npm', 'pnpm', or 'yarn'."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
if [[ "$PACKAGE_MANAGER" == "npm" ]]; then
    npm install
elif [[ "$PACKAGE_MANAGER" == "pnpm" ]]; then
    pnpm install
else
    yarn install
fi

# Prompt user for PostgreSQL URL
read -p "Enter your PostgreSQL URL: " DATABASE_URL

# Create .env file and set DATABASE_URL
cat <<EOL > .env
DATABASE_URL="${DATABASE_URL}"
EOL

# Generate files for Prisma data model
echo "Generating Prisma files..."
if [[ "$PACKAGE_MANAGER" == "npm" ]]; then
    npx prisma generate
elif [[ "$PACKAGE_MANAGER" == "pnpm" ]]; then
    pnpm prisma generate
else
    yarn prisma generate
fi

# Apply Prisma migrations
echo "Applying Prisma migrations..."
if [[ "$PACKAGE_MANAGER" == "npm" ]]; then
    npx prisma db push
elif [[ "$PACKAGE_MANAGER" == "pnpm" ]]; then
    pnpm prisma db push
else
    yarn prisma db push
fi

# Generate JWT - RS256 Keys and base64 versions
echo "Generating JWT - RS256 keys..."
PRIVATE_KEY=$(openssl genpkey -algorithm RSA -outform PEM -pkeyopt rsa_keygen_bits:2048)
PUBLIC_KEY=$(echo "$PRIVATE_KEY" | openssl rsa -pubout)
JWT_PRIVATE_KEY=$(echo "$PRIVATE_KEY" | openssl base64 -A)
JWT_PUBLIC_KEY=$(echo "$PUBLIC_KEY" | openssl base64 -A)

# Add JWT keys to .env file
cat <<EOL >> .env
JWT_PRIVATE_KEY="${JWT_PRIVATE_KEY}"
JWT_PUBLIC_KEY="${JWT_PUBLIC_KEY}"
EOL

# Build the application
echo "Building the application..."
if [[ "$PACKAGE_MANAGER" == "npm" ]]; then
    npm run build
elif [[ "$PACKAGE_MANAGER" == "pnpm" ]]; then
    pnpm build
else
    yarn build
fi

echo "Setup complete. Run the application using 'npm start', 'pnpm start', or 'yarn start'."
