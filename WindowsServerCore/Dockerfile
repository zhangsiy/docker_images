FROM microsoft/dotnet-framework:4.7
#install chocolatey
RUN @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
#install nodejs
RUN choco install -y nodejs --version 8.1.2
#install dotnet core SDK
RUN choco install -y dotnetcore-sdk --version 1.1.1.20170508
#install dotnet framework 4.5.2 SDK
RUN choco install -y netfx-4.5.2-devpack --version 4.5.51651
#install dotnet framework 4.6.1 SDK
RUN choco install -y netfx-4.6.1-devpack --version 4.6.01055.00
# install gulp globally
RUN npm install gulp --global
