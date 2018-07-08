var spawnManager = {
    run: function() {
        // set values
        var MAX_UPGRADER = 3;
        var MAX_HARVESTER = 4;
        var MAX_BUILDERS = 2;

        //clean up garbage memory
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Removing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;

        // general stats updates every 10
        if(Game.time %10 == 0) {
            // console.log('h:' + harvesters.length + ' | b:' + builders.length + ' | u:' + upgraders.length + ' | E:' + room.energyAvailable);
            console.log('h:' + harvesters.length + ' [' + MAX_HARVESTER + '] | b:' + builders.length + ' [' + MAX_BUILDERS + '] | u:' + upgraders.length + ' [' + MAX_UPGRADER + '] | E:' + room.energyAvailable + '/' + room.energyCapacityAvailable);
        }

        if(room.energyAvailable >= 800) {
            if(harvesters.length < MAX_HARVESTER) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new Harvester: ' + newName);
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
        }
    }

}

module.exports = spawnManager;