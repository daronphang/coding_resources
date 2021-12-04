### Setting Up VSCode
Stable version: January 2021, version 1.53.2 

### Extensions
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
15) Remote Development

### JS Prettier and ESLint Setup
```
// go to project directory root folder
npm install eslint --save-dev
npx eslint --init

// REACT
To check syntax and find problems
Javascript modules (import/export)
React
No
Browser
JSON

NODEJS
To check syntax and find problems and enforce code style
CommonJS (require/exports)
None
No
Node
JSON
Google/Airbnb

// Prettier with ESLint
npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier

"extends": [
  "prettier",
  "airbnb-base"
],
"plugins": [
  "prettier"
],
"rules": {
  "prettier/prettier": "error",
  "require-jsdoc" : 0,
  "new-cap": 0
}
```

### Angular
1. Npm install prettier.
2. Create .prettierrc.json/.prettierrc and .prettierignore files.
3. Configure JSON settings for VSCode.
```
npm install --save-dev --save-exact prettier tslint-config-prettier

// .prettierignore
/dist
package-lock.json
package.json

// .prettierrc.json
{
    "printWidth": 100,
    "tabWidth": 2,
    "singleQuote": true,
    "bracketSpacing": true,
    "semi": true
}

// VSCode JSON Settings
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false,
}
```


### Remote Development
When cloning a repo, can run in container instead of running npm install locally. Container contains all node_modules dependencies. Main difference is that need to specify "host" parameter to tell Angular/React to connect to IP address. Also unable to use certain Windows commands in terminal as container is running in Linux (debian).

```
ng serve --host 0.0.0.0

npm run gen-ll
ng build --project=@omelek/library-name
ng g c my-new-component --project=@omelek/library-name
```

### Linting
Need to install pylint in virtual environment; activation depends on autosave function. 

### Customization in settings.json
```json
{
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
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true }, 
  "editor.formatOnSave": true, 
  "eslint.alwaysShowStatus": true, 
}
```
