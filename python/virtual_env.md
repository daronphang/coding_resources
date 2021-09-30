## Virtual Environment:
Developers often deal with Python projects where they have to use module/packages that are not part of Python standard 
library i.e. version is 3.6 but reuqires 2.6 for a particular application. Solution is to create venv, a self-contained folder that contains required
executables to use packages without affecting the global Python intepreter installed in os.

Useful to prevent package clutter and version conflicts. Codes executed in cmd.
```
cd /d C:\users\daronphang
virtualenv venv
venv\Scripts\activate
deactivate                  #venv\Scripts\deactivate
```
## Requirements.txt:
A text file containing the venv packages and versions required to run the Python program. 
```
pip freeze > requirements.txt         Create txt file
pip install -r requirements.txt 
```
## Common Mistakes:
If need to rename directory folder, best is to create requirements.txt file and recreating virtualenv folder as the venv path will be broken.
