# TODO

### Critical
* Job role re-write
* ~~Role juggling for all roles - kind of done~~ done, keep an eye out 
* Repair bot
* Using storage containers

### Important
* Multi-room future?

### Helpful

### For Fun
* Random names rather than time-based

# Known Bugs
* harvester creeps seem to randomly get stuck in `building:true` or `upgrading:true`
  * potential fix in `role.harvester.1.0.js` on line 31


### Job Role Rewrite
#### Roles
* Heavy Harvester
* Cargo Carrier
* Upgrader
* Builder
* Repairer
* Defense Patrol

#### Notes
* Each role should have a short circuit at the top to validate that there is work to do for that role. If not, just skip processing any of its logic.