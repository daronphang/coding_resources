### Basics

Flask has config object available which holds the loaded configuration values.

```py
app = Flask(__name__)
app.config['TESTING'] = True

# Can read/write from Flask object
app.testing = True

# Updating multiple keys
app.config.update(
  TESTING = True,
  SECRET_KEY = '123'
)
```

### Environment/Debug Features

Recommended to set env variables in CMD/Bash rather than in config file as they can't be read early by flask command and some systems may have already configured themselves based on a previous value.

```
# Bash
$ export FLASK_ENV=development    # enables debug mode, default is production
$ flask run

# Windows
set FLASK_ENV=development
flask run
```

### Configuring From Python Files

Configuration becomes more useful if you can store it in a separate file, outside of application package.

```py
app = Flask(__name__)
app.config.from_object('yourapplication.default_settings')  # Objects are either modules/classes, loads only UPPERCASE attributes
app.config.from_envvar('APP_SETTINGS')

# Changing file format
import json
app.config.from_file("config.json", load=json.load)
```

```
set APP_SETTINGS=\path\to\settings.cfg
flask run
```

### Using Environment Variables

```py
import os

_mail_enabled = os.environ.get("MAIL_ENABLED", default="true")
MAIL_ENABLED = _mail_enabled.lower() in {"1", "t", "true"}

SECRET_KEY = os.environ.get("SECRET_KEY")

if not SECRET_KEY:
    raise ValueError("No SECRET_KEY set for Flask application")
```

```
set SECRET_KEY="5f352379324c22463451387a0aec5d2f"
set MAIL_ENABLED=false
flask run
```
