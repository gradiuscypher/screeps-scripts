// version 0.1
// manages all respawning

var spawnManager = {
    run: function() {
        // set values
        const MAX_HEAVY_MINERS = 0;
        const MAX_UPGRADER = 1;
        const MAX_HARVESTER = 3;
        const MAX_BUILDERS = 3;

        //clean up garbage memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Removing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var heavy_miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'heavy_miner');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;

        // general stats updates every 10
        if(Game.time %10 == 0) {
            console.log('h:' + harvesters.length + ' [' + MAX_HARVESTER + '] | b:' + builders.length + ' [' + MAX_BUILDERS + '] | u:' + upgraders.length + ' [' + MAX_UPGRADER + '] | E:' + room.energyAvailable + '/' + room.energyCapacityAvailable);
        }

        if(room.energyAvailable >= 800) {
            if(harvesters.length < MAX_HARVESTER) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new Harvester: ' + newName);
                const harvester1 = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                // Game.spawns['spawn1'].spawnCreep(harvester1, newName, {memory: {role: 'harvester', lost:false}});
                Game.spawns['spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester', lost:false}});
            }

            else if(builders.length < MAX_BUILDERS) {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new Builder: ' + newName);
                Game.spawns['spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder', lost:false}});
            }

            else if(upgraders.length < MAX_UPGRADER) {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new Upgrader: ' + newName);
                Game.spawns['spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader', lost:false}});
            }

            else if (heavy_miners.length < MAX_HEAVY_MINERS) {
                const BP_HEAVY_MINER_T1 = [WORK, WORK, WORK, WORK, MOVE];
                const ALL_SOURCES = room.find(FIND_SOURCES);
                const USED_SOURCES = [];

                // find out what sources the other miners are targeting and figure out what one is left
                // generate list of used source IDs
                for(var miner of heavy_miners) {
                    USED_SOURCES.push(miner.memory.targetSource);
                }
                // TODO: ensure that we're moving to the target source, and standing on the container
                for(var tSource of ALL_SOURCES) {
                    console.log(tSource.id);
                    if(!USED_SOURCES.includes(tSource.id)) {
                        console.log(tSource);
                    }
                }
            }
        }
    }

}

module.exports = spawnManager;