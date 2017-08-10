FROM microsoft/aspnetcore:1.1.2
# Install nodejs
RUN apt-get update -y 
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install -y nodejs
# install gulp globally
RUN npm install gulp --global
