## Fluentd

An open-source data collector, which lets you unify the data collection and consumption for a better use and understanding of data. Decouples data sources from backend systems by providing a unified logging layer in between, and performing filtering/transforming, and sending it to another place.

Written in a combination of C and Ruby, and requires very little system resource (vanilla instance runs on 30-40MB of memory).

```
# input
tail -f myapp.log | grep "what i want"

# output
example.log
```

### Unified Logging Layer

Over the years, the primary consumer of log data shifted from humans to machines, crunching log data and generating reports/statistical calculations to help us make decisions. However, legacy logging infrastructure was not designed to be "machine-first", and much effort was wasted trying to make various backend systems understand log data.

Many existing log formats have very weak structures since we used to be the primary consumer of log data. To avoid this chaos, we can define an interface that all log producers and consumers implement against i.e. JSON, Protocol Buffer, Thrift, etc.

### Why JSON?

For ubiquity and flexibility. Rigid interfaces such as Protocol Buffer are easier to work with but hard to evolve if the underlying data is evolving rapidly.

Also, key goal of Unified Logging Layer is to connect various sources of log data to various destination systems (NoSQL DB, HDFS, RDBMs, etc.). Though JSON might be slower than binary protocol, it has support across various systems.

### Event Structure

Once the events are reported by the Fluentd engine on the Source, they are processed step-by-step or inside a referenced label.

```
tag         Specifies the origin where an event comes from
time        Speciries the time when an event happens
record      Specifies the actual log as a JSON object
```

### Labels

Label aims to solve the configuration file complexity and allows to define new Routing sections that do not follow the top-to-bottom order, instead they act like linked references.

```conf
<source>
  @type http
  bind 0.0.0.0
  port 8888
  @label @STAGING
</source>

<filter test.cycle>
  @type grep
  <exclude>
    key action
    pattern ^login$
  </exclude>
</filter>

<label @STAGING>
  <filter test.cycle>
    @type grep
    <exclude>
      key action
      pattern ^logout$
    </exclude>
  </filter>

  <match test.cycle>
    @type stdout
  </match>
</label>
```
