## Locating Python Intepreter:
```python
import sys
print(sys.executable)
```
## Retrieve Path of Root Project Structure:
```python
import os

file = os.path.abspath('example.txt)    # file is in top level of the project
root_dir = os.path.dirname(file)
```
