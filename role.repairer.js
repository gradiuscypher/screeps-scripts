// version 0.1

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});

        // check to see if we need to get more energy, or if we're not a repairer and have no targets
        if(creep.memory.repairing && creep.carry.energy == 0 || creep.memory.role != 'repairer' && !target) {
            creep.memory.repairing = false;
            creep.memory.working = false;
        }

        // if we're not reparing and have full energy, and have targets, lets repair!
        else if(!creep.memory.repairing && (creep.carry.energy == creep.carryCapacity) && target) {
            creep.memory.repairing = true;
            creep.memory.working = true;
        }

        // if we're actually building already, and we have targets, keep building!
        if(creep.memory.repairing) {
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleRepairer;