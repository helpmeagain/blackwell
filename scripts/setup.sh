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
DEFAULT_DB_URL="postgresql://postgres:docker-password@localhost:5432/blackwell?schema=public"
read -p "Enter your PostgreSQL URL (default: $DEFAULT_DB_URL): " DATABASE_URL
DATABASE_URL=${DATABASE_URL:-$DEFAULT_DB_URL}


# Prompt user for Redis configuration
DEFAULT_REDIS_HOST="127.0.0.1"
DEFAULT_REDIS_PORT="6379"
DEFAULT_REDIS_DB="0"

read -p "Enter your Redis host (default: $DEFAULT_REDIS_HOST): " REDIS_HOST
REDIS_HOST=${REDIS_HOST:-$DEFAULT_REDIS_HOST}

read -p "Enter your Redis port (default: $DEFAULT_REDIS_PORT): " REDIS_PORT
REDIS_PORT=${REDIS_PORT:-$DEFAULT_REDIS_PORT}

read -p "Enter your Redis DB (default: $DEFAULT_REDIS_DB): " REDIS_DB
REDIS_DB=${REDIS_DB:-$DEFAULT_REDIS_DB}

# Create .env file and set environment variables
cat <<EOL > .env
# Database
DATABASE_URL="${DATABASE_URL}"

# Redis
REDIS_HOST="${REDIS_HOST}"
REDIS_PORT="${REDIS_PORT}"
REDIS_DB="${REDIS_DB}"
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

echo "------------------------------------------------------------"
echo "✅ Setup complete. Run the application using:"
if [[ "$PACKAGE_MANAGER" == "npm" ]]; then
    echo "   npm start"
elif [[ "$PACKAGE_MANAGER" == "pnpm" ]]; then
    echo "   pnpm start"
else
    echo "   yarn start"
fi
echo "------------------------------------------------------------"
