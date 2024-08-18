echo "copying .env file..."
cp .env.example .env

echo "Docker compose build..."
docker compose build --no-cache

echo "Docker compose up..."
docker compose up -d

echo "Prisma generating..."
docker exec -it challenge-node npx prisma generate

echo "Prisma migrate..."
docker exec -it challenge-node npx prisma migrate dev
docker exec -it challenge-node npm run fix-constraints

