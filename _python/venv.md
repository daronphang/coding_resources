## Virtual Environment

Developers often deal with Python projects where they have to use module/packages that are not part of Python standard library i.e. version is 3.6 but requires 2.6 for a particular application.

Solution is to create venv, a self-contained folder that contains required executables to use packages without affecting the global Python intepreter installed in os. Useful to prevent package clutter and version conflicts. Codes executed in cmd.

```console
$ cd /d C:\users\daronphang
$ virtualenv venv
$ venv\Scripts\activate
$ deactivate

# Bash
$ source venv/Scripts/activate

$ cd venv/Scripts
$ . activate
$ deactivate
```

### Requirements.txt

A text file containing the venv packages and versions required to run the Python program.

```console
$ pip install -r requirements.txt
$ pip freeze > requirements.txt         // Create or update txt file
$ pip freeze --all > requirements.txt
$ pip list
```

### Common Mistakes

If need to rename directory folder, best is to create requirements.txt file and recreating virtualenv folder as the venv path will be broken.
