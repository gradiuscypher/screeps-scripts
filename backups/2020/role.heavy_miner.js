// version 0.1
// meant to be immobile miner

var roleHeavyMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // figure out which source its supposed to go to and move there
        // target source should be set during spawn
        const TARGET_SOURCE = creep.memory.assignedSource

        // start mining and dropping the resources in the container
        if(creep.harvest(TARGET_SOURCE) == ERR_NOT_IN_RANGE) {
            creep.moveTo(TARGET_SOURCE, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleHeavyMiner;