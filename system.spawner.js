// manages what screeps are spawned

var systemSpawner = {
    run: function() {
        // Clean up the memory of dead screeps
        // TODO: validate if the creep is spawning or not
        for(var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log("Deleting creep from memory", name);
            }
        }

        // max count of what to build
        const MAX_HARVESTER = 3;
        const MAX_BUILDER = 0;
        const MAX_UPGRADER = 4;

        // recipes of how to build them
        const HARVESTER_BP = [WORK, CARRY, MOVE];
        const BUILDER_BP = [WORK, CARRY, MOVE];
        const UPGRADER_BP = [WORK, CARRY, MOVE];

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;

        // print stats every 10 ticks
        if(Game.time % 10 == 0) {
            console.log('h:' + harvesters.length + ' [' + MAX_HARVESTER + '] | b:' + builders.length + ' [' + MAX_BUILDER + '] | u:' + upgraders.length + ' [' + MAX_UPGRADER + '] | E:' + room.energyAvailable + '/' + room.energyCapacityAvailable)
        }

        // start spawning units
        if(room.energyAvailable >= 300) {
            var timestamp = Game.time.toString();
            if(harvesters.length < MAX_HARVESTER) {
                var creepname = 'h' + timestamp.substr(timestamp.length - 3)
                Game.spawns['Spawn1'].spawnCreep(HARVESTER_BP, creepname, {memory: {role: 'harvester'}})
            }

            if(builders.length < MAX_BUILDER) {
                var creepname = 'b' + timestamp.substr(timestamp.length - 3)
                Game.spawns['Spawn1'].spawnCreep(BUILDER_BP, creepname, {memory: {role: 'builder'}})
            }

            if(upgraders.length < MAX_UPGRADER) {
                var creepname = 'u' + timestamp.substr(timestamp.length - 3)
                Game.spawns['Spawn1'].spawnCreep(UPGRADER_BP, creepname, {memory: {role: 'upgrader'}})
            }
        }
    }
}

module.exports = systemSpawner;