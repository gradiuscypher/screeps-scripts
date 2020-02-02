// version 0.1
// transports energy from containers to primary storage

var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // locate the most full container and transport its contents to storage
        const containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
            filter: (container) => container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] > 0
        });

        if(containersWithEnergy.length > 0) {
            // TODO: change this to more smartly find a target container, including making sure the creep picks the container with the most energy available for it
            const targetContainer = containersWithEnergy[0];
            if(creep.withdraw(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetContainer);
            }
        }

        if(creep.carry.energy === creep.carryCapacity) {
            if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
            }
        }
    }
};

module.exports = roleTransporter;