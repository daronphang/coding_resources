## Basics:
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

## Environment/Debug Features:
Recommended to set env variables in CMD/Bash rather than in config file as they can't be read early by flask command and some systems may have already configured themselves based on a previous value.
