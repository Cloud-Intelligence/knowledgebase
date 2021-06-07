# Docker and Docker-compose

For all of those who were just as confused as I was on docker and docker-compose installations, here is a nifty guide on how to get you started.

## Installing

### Mac and Windows:

Luckily for those using mac or windows systems, docker provides a usefull desktop aplication. The desktop app, along with all the command line interfaces, installs a simple to use desktop app that can visually assist the user in managing their containers. The desktop app is especially useful for newbie's because it eliminates alot of the complexities of using the command line.

Downloads:

https://www.docker.com/products/docker-desktop

> Some windows users may need to enable virtualisation in bios and install WSL (the linux vm). Im not going to go into the nitty gritty in this but if this is the case with you, I'd recommend following this [installation tutorial](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

### linux:

#### docker engine:
Unfortunately for linux users, there is'nt a current supported desktop application. Assuming you have the appropriate CPU architecture, CentOS, Debian, Fedora, Raspbian, and Ubuntu distros have a  .deb and .rpm package available for ease of installation for the docker engine. The link for download and for installation documentation of other distros is [here](https://docs.docker.com/engine/install/).

#### docker compose: 
For docker compose installation it is required that the engine be installed first. Then compose installation for linux installation is as simple as following the steps documented [here](https://docs.docker.com/compose/install/).

## Verifying installation

To ensure you have successfully installed docker, you can run the following commands in the command line.

To verify docker:
``` docker --version ```
Output is along the lines of "Docker version 20.10.6"

To verify docker-compose:
``` docker-compose --version ```
Output is along the lines of "docker-compose version 1.29.1"

## Additional knowledge

For those who are curious souls and are lis to understand docker and its uses, I'd strongly recommend the following links:

A brief docker description in only 100 seconds:
https://www.youtube.com/watch?v=Gjnup-PuquQ

A quick beginnners introduction:
https://www.youtube.com/watch?v=gAkwW2tuIqE&t=183s

Or following the official docker started guide:
https://docs.docker.com/get-started/
