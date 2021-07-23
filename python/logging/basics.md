## Logging:
Five standard levels indicating severity of events: DEBUG, INFO, WARNING, ERROR, CRITICAL. By default, only logs messages with severity of WARNING or above. For output format, 

Commonly used parameters for configuration:
- level: Root logger set to specified severity level.
- filename: Specifies the file.
- filemode: File opened in this mode (default is append).
- format: Format of log message.

```python
import logging

logging.basicConfig(level=logging.DEBUG, filename='app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s')
logging.debug('This will get logged')
logging.warning('This will get logged to a file')

# root - DEBUG - This will get logged to a file
# root - ERROR - This will get logged to a file
```
