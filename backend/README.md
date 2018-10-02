# C2TC Backend

Mongo + Flask

Setup:

Get `creds.ini` from project leads and copy it to the folder `/backend`. This file contain credentials for the database.
Then,

```
pipenv install
```

To start the server:

```
pipenv shell
python manage.py runserver
```

Note: tests don't work because they were made for postgres

`api.log` is the log file. Always log important information or errors when you catch them.

For more information on how this repo works, look at https://github.com/tko22/flask-boilerplate/wiki.

This uses mongodb instead of Postgres so we've switched over to using the package mongoengine, which is an ODM wrapper around MongoDB.
