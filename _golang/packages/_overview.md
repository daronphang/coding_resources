### Package Initialization

Package initialization begins by initializing package-level variables in the order in which they are declared, except that dependencies are resolved first.

One package is initialized at a time, in the order of imports in the program, dependencies first i.e. if package P is importing package Q, package Q is initialized first. 

```go
var a = b + c     // initialized third
var b = f()       // initialized second
var c = 1         // initialized first
```

### Init Functions

Each variable declared at package level starts life with the value of its initializer expression. However, for some variables like table values, it may not be the simplest way to set its initial value. Init function mechanism may be simpler for doing so. 

Init functions cannot be called or referenced, cannot take arguments, and doesn't return any value. They are automatically executed when the program starts, in the order in which they are declared. Function runs before any other piece of code i.e. before main(). Called implicitly by Go runtime as soon as the package is imported and not explicitly.

A package can have more than one init() and all of them are executed before main(). Executed in the order defined. If multiple packages have multiple init(), they are executed in alphabetical order of the file name. **This can have undesirable side effects as renaming a file can alter init() execution order.** 

```go
var pc [256]byte

func init() {
  for i := range pc {
    pc[i] = pc[i/2] + byte(i&1)
  }
}
```

#### Caveat

Init() SHOULD NOT be allowed to change or manage global variables that affect the state of the package. Any undesirable changes from any init() may destabilize the predictability of the program. 

#### Side Effects Usage (Blank Imports)

It is an error to import a package into a file but not refer to the name it defines within that file. However, on occasion we must import a package merely for the side effects of doing so: evaluation of the initializer expressions of its package-level variables and execution of its init functions. This often means that there is an init() in the imported code that executes before any of the other code, hence allowing developers to manipulate the state in which their program is starting. 

To suppress the "unused import" error, must use a renaming import in which the alternative name is _.

```go
package png

func init() {
  // register image format for image.Decode
  image.RegisterFormat("png", pngHeader, Decode, DecodeConfig)
}
```

```go
import _ "image/png"

func decode(reader io.Reader) image.Rectangle {
	m, _, err := image.Decode(reader)
	if err != nil {
		log.Fatal(err)
	}
	return m.Bounds()
}
```




