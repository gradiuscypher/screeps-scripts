var roleHarvester = require('role.harvester.1.0');
var roleUpgrader = require('role.upgrader.1.0');
var roleBuilder = require('role.builder.1.0');
var roleRepairer = require('role.repairer')

var spawnManager = require('spawn_manager');
var combatManager = require('combat_manager');
var flagControlManager = require('flag_control_manager');
var recoverLost = require('recover_lost');


module.exports.loop = function () {
    spawnManager.run();
    combatManager.run();
    flagControlManager.run();

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