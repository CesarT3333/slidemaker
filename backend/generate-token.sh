#!/bin/bash

CONTEUDO=$(npm run generate-token)

echo "$CONTEUDO" >> token.txt

sed -i 1,4d token.txt

TOKEN=$(cat token.txt)

rm -rf token.txt

echo "{ \"secret_key\": \"$TOKEN\" }" >> secret-app.json

mv secret-app.json src/credentials
