## Healthchecks

supported in Dockerfile, Compose YAML, docker run and Swarm Services. Docker engine will execute command in container. Expects exit 0 (OK) or exit 1(Error). Have three states: starting, healthy, and unhealthy. Docker run does nothing with healthchecks whereas Services will replace tasks if they failed.

```dockerfile
--interval=DURATION (default: 30s)
--timeout=DURATION (default: 30s)
--start-period=DURATION (default:0s)
--retries=N (default:3)

HEALTHCHECK curl -f http://localhost/ || false      # False same as exit 1
HEALTHCHECK --timeout=2s --interval=3s --retries=3 CMD curl -f http://localhost/ || exit 1
```

```
$docker container run \
  --health-cmd="curl -f localhost:9200/_cluster/health || false" \
  --health-interval=5s \
  --health-retries=3 \
  --health-timeout=2s \
  --health-start-period=15s \
  elasticsearch:2
```
