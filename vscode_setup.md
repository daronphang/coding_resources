## Setting Up VSCode:
Stable version: January 2021, version 1.53.2 

### Extensions:
1) AREPL for real-time evaluation
2) Kite AutoComplete AI Code (need install Kite Engine)
3) Monokai Dimmed
4) Code Runner
5) Jupyter (need pip install ipykernel)
6) Live Server for js
7) Prettier
8) Error Lens
9) Auto Rename Tag
10) Bracket Pair Colorizer
11) Live Server
12) ES7-Snippets
13) Debugger for Chrome
14) ESLint

### Linting:
Need to install pylint in virtual environment; activation depends on autosave function. 

### Customization in settings.json:
```
"python.pythonPath": "venv\\Scripts\\python.exe",
"python.linting.enabled": true,
"python.linting.pylintEnabled": false,
"editor.lineHeight": 20,
"editor.letterSpacing": -0.7,
"editor.renderIndentGuides": true,
"python.linting.pycodestyleEnabled": true,
"python.linting.flake8Enabled": true,
"editor.rulers": [80],
"kite.codefinder.enableLineDecoration": false,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"code-runner.clearPreviousOutput": true,
"code-runner.executorMap": {
  "python": "C:\\financial_analysis\\venv\\Scripts\\python.exe"
},
```
