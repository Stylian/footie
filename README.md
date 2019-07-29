# Footie

# Docker
docker works

#create image
docker build . -t="footie_server"

# run image
docker run \
  -d --restart=always \
  -e "SPRING_PROFILES_ACTIVE=prod" \
  -p 8080:8080 \
  footie_server