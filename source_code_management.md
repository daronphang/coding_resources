# Github Manual

Git repository is a virtual storage of your project and allows you to save versions of code.

### Pushing Files to New Repository:

```
git init <project directory>                #cd /d C:\users\daronphang
git add <--all or example.txt>
git status                                  #to see changes committed
git commit -a -m "description of changes"
git remote add origin <paste GIT URL> 
git push -u origin master
```
### Editing Existing Files:

```
git branch                                  #check if branch is master
git checkout -b <new branch name>
git add <--all or example.txt>
git status                                  #to see changes committed
git commit -m "description of changes"
git push -u origin <new branch name>

git remote -v                               #to verify remote repository URL
git remote set-url origin <new repo URL>
```
### Cloning Repository:

```
cd /d C:\users\daronphang
git clone <repo URL>
```
### Git Pull:
Pull command is used to fetch and download content from 
remote repository and immediately update local repository to match
that content i.e. combination of git.fetch and git.merge.

```
git pull <remote URL>
git pull --no-commit <remote>
```
### Gitignore:
Text file that tells git which files to ignore. Local .gitignore
file is usually placed in the root directory.
Can also create global .gitignore and any entries in that file
will be ignored in all of GIT repositories.
```
git config --global core.excludesfile u/. <gitignore_global name>
```
```
.log
.idea/
access?.log     #matches any single character i.e. access1.log
hello.*         #matches any file or folder beginning with hello
*.db            #matches any file ending with .db
**/foo          #matches any file or directory with pattern "foo"
!example.db     #negates a file that would be ignored
!example!.txt
```
### Clearing Cache for Gitignore:
```
#commit any outstanding code changes
del .git\index.lock
git rm -r --cached
git add . 
git commit -m "cleared git cache"
git push origin <branch name>
```
