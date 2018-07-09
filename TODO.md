# TODO

### Critical
* Job role re-write
* ~~Role juggling for all roles - kind of done~~ done, keep an eye out 
* ~~Repair bot~~ - first iteration complete
* ~~Using storage containers~~ - can now use `role.transporter` to move from containers to storage
* bug in spawning code could lead to not enough harvesters which will prevent everything else from spawning.
  * need to manage multiple tiers of harvesters to ensure something simple can always spawn
  * I think this was triggered by an invasion

### Important
* move spawn logic to each of the role files
* Multi-room future?

### Helpful
* need someone to clean up dropped energy from things like invaders

### For Fun
* Random names rather than time-based

# Known Bugs
* harvester creeps seem to randomly get stuck in `building:true` or `upgrading:true`
  * potential fix in `role.harvester.1.0.js` on line 31
* harvester creeps go back to harvesting after emptying into a storage that didn't take all their energy


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