fuser -k 3000/tcp
fuser -k 8080/tcp
git fetch --all
git reset --hard origin/main
git pull origin main
yarn start