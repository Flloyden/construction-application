#Commented out stuff can be used to build the server
#using gradle without doing it manually but there
#might be some issues.

#FROM eclipse-temurin:17-jdk-alpine AS build
#COPY gradle gradle
#COPY build.gradle settings.gradle gradlew ./
#COPY src src
#RUN chmod +x gradlew
#RUN ./gradlew build

#FROM eclipse-temurin:17-jdk-alpine
#COPY --from=build build/libs/construction-app-api.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java","-jar","/app.jar"]

#Manually build the server first using gradle.
FROM eclipse-temurin:17-jdk-alpine
COPY build/libs/construction-app-api.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]