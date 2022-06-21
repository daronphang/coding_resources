## SCM (Source Code Management)

### Pushing Files to New Repository

```console
$ git init <project directory>                #cd /d C:\users\daronphang

$ git branch -m master main
$ git add <--all or example.txt>
$ git status                                  #to see changes committed
$ git commit -a -m "description of changes"
$ git remote add origin <paste GIT URL>
$ git push -u origin master
```

### Reset Commit

```console
$ git reset --hard HEAD
$ git reset --soft HEAD
```

### Verification

```
$ git log src/myassistant/app/api/v1/endpoint.py   # View all changes made to file
```

### Editing Existing Files

```console
$ git branch                                  # check if branch is master
$ git checkout -b <new branch name>
$ git add <--all or example.txt>
$ git status                                  # to see changes committed
$ git commit -m "description of changes"
$ git push -u origin <new branch name>

$ git remote -v                               # to verify remote repository URL
$ git remote set-url origin <new repo URL>
```

### Misc

```console
$ cd /d C:\users\daronphang         Cloning repo
$ git clone <repo URL>

$ git checkout master               Switch branch without -b tag
```

### Git Pull

Pull command is used to fetch and download content from remote repository and immediately update local repository to match that content i.e. combination of git.fetch and git.merge. If you don't want to integrate/merge changes directly, use git fetch instead as it will download the new changes only but leaves HEAD branch and working copy files untouched.

To pull other branches from remote repo, use git fetch followed by git pull origin <new_branch_name>.

```console
$ git pull <remote URL>
$ git pull --no-commit <remote>
$ git pull origin master --allow-unrelated-histories    When encountered "refusing to merge unrelated histories"

$ git fetch --all                            Fetch all branches in remote repo
$ git fetch <remote> <branch>

$ git pull origin <new_branch_name>
$ git pull <repo> <remotebranchname>:<localbranchname>
```

### Viewing Changes

```console
$ git fetch
$ git diff HEAD

$ git pull origin master
Updating 37b431a..b2615b4
$ git diff 37b431a..b2615b4

$ git reflog | grep -A1 pull | head -2
$ git diff 37b431a..b2615b4
```

## Gitignore

Text file that tells git which files to ignore. Local .gitignore
file is usually placed in the root directory.
Can also create global .gitignore and any entries in that file
will be ignored in all of GIT repositories.

```console
$ git config --global core.excludesfile u/. <gitignore_global name>
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

### Clearing Cache for Gitignore

```console
# commit any outstanding code changes first

$ del .git\index.lock   #if cannot clear cache
$ git rm -r --cached .
$ git add .
$ git commit -m "cleared git cache"
$ git push origin <branch name>
```
