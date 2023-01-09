FROM eclipse-temurin:17-jdk-alpine AS build
COPY gradle gradle
COPY build.gradle settings.gradle gradlew ./
COPY src src
RUN chmod +x gradlew
RUN ./gradlew build

FROM eclipse-temurin:17-jdk-alpine
COPY --from=build build/libs/construction-app-api.jar app.jar
EXPOSE 5432
EXPOSE 8080
EXPOSE 10000
ENTRYPOINT ["java","-jar","/app.jar"]