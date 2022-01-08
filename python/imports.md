### Relative & Absolute Imports

Absolute import uses the full part from project's root folder to the desired module. Relative import uses the relative path (starting from the path of current module). Module is a single Python file. Package is a collection of modules.

Python defines two types of packages, regular and namespace. Regular package is typically implemented as a directory containing init file. When it is imported, the init file is implicitly executed i.e. importing parent.one will implicitly execute parent/**init**.py and parent/one/**init**.py.

Package is a directory of Python modules containing an additional \_\_init\_\_.py\_\_ file. Init files are used to mark directories on Disk as Python package directories and not modules. In its absence, Python will not look for submodules inside that directory and attempts to import will fail. Can be declared as empty file.

https://docs.python.org/3/reference/import.html#regular-packages

```python
└── project
    ├── package1
    │   ├── module1.py
    │   └── module2.py
    └── package2
        ├── __init__.py
        ├── module3.py
        ├── module4.py
        └── subpackage1
            └── module5.py

# in module5.py:
from project.package1.module1 import class1
from ..module3 import class2

# need to have __init__.py in packages for absolute import, else will be read as 'module' by Python
```
