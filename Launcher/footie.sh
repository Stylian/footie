#!/bin/bash
cd "$(dirname "$0")"

# Default Settings
BACKEND_PORT=8080
DATABASE_PATH=""
LOGS_PATH=""
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
                DATABASE_PATH) DATABASE_PATH="$value" ;;
                LOGS_PATH) LOGS_PATH="$value" ;;
                SHOW_SQL) SHOW_SQL="$value" ;;
            esac
        fi
    done < settings.txt
fi

# Build JVM options dynamically
JVM_OPTS="-Dserver.port=$BACKEND_PORT -Dreact-app.path=http://localhost:$FRONTEND_PORT -Dspring.main.allow-circular-references=true -Dspring.main.allow-bean-definition-overriding=true"

if [ -n "$DATABASE_PATH" ]; then
    JVM_OPTS="$JVM_OPTS -Dspring.datasource.url=jdbc:derby:$DATABASE_PATH;create=true"
fi

if [ -n "$LOGS_PATH" ]; then
    # Create logs directory if it doesn't exist
    mkdir -p "$LOGS_PATH"
    JVM_OPTS="$JVM_OPTS -Dderby.stream.error.file=$LOGS_PATH/derby.log"
else
    # Default log path
    mkdir -p "logs"
    JVM_OPTS="$JVM_OPTS -Dderby.stream.error.file=logs/derby.log"
fi

JVM_OPTS="$JVM_OPTS -Dspring.jpa.show-sql=$SHOW_SQL"

echo "Starting FootieApp on port $BACKEND_PORT..."
java \
  --add-opens java.base/java.lang=ALL-UNNAMED \
  --add-opens java.base/java.util=ALL-UNNAMED \
  --add-opens java.base/java.net=ALL-UNNAMED \
  --add-opens java.base/sun.net.www.protocol.http=ALL-UNNAMED \
  --add-opens java.base/sun.net.www.protocol.https=ALL-UNNAMED \
  $JVM_OPTS \
  -jar "footie.jar"
