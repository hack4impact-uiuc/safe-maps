FROM python:3.5-alpine
LABEL maintainer "Megha Mallya <meghamallya1@gmail.com>"

COPY . /app
WORKDIR /app
RUN pip install pipenv
RUN pipenv install --system

EXPOSE 5000
ENTRYPOINT [ "gunicorn", "-b", "0.0.0.0:5000", "--log-level", "INFO", "manage:app" ]