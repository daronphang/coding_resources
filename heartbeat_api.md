## Heartbeat API:
Simple server polling API built in to WordPress, allowing near-real-time frontend updates.

When the page loads, the client-side heartbeat code sets up an interval (called the “tick”) to run every 15-60 seconds. 
When it runs, heartbeat gathers data to send via a jQuery event, then sends this to the server and waits for a response. 
On the server, an admin-ajax handler takes the passed data, prepares a response, filters the response, then returns the data in JSON format. 
The client receives this data and fires a final jQuery event to indicate the data has been received.

The basic process for custom Heartbeat events is:
1) Add additional fields to the data to be sent (JS heartbeat-send event)
2) Detect sent fields in PHP, and add additional response fields (heartbeat_received filter)
3) Process returned data in JS (JS heartbeat-tick)

Using the heartbeat API requires two separate pieces of functionality: send and receive callbacks in JavaScript, and a server-side filter to process passed data in PHP.

### Sending Data to Server:
```javascript
jQuery( document ).on( 'heartbeat-send', function ( event, data ) {
    // Add additional data to Heartbeat data.
    data.myplugin_customfield = 'some_data';
});
```

### Receiving and Responding on Server:
```python
```

### Processing Response on Frontend:
```javascript
jQuery( document ).on( 'heartbeat-tick', function ( event, data ) {
    // Check for our data, and use it.
    if ( ! data.myplugin_customfield_hashed ) {
        return;
    }
 
    alert( 'The hash is ' + data.myplugin_customfield_hashed );
});
```
