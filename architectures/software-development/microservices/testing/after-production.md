## Testing After Production

Though we can define more tests and refine our models, there will come a certain point whereby we cannot reduce the chance of failure to zero prior to deployment.

### Canary Releasing

With canary releasing, we are verifying our newly deployed software by directing amounts of production traffic against the system to see if it performs as expected i.e. functionality, proportional error rates as old service, new algorithms are not suboptimal, etc.

If the new release is bad, you can revert quickly. If it is good, you can push increasing amounts of traffic through the new version. Canary differs from blue/green in that you can expect versions to coexist for longer, and you will have to vary the amounts of traffic.

Nonetheless, the work to shadow production traffic can be complex, and requires a more complex setup.

### MTTR (Mean Time to Repair) vs MTBF (Mean Time Between Failures)

Trade-off between MTBF and MTBF will vary for different organizations, and much of this lies with understanding the true impact of failure in a production environment. For instance, if you are testing out a new software, it makes more sense to get something out now and prove your idea before making it more robust. Hence, testing may be overkill in this case and is quite sensible to avoid it prior to production altogether.
