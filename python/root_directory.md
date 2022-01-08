### Locating Python Intepreter

```python
import sys
print(sys.executable)

or type in cmd: where python
```

### Retrieve Path of Root Project Structure

```python
import os

basedir = os.path.abspath(os.path.dirname(__file__))    # __file__ must be in top level directory of the project
print(basedir)
```

### Getting CWD

```python
import os

os.chdir(b'H:\tech\SECURE\test')   # need convert to bytes
print(os.getcwd())                  # prints absolute path 'H:/tech/SECURE/test'

os.chdir(os.path.join(os.getcwd(), '\app')) # 'H:\tech\SECURE\test\app'
```

### Run Python Script

```
python file_name.py
```
