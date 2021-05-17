## Heartbeat API:
Simple server polling API built in to WordPress, allowing near-real-time frontend updates. Allows for regular communication beteween browser and server.

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

// Using heartbeat.enqueue()
// function takes 3 arguments:
// Handle   (string) This is just a string identifier for your data. Make sure it's unique.
// Data     (object) The data to send as an object.
//Override  (bool) Whether to over-ride existing data. If true, any data previously added with the provided handle is replaced.

wp.heartbeat.enqueue(
'wptuts-plugin',
{
	'foo': 'bar',
	'wp': 'tuts',
},
	false
);

// use wp.heartbeat.isQueued() to check if particular handle already has data waiting in queue
// adding data to queued data
// Data to add
var new_data = {
	'version': '3.6'
};

if ( data = wp.heartbeat.isQueued( 'wptuts-plugin' ) ) {
new_data = jQuery.extend( data, new_data );
}

// Queue and over-ride existing data
wp.heartbeat.enqueue(
	'wptuts-plugin',
	new_data,
	true
);
```

### Receiving and Responding on Server:
```
# hooks triggered from server
heartbeat_received	Filters server's response to the browser and passes data received.
heartbeat_send		Filters server's response to the browser. Does not pass received data.
heartbeat_tick		Action triggered before response is set.

# If current user logs out
heartbeat_nopriv_received
heartbeat_nopriv_send
heartbeat_nopriv_tick

function wptuts_respond_to_browser( $response, $data, $screen_id ) {
	if ( isset( $data['wptuts-plugin'] ) ) {
		// We have data with our handle! Lets respond with something...

		// echo $data['wptuts-plugin']['foo']; //prints 'bar';
		$response['wptuts-plugin'] = array(
			'hello' => 'world'
		);
	}
	return $response;
}

// Logged in users:
add_filter( 'heartbeat_received', 'wptuts_respond_to_browser', 10, 3 );

// Logged out users
add_filter( 'heartbeat_nopriv_received', 'wptuts_respond_to_browser', 10, 3 );
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
