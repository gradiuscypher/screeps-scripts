// manages what tasks each of the screeps should be working on

var alphaSystemTasker = {
    run: function() {
        // determine what needs to be done, based on priority
        // under attack:
            // send out defenders/attackers
            // repair what defense structures need to be repaired (towers, walls)
            // move worker creeps into safer zones
        // keep the base alive:
            // does the room controller need upgrading to not expire
            // does the spawner need more energy
        // keep the resources up
            // does the energy stores need more energy
        // keeping infrastructure up
            // do any structures (link, storage, towers, walls, roads) need repairs (less than a threshold)
    }
}
module.exports = alphaSystemTasker;

// Worker Creep:
// Build/Upgrade/Simple Harvest