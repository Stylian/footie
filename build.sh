#!/bin/bash

# Build executable Fat JAR for double-clicking
set -e

echo "=== Building Executable Fat JAR ==="

echo "1. Cleaning previous builds..."
#mvn clean
#
#echo "2. Building executable Fat JAR with Spring Boot Maven Plugin..."
#mvn package -Dmaven.compiler.source=1.8 -Dmaven.compiler.target=1.8 -DskipTests

echo "3. Finding built JAR..."
JAR_FILE=$(ls -t target/*.jar | grep -v sources | grep -v original | head -1)

if [ -z "$JAR_FILE" ]; then
    echo "ERROR: No JAR file found in target directory"
    exit 1
fi

echo "4. Executable JAR created: $(basename $JAR_FILE)"
echo "   Location: $JAR_FILE"
echo "   Size: $(du -h $JAR_FILE | cut -f1)"

echo "5. Copying JAR to Launcher/ folder as footie.jar..."
# Create Launcher directory if it doesn't exist
mkdir -p Launcher

# Copy and rename the JAR file
cp "$JAR_FILE" Launcher/footie.jar

echo "6. JAR copied to: Launcher/footie.jar"
echo "   Size: $(du -h Launcher/footie.jar | cut -f1)"

echo "7. Build successful!"
echo ""
echo "You can now double-click the JAR file to run the application!"
echo "Location: Launcher/footie.jar"
echo ""
echo "Or run from terminal:"
echo "  java -jar Launcher/footie.jar"