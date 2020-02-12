var roleHarvester = {
    run: function(creep) {
        if(!creep.memory.source) {
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.source = _.sample(sources).id;
        }

        if(creep.store.getFreeCapacity() > 0) {
            var targetSource = Game.getObjectById(creep.memory.source)
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#FFAA00'}});
            }
        }

        else {
            // TODO: scheduling of energy sources in the room, don't just use the first one found.
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#FFFFFF'}})
                }
            }
        }
    }
};

module.exports = roleHarvester;