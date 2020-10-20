# how to use
copy footie from COPY_TO_USER_FOLDER to user folder

run mvn install
( this will create a test db in $USER_FOLDER.tests)

run java -jar target/footie-1.7.jar

#for devs
run mvn install
the App is set up in intellij, run on debug mode
access localhost:8080

for editing/debugging the ui you need to run npm start separately
and comment out the plugin in pom