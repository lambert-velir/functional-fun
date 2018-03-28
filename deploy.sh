gulp build --no-watch --env production
ssh oceanstar 'mkdir -p ~/www/functional-fun'
scp -r ./build/* oceanstar:~/www/functional-fun
