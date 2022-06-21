### pass_context

pass_context() decorator is used to hold all of the context of the execution of a command. In a group command, the context object is used to pass information between commands.

```py
import click
import json
import pprint

# pprint is a module used to pretty print arbitrary Python data structures

'''
@click.group(<name>) creates a command that instantiates a group class
a group is intended to be a set of related commands
@click.argument(<argument name>) tells us that we will be passing an argument
and referring to that argument in the function by the name we pass it
@click.pass_context tells the group command that we're going to be using
the context, the context is not visible to the command unless we pass this
 
'''

# making own decorator to specify the type of object to pass through
pass_dict = click.make_pass_decorator(dict)

@click.group("cli")
@click.pass_context
@click.argument("document")
def cli(ctx, document):
   """An example CLI for interfacing with a document"""
   _stream = open(document)
   _dict = json.load(_stream)
   _stream.close()
   ctx.obj = _dict
 

@cli.command("check_context_object")
@click.pass_context
def check_context(ctx):
   pprint.pprint(type(ctx.obj))


@cli.command("get_keys")
@pass_dict
def get_keys(_dict):
   keys = list(_dict.keys())
   click.secho("The keys in our dictionary are", fg="green")
   click.echo(click.style(keys, fg="blue"))


@cli.command("get_key")
@click.argument("key")
@click.pass_context
def get_key(ctx, key):
   pprint.pprint(ctx.obj[key])


@cli.command("get_summary")
@click.pass_context
def get_summary(ctx):
    '''
    click.invoke(<command>, <args>) is click's way of letting us
    arbitrarily nest commands. NOTE: this command can only be used
    when both the command being invoked AND the the command
    doing the invoking use @click.pass_context
    '''
   ctx.invoke(get_key, key="summary")


@cli.command("get_results")
@click.option("-d", "--download", is_flag=True, help="Pass to download the result to a json file")
@click.option("-k", "--key", help="Pass a key to specify that key from the results")
@click.pass_context
def get_results(ctx, download: bool, key: str):
   results = ctx.obj['results']
   if key is not None:
       result = {}
       for entry in results:
           if key in entry:
               if key in result:
                   result[key] += entry[key]
               else:
                   result[key] = entry[key]
       results = result
   if download:
       if key is not None:
           filename = key+'.json'
       else:
           filename = "results.json"
       with open(filename, 'w') as w:
           w.write(json.dumps(results))
       print("File saved to", filename)
   else:
       pprint.pprint(results)


def main():
   cli(prog_name="cli")
 
if __name__ == '__main__':
   main()
```