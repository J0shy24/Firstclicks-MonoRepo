#Build stage
FROM maven:3.8.7-openjdk-18 AS build 
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

ARG APP_VERSION=1.0.0
#Runtime stage
FROM amazoncorretto:17

WORKDIR /app
COPY --from=build /build/target/firstclicks-*.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-firstclicks:5432/firstclicks-db
ENV JAR_VERSION=1.0.0

ENV EMAIL_HOSTNAME=missing_host_name
ENV EMAIL_USER_NAME=missing_user_name
ENV EMAIL_PASSWORD=missing_password

CMD java -jar -Dspring.datasource.url=${DB_URL} firstclicks-${JAR_VERSION}.jar