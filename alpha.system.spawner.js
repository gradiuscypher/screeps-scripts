// manages what creep are spawned

var alphaSystemSpawner = {
    run: function() {
        // determine what we need to spawn
            // how many buildings to build?
            // how many entities need to be repaired
            // are our energy supplies low?
            // maintain a minimum number of something?
        // determine how it should be configured
        // spawn it
        // clean up old creep memory?
    }
}
module.exports = alphaSystemSpawner;


// Creep Types

// Worker Creep: Basic working creep that can do multiple jobs but no specialty
// Build/Upgrade/Simple Harvest/Simple Repair
// [WORK*X, CARRY*Y, MOVE*(some function of WORK+CARRY)]

// Mining Creep: Slow but mines faster than others, meant to mine to a container which others will move energy from
// TODO

// Shipping Creep: Has carry and move but no work, meant to ship from one container to central containers.
// TODO