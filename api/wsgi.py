from os import getenv

from main import APP

if __name__ == "__main__":
    APP.run(port=getenv("PORT", 5000))
