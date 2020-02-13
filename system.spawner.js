// manages what screeps are spawned

var systemSpawner = {
    run: function() {
        // Clean up the memory of dead screeps
        // BUG: validate if the creep is spawning or not
        for(var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                console.log("Deleting creep from memory", name);
                delete Memory.creeps[name];
            }
        }

        // max count of what to build
        const MAX_HARVESTER = 8;
        const MAX_BUILDER = 0;
        const MAX_UPGRADER = 0;

        // recipes of how to build them
        const HARVESTER_BP = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        const BUILDER_BP = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        const UPGRADER_BP = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        //const HARVESTER_BP = [WORK, CARRY, MOVE, MOVE];
        // const BUILDER_BP = [WORK, CARRY, MOVE, MOVE];
        // const UPGRADER_BP = [WORK, CARRY, MOVE, MOVE];

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;

        // print stats every 10 ticks
        if(Game.time % 10 == 0) {
            console.log('h:' + harvesters.length + ' [' + MAX_HARVESTER + '] | b:' + builders.length + ' [' + MAX_BUILDER + '] | u:' + upgraders.length + ' [' + MAX_UPGRADER + '] | E:' + room.energyAvailable + '/' + room.energyCapacityAvailable)
        }

        // calculate what creeps we need
        // TODO
        var cSiteCount = Game.constructionSites;
        // console.log(cSiteCount);

        // start spawning units
        if(room.energyAvailable >= 750) {
            var timestamp = Game.time.toString();
            if(harvesters.length < MAX_HARVESTER) {
                var creepname = 'w' + timestamp.substr(timestamp.length - 3)
                Game.spawns['Spawn1'].spawnCreep(HARVESTER_BP, creepname, {memory: {role: 'worker'}})
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