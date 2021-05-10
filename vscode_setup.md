## Setting Up VSCode:
Stable version: January 2021, version 1.53.2 

### Extensions:
1) AREPL for real-time evaluation
2) Kite AutoComplete AI Code (need install Kite Engine)
3) Monokai Dimmed
4) Code Runner

### Linting:
Need to install pylint in virtual environment; activation depends on autosave function. 

### Customization in settings.json:
```
Python Path               "python.pythonPath": "venv\\Scripts\\python.exe"
Linting                   "python.linting.enabled": true
pylint                    "python.linting.pylintEnabled": false
Line Spacing              "editor.lineHeight": 20
Letter Spacing            "editor.letterSpacing": -0.7
Render Indent Guides      "editor.renderIndentGuides": true
pep8                      "python.linting.pycodestyleEnabled": true
flake8                    "python.linting.flake8Enabled": true
Right Vertical            "editor.rulers": [80]
Kite                      "kite.codefinder.enableLineDecoration": false
Code Runner               "code-runner.clearPreviousOutput": true,
                          "code-runner.clearPreviou"code-runner.executorMap": {
                                  "python": "C:\\directory\\python.exe",sOutput": true}
```
