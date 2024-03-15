#!/usr/bin/env zsh
cd ./client && yarn build --emptyOutDir && cd ..
export JAVA_HOME="$HOME/Library/Java/JavaVirtualMachines/azul-21.0.2/Contents/Home"
./mvnw clean package -DskipTests
docker buildx build --push --platform linux/amd64 -t pilotpirxie/party-together:latest .
