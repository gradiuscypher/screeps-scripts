var roleBuilder = require('role.builder.1.0');


var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // check to see if the creep has energy stored, if not, harvest till energy is full
        if(creep.carry.energy < creep.carryCapacity && !(creep.memory.building || creep.memory.repairing)) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        
        else {
            // if energy is full, check if base needs energy, if so, store energy
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});

                    // bugfix for when creeps get the order to refil base but are in the middle of building
                    creep.memory.building = false;
                    creep.memory.upgrading = false;
                    creep.memory.repairing = false;
                }
            }

            // if energy is full and base doesn't need energy, move to secondary task
            else{
                roleBuilder.run(creep);
            }
        }
    }
};

module.exports = roleHarvester;