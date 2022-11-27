echo -e "git pull"
git pull

echo -e "\nsudo npm run build"
sudo npm run build

echo -e "\npm2 stop 0"
pm2 stop 0

echo -e "\nsudo pm2 start npm --start" 
sudo pm2 start npm --start
