FROM alpine:3.3
MAINTAINER Vladimir Krivosheev <develar@gmail.com>

RUN apk --update add openjdk8-jre
WORKDIR /code
ADD SmartCampusMWDB-1.0-SNAPSHOT-shaded.jar /code/SmartCampusMWDB-1.0-SNAPSHOT-shaded.jar

EXPOSE 11000
EXPOSE 8050

CMD ["java", "-jar", "SmartCampusMWDB-1.0-SNAPSHOT-shaded.jar"]
