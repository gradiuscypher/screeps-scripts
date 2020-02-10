// manages what tasks each of the screeps should be working on

var alphaSystemTasker = {
    run: function() {
        Memory.tasklist = new Array();
        // determine what needs to be done, based on priority.

        // role specific tasks (TODO): they can't really do anything else. if the creep is one of these, do this task
        // heavy miner
        Memory.tasklist.push("heavymine");
        // transporter
        Memory.tasklist.push("transport");

        // under attack (TODO):
        // send out defenders/attackers
        // repair what defense structures need to be repaired (towers, walls)
        // move worker creeps into safer zones
        
        // keep the base alive:
        // does the room controller need upgrading to not expire
        Memory.tasklist.push("controllerupgrade");
        // does the spawner need more energy
        Memory.tasklist.push("spawnenergy");

        // keep the resources up
        // does the energy stores need more energy

        // keeping infrastructure up
        // do any structures (link, storage, towers, walls, roads) need repairs (less than a threshold)

        // housekeeping tasks
        // upgrade the room controller
        // pickup dropped energy

        for(var creep in Game.creeps) {
            console.log(Memory.tasklist.pop());
        }
    }
}
module.exports = alphaSystemTasker;


function mine_task(creep) {
    console.log("I would have mined.")
}
// Worker Creep:
// Build/Upgrade/Simple Harvest