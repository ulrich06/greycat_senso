FROM java:8
RUN apt-get update
RUN apt-get install -y maven
RUN apt-get install -y git
RUN ["git", "clone", "https://github.com/ulrich06/DEPOSIT_Organizational.git"]
WORKDIR /DEPOSIT_Organizational
RUN ["mvn", "install"]
WORKDIR /
RUN ["git", "clone", "https://github.com/kevoree-modeling/mwDB.git"]
WORKDIR /mwDB
RUN ["mvn", "install"]
WORKDIR /code

ADD pom.xml /code/pom.xml
RUN ["mvn", "dependency:resolve"]
RUN ["mvn", "verify"]

# Adding source, compile and package into a fat jar
ADD src /code/src
RUN ["mvn", "assembly:single"]

EXPOSE 11000

CMD ["/usr/lib/jvm/java-8-openjdk-amd64/bin/java", "-jar", "target/SmartCampusMWDB-1.0-SNAPSHOT-jar-with-dependencies.jar"]