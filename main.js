var roleHarvester = require('role.harvester.1.0');
var roleUpgrader = require('role.upgrader.1.0');
var roleBuilder = require('role.builder.1.0');
var spawnManager = require('spawn_manager');
var recoverLost = require('recover_lost');


module.exports.loop = function () {
    spawnManager.run();
    //var controller = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER);
    //console.log(controller);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        recoverLost.run(creep);

        if(!creep.memory.lost) {
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    }
}