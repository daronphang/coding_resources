## Relative & Absolute Imports:
Absolute import uses the full part from project's root folder to the desired module.  
Relative import uses the relative path (starting from the path of current module).

Module is a single Python file.  
Package is a directory of Python modules containing an additional \__init__.py file.
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
