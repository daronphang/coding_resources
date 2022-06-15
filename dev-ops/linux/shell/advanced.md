## Automation for Interactive Prompts

Can use tool 'Expect' or simply piping input with answers.

Alternative is to use cat and text file to pass along the input you need.

```sh
echo "Y Y N N Y N Y Y N" | ./your_script

yes [answer] |./your_script     # outputs 'y', an affirmative response
yes n | rm -i *.txt             # passing parameter n

cat "input.txt" | ./Script.sh
```
