# Prompt user for package manager choice (npm, pnpm, or yarn)
$PACKAGE_MANAGER = Read-Host "Type your package manager (npm/pnpm/yarn)"

# Validate package manager choice
if ($PACKAGE_MANAGER -notin @("npm", "pnpm", "yarn")) {
    Write-Host "Invalid package manager choice. Please run the script again and choose either 'npm', 'pnpm', or 'yarn'." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..."
if ($PACKAGE_MANAGER -eq "npm") {
    npm install
} elseif ($PACKAGE_MANAGER -eq "pnpm") {
    pnpm install
} else {
    yarn install
}

# Prompt user for PostgreSQL URL
$DATABASE_URL = Read-Host "Enter your PostgreSQL URL"

# Create .env file and set DATABASE_URL
@"
DATABASE_URL="$DATABASE_URL"
"@ | Out-File -Encoding UTF8 -FilePath .env

# Generate files for Prisma data model
Write-Host "Generating Prisma files..."
if ($PACKAGE_MANAGER -eq "npm") {
    npx prisma generate
} elseif ($PACKAGE_MANAGER -eq "pnpm") {
    pnpm prisma generate
} else {
    yarn prisma generate
}

# Apply Prisma migrations
Write-Host "Applying Prisma migrations..."
if ($PACKAGE_MANAGER -eq "npm") {
    npx prisma db push
} elseif ($PACKAGE_MANAGER -eq "pnpm") {
    pnpm prisma db push
} else {
    yarn prisma db push
}

# Generate JWT - RS256 Keys and base64 versions
Write-Host "Generating JWT - RS256 keys..."
$PRIVATE_KEY = openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 | Out-String
$PUBLIC_KEY = $PRIVATE_KEY | openssl rsa -pubout | Out-String
$JWT_PRIVATE_KEY = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($PRIVATE_KEY))
$JWT_PUBLIC_KEY = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($PUBLIC_KEY))

# Add JWT keys to .env file
@"
JWT_PRIVATE_KEY="$JWT_PRIVATE_KEY"
JWT_PUBLIC_KEY="$JWT_PUBLIC_KEY"
"@ | Add-Content -Encoding UTF8 -Path .env

# Build the application
Write-Host "Building the application..."
if ($PACKAGE_MANAGER -eq "npm") {
    npm run build
} elseif ($PACKAGE_MANAGER -eq "pnpm") {
    pnpm build
} else {
    yarn build
}

Write-Host "Setup complete. Run the application using 'npm start', 'pnpm start', or 'yarn start'." -ForegroundColor Green
