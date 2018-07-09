// version 0.1
// meant to refill the system energy

var roleRefiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const REFILL_PERCENTAGE = .50;

        // if energy is full, check if base needs energy, if so, refill its energy
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });

        // if you have a reasonable amount of energy, refill your target
        if(targets.length > 0 && creep.carry.energy > creep.carryCapacity * REFILL_PERCENTAGE) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }

        // if you don't have enough energy to refill something, go grab some from the storage
        else if(creep.carry.energy < creep.carryCapacity * REFILL_PERCENTAGE) {
        // TODO: Implement
        }
    }
};

module.exports = roleRefiller;