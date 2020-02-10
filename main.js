// roles
var roleHarvester = require('role.harvester');
var roleUpgrager = require('role.upgrader');
var roleBuilder = require('role.builder');
//systems
var systemSpawner = require('system.spawner');
// var alphaSystemTasker = require('alpha.system.tasker');

module.exports.loop = function () {
    systemSpawner.run();
    // alphaSystemTasker.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrager.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
};