Html is in the _layouts folder
CSS and Images are in the assets folder


# Running locally

You will need docker and docker-compose set up in order to run this.
- install [taskfile](https://taskfile.dev/)
- install [docker-compose](https://docs.docker.com/compose/install/)


Run:
sudo docker run --rm -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/builder:latest bash -c "gem install bundler -v 2.5.21 && bundle config set --global sources https://rubygems.org && bundle install && jekyll build && jekyll serve --host 0.0.0.0"

This will install dependencies, and run locally on link<http://0.0.0.0:4000/>



