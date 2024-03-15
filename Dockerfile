FROM openjdk:21-slim
ARG APP_PORT=8080
EXPOSE ${APP_PORT}
RUN addgroup --system spring && adduser --system --group spring
USER spring:spring
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]