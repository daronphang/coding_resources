## Grep (Global Regular Expression Print)

Grep utilities are a family that includes grep, egrep, and fgrep for searching files.

```console
$ grep 'word' filename
$ grep -i 'bar' file1         # Perform case-insensitive search
$ grep -R 'httpd'             # Look for all files in current directory and subdirectories
$ grep -c 'hello' file1       # Search and display total number of times word appears
$ grep 'word' *               # Search all files in current directory
$ grep 'str1\|str2' file1
$ grep -nr word ~/

$ grep 'redeem reward' ~/*.txt
$ tail -f /var/log/file.log | grep search_ter

$ grep '\word\>' filename       # exact match
```

```
-w          Exact match
-c          This prints only a count of the lines that match a pattern
-h          Display the matched lines, but do not display the filenames
-i          Ignores, case for matching
-l          Displays list of a filenames only
-n          Display the matched lines and their line numbers
-v          This prints out all the lines that do not matches the pattern
-e exp      Specifies expression with this option. Can use multiple times
-f          File takes patterns from file, one per line
-E          Treats pattern as an extended regular expression (ERE)
-w          Match whole word
-o          Print only the matched parts of a matching line
-A n        Prints searched line and nlines after the result
-B n        Prints searched line and n line before the result
-C n        Prints searched line and n lines after before the result
-r          Recursively search subdirectories listed
-q          Quiet, to not output matched text but return exit status code
```
