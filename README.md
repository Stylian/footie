# how to use
copy footie from COPY_TO_USER_FOLDER to user folder

run ./gradlew build
( this will create a test db in $USER_FOLDER.tests)

run java -jar build/libs/footie-2.0.jar

#for devs
run ./gradlew build
the App is set up in your IDE, run on debug mode or use ./gradlew bootRun
access localhost:8080

for editing/debugging the ui you need to run npm start separately in the ui folder
and use the -x copyWebApp flag to skip the frontend build in Gradle.
