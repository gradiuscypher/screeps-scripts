var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
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