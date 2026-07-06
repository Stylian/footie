#!/bin/bash
cd "$(dirname "$0")"

# Default Settings
BACKEND_PORT=8080
SHOW_SQL="false"

# Read settings.txt
if [ -f "settings.txt" ]; then
    while IFS='=' read -r key value || [ -n "$key" ]; do
        # Ignore comments and empty lines
        if [[ ! "$key" =~ ^# ]] && [[ -n "$key" ]]; then
            # Trim whitespace
            key=$(echo "$key" | xargs)
            value=$(echo "$value" | xargs)
            case "$key" in
                BACKEND_PORT) BACKEND_PORT="$value" ;;
                SHOW_SQL) SHOW_SQL="$value" ;;
            esac
        fi
    done < settings.txt
fi

# Build JVM options dynamically
mkdir -p "logs"
JVM_OPTS="-Dserver.port=$BACKEND_PORT -Dreact-app.path=http://localhost:$FRONTEND_PORT -Dspring.main.allow-circular-references=true -Dspring.main.allow-bean-definition-overriding=true -Dderby.stream.error.file=logs/derby.log -Dspring.jpa.show-sql=$SHOW_SQL"

echo "Starting FootieApp on port $BACKEND_PORT..."
java \
  --add-opens java.base/java.lang=ALL-UNNAMED \
  --add-opens java.base/java.util=ALL-UNNAMED \
  --add-opens java.base/java.net=ALL-UNNAMED \
  --add-opens java.base/sun.net.www.protocol.http=ALL-UNNAMED \
  --add-opens java.base/sun.net.www.protocol.https=ALL-UNNAMED \
  $JVM_OPTS \
  -jar "footie.jar"
