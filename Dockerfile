FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD  target/footie-1.0.jar footie.jar
RUN sh -c 'touch /footie.jar'
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /footie.jar" ]
