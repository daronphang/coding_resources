# Virtual Environment
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
