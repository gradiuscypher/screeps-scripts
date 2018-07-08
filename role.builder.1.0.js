var roleUpgrader = require('role.upgrader.1.0');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        
        // check to see if we need to get more energy, or if we're not a builder and have no targets
        if(creep.memory.building && creep.carry.energy == 0 || creep.memory.role != 'builder' && targets.length == 0) {
            creep.memory.building = false;
        }
        
        // if we're not building and have full energy, and have targets, lets build!
        else if(!creep.memory.building && (creep.carry.energy == creep.carryCapacity) && targets.length > 0) {
            creep.memory.building = true;
        }
        
        // if we're actually building already, and we have targets, keep building!
        if(creep.memory.building) {
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        
        // if we're a builder, find the builder sources and harvest
        else if(creep.memory.role == 'builder' && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

        else {
            roleUpgrader.run(creep);
        }
    }
};

module.exports = roleBuilder;