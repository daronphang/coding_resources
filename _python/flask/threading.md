### Threading (Asynchronous)

```py
from datetime import datetime
import threading

@app.route("/")
def testing():
    start = datetime.now()
    time.sleep(1)
    end = datetime.now()

    results.append(end-start)
    # to obtain thread ID to distinguish requests from different threads
    results.append(threading.current_thread().ident)
    return ''.join(results)

if __name__ == ' __main__':
    app.run(threaded=False)
```
