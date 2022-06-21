### Connection

Can either connect directly to mysql or using flask-mysql.

https://flask-mysqldb.readthedocs.io/en/latest/

```
pip install mysql-connector-python
pip install flask-mysqldb
```

```py
# using flask-mysql
from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)
mysql = MySQL(app)


@app.route('/')
def users():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT user, host FROM mysql.user''')
    rv = cur.fetchall()
    return str(rv)

if __name__ == '__main__':
    app.run(debug=True)
```

```py
# using mysql.connector
import mysql.connector as mysql
from flask import current_app


class MySQLDBConnectionSession:
    def __init__(self, dictionary: bool):
        self.conn = mysql.connect(
            host=current_app.config['MYSQL_HOST'],
            user=current_app.config['MYSQL_USER'],
            password=current_app.config['MYSQL_PASSWORD'],
            database=current_app.config['MYSQL_DATABASE'],
            port=current_app.config['MYSQL_PORT']
        )
        self.dictionary = dictionary

    def __enter__(self):
        return self.conn.cursor(dictionary=self.dictionary)

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        print(self.conn.is_connected()) # check if connection is closed
```
