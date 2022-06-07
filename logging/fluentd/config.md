## List of Directives

```
source        Determine the input sources
match         Determine the output destinations
filter        Determine the event processing pipelines
system        Set system-wide config
label         Group the output and filter for internal routing
@include      Include other files i.e. reuse your config
```

## Pipeline

```log
2020-05-10T17:04:17+00:00	ninja.var.log.kong.log	{"log":"2020/05/10 17:04:16 [warn] 35#0: *4 [lua] globalpatches.lua:47: sleep(): executing a blocking 'sleep' (0.004 seconds), context: init_worker_by_lua*\n","stream":"stderr"}
2020-05-10T17:04:17+00:00	ninja.var.log.kong.log	{"log":"2020/05/10 17:04:16 [warn] 33#0: *2 [lua] globalpatches.lua:47: sleep(): executing a blocking 'sleep' (0.008 seconds), context: init_worker_by_lua*\n","stream":"stderr"}
2020-05-10T17:04:17+00:00	ninja.var.log.kong.log	{"log":"2020/05/10 17:04:17 [warn] 32#0: *1 [lua] mesh.lua:86: init(): no cluster_ca in declarative configuration: cannot use node in mesh mode, context: init_worker_by_lua*\n","stream":"stderr"}
2020-05-10T17:04:30+00:00	ninja.var.log.kong.log	{"log":"172.17.0.1 - - [10/May/2020:17:04:30 +0000] \"GET / HTTP/1.1\" 404 48 \"-\" \"curl/7.59.0\"\n","stream":"stdout"}
2020-05-10T17:05:38+00:00	ninja.var.log.kong.log	{"log":"172.17.0.1 - - [10/May/2020:17:05:38 +0000] \"GET /users HTTP/1.1\" 401 26 \"-\" \"curl/7.59.0\"\n","stream":"stdout"}
2020-05-10T17:06:24+00:00	ninja.var.log.kong.log	{"log":"172.17.0.1 - - [10/May/2020:17:06:24 +0000] \"GET /users HTTP/1.1\" 499 0 \"-\" \"curl/7.59.0\"\n","stream":"stdout"}
```

<img src="../_snapshots/fluentd-pipeline.png">

## Source

Can add multiple source configurations as required. Source submits evnets to the Fluentd routing engine. An event consists of three entities: tag, time and record (JSON object).

### Input Plugins

```
tail          Similar to tail -f
http          Allows you to send events through HTTP requests
forward       Listens to TCP socket to receive the evnet stream
tcp           Enables Fluentd to accept TCP payload
syslog
```

### Example

```conf
<source>
  @type tail                    # similar to tail -f
  path "/var/log/*.log"         # tail any file ending with .log
  tag "ninja.*"                 # prepend to every tag created by this source
  read_from_head true           # consume whole file instead of only new lines
  <parse>
    @type "json"                # format of input log
    time_format "%Y-%m-%dT%H:%M:%S.%NZ"
    time_type string
  </parse>
</source>
```

## Match

### Output Plugins

```
file                  Writes events to files
forward               Forwards events to other Fluentd nodes
http                  Writes records via HTTP/HTTPS
exc                   Passes events to an external program
secondary_file        Writes chunks to files (secondary use-case)
stdout                Prints events to standard output
null                  Throws away events
s3                    Writes records to Amazon S3 cloud object storage service
kafka                 Writes records into Apache Kafka
elasticsearch
opensearch
mongo
```

### Example

```conf
<match **>                      # match any tag in fluentd
  @type file
  path /output/example.log      # where buffers are kept
  <buffer>
    timekey 1d
    timekey_use_utc true
    timekey_wait 1m
  </buffer>
</match>
```

## Filter

### Filter Plugins

```
record_transformer      Mutates/transforms incoming event streams in a versatile manner
grep
parser                  Parses string field in event records and mutates
stdout
geoip
```

### Example

Can be chained for processing pipeline.

```conf
<filter ninja.var.log.kong**>       # filter only tags starting with specified
  @type grep                        # type of plugin to use
  <regexp>
    key log
    pattern /HTTP/
  </regexp>
</filter>

<filter foo.bar>
  @type grep

  <regexp>
    key message
    pattern /cool/      # "message" field contains "cool"
  </regexp>

  <regexp>
    key hostname        # "hostname" field matches regex
    pattern /^web\d+\.example\.com$/
  </regexp>

  <exclude>
    key message
    pattern /uncool/    # "message" field excludes "uncool"
  </exclude>
</filter>

<filter ninja.var.log.kong** >
  @type parser
  key_name log
  <parse>
    @type nginx
  </parse>
</filter>
```

## System

```
log_level
suppress_repeated_stacktrace
emit_error_log_interval
suppress_config_dump
without_source
process_name
```

```conf
<system>
  # equal to -qq option
  log_level error
  # equal to --without-source option
  without_source
  # ...
</system>
```

## Match Patterns

```
*           Matches a single tag part i.e. a.* matches a.b but not a.b.c
**          Matches zero or more tag parts
{X,Y,Z}     Matches X, Y or Z patterns
/regex/
#{...}      Evaluates string inside brackets as Ruby expression
```

## Other Examples

```conf
<strong>Source Section</strong>
<source>
  @type tail
  path /var/log/messages
  pos_file /var/log/messages.log.pos
  path_key tailed_path
  tag oci.syslog
  <parse>
    @type none
  </parse>
</source>

<strong>Filter Section</strong>
<filter oci.syslog>
  @type record_transformer
  enable_ruby true
  <record>
      entityId         "<ocid1.loganalyticsentity.oc1.....>"
      logGroupId       "<ocid1.loganalyticsloggroup.....>"
      entityType       "Host (Linux)"
      logSourceName    "Linux Syslog Logs"
      logPath          ${record['tailed_path']}
      message          ${record["log"]}
  </record>
</filter>

<strong>Output plugin section</strong>
<match oci.syslog>
  @type                       oci-logging-analytics
  namespace                   <'abcdefgh'>
  config_file_location        </.oci/config>
  profile_name                DEFAULT
  <buffer>
        @type                 file
        path                  /var/log
  </buffer>
</match>
```
