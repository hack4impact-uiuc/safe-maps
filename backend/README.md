# Backend Instructions

## Setting Up Instructions

Set up a  `creds.ini` with the following mongo creds `mongo_db_name` and `mongo_url`.

## How To Run Backend

```bash
cd backend
pipenv install              #Install dependencies
pipenv shell                #Start server             
python manage.py runserver
```

## How To Format Backend

```bash
cd backend
pipenv install              #Install dependencies if you have not already
pipenv run black .
```

## How To Test Backend

```bash
cd backend
pipenv install              #Install dependencies if you have not already
pipenv run pytest
```

## Backend Resources

* [Database Schema](https://github.com/hack4impact-uiuc/c2tc-fall-2018/blob/master/docs/api_docs.md)