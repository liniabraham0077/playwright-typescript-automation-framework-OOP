# version should match playwright@test version in package.json
FROM mcr.microsoft.com/playwright:v1.42.1-jammy
# Install OpenJDK 11
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    rm -rf /var/lib/apt/lists/* && \
    update-ca-certificates -f

# Set JAVA_HOME environment variable
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-arm64/

# Set PATH to include JAVA_HOME/bin
ENV PATH $JAVA_HOME/bin:$PATH
RUN java -version
RUN mkdir /app
WORKDIR /app
COPY . /app/
RUN npm install --force
RUN npx playwright install
