// version 0.1
// allows control of creeps via flags

var flagControlManager = {
    run: function() {
        var room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;
        const ROOM_FLAGS = room.find(FIND_FLAGS);

        for(var flag of ROOM_FLAGS) {
            var targetRoles = _.filter(Game.creeps, (creep) => creep.memory.role === flag.name);
            if(targetRoles.length > 0) {
                for(var creep of targetRoles) {
                    creep.moveTo(flag);
                }
            }
        }
    }
};

module.exports = flagControlManager;