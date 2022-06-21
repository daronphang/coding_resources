### Flask-Migrate

Needed if database models need to change and hence, database needs to be updated. Allows incremental changes.
Procedure as follows:

1. Make necessary changes to model classes.
2. Create an automatic migration script with flask db migrate command.
3. Review the generated script and adjust it so that it accurately represents the changes.
4. Add migration script to source control.
5. Apply migration to database with flask db upgrade command.

```python
# app.init.py:
migrate = Migrate(app, db)
```

```
$ flask db migrate
$flask db upgrade
```
