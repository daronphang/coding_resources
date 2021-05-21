## Locating Python Intepreter:
```python
import sys
print(sys.executable)

or type in cmd: where python
```
## Retrieve Path of Root Project Structure:
```python
import os

basedir = os.path.abspath(os.path.dirname(__file__))    # __file__ must be in top level directory of the project
print(basedir)
```
