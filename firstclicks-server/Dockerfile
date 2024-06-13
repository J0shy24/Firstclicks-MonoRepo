#Build stage

FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY  src ./src
RUN mvn clean package -DskipTests

#Runtime stage
FROM amazoncorreto:17 

#Arguments
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/firstclicks-*.jar /app/

EXPOSE 8080

ENV DB_URL=
ENV JAR_VERSION=${APP_VERSION}}

CMD java -jar firstclicks-${JAR_VERSION}.jar