FROM java:8
RUN apt-get update
RUN apt-get install -y maven

WORKDIR /code

ADD pom.xml /code/pom.xml
RUN ["mvn", "dependency:resolve"]
RUN ["mvn", "verify"]

# Adding source, compile and package into a fat jar
ADD src /code/src
RUN ["mvn", "package"]

EXPOSE 11000

CMD ["/usr/lib/jvm/java-8-openjdk-amd64/bin/java", "-jar", "SmartCampusMWDB-1.0-SNAPSHOT.jar"]