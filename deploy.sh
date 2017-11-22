gulp build --no-watch --env production
ssh oceanstar 'mkdir -p ~/www/functional-workshop'
scp -r ./build/* oceanstar:~/www/functional-workshop
