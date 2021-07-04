## Basics:
Text editor used in CLI. 

```
vim <filename>          Start in command mode i.e. cannot edit; need to insert
h,j,k,l                 Move left, down, up right
0, $                    Move to beginning of line, end of line
w, b                    Move forward/backward one word
G, gg                   Move end of file, beginning of file

// can preface movement number of times i.e. 6k to move up six lines

// can use in combination with above i.e. d$ will delete to end of line
:i            Edit file content
:w            Save
:wq           Save and exist
:q            Exit
d             Delete
!             Force
o             Insert text at beginning of following line
v             Copy   
y             Copy line
p             Paste
d             Cut
dd            Cut line
:x            Save file and exit
:q!           Quit without saving file

/text         Search text in document
n, N          Next instance, previous instance


         

```
