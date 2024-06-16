#Build stage
FROM maven:3.8.7-openjdk-18 AS build 
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
COPY mediafiles ./mediafiles

RUN mvn clean package -DskipTests

ARG APP_VERSION=1.0.0


#Runtime stage
FROM amazoncorretto:17

WORKDIR /app
COPY --from=build /build/target/firstclicks-*.jar /app/
COPY --from=build /build/mediafiles/* /app/mediafiles/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-firstclicks:5432/firstclicks-db
ENV JAR_VERSION=1.0.0


CMD java -jar -Dspring.datasource.url=${DB_URL} firstclicks-${JAR_VERSION}.jar