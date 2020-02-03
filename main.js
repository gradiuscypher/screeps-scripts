// roles
var roleHarvester = require('role.harvester');
var roleUpgrager = require('role.upgrader');
var roleBuilder = require('role.builder');
//systems
var systemSpawner = require('system.spawner');

module.exports.loop = function () {
    systemSpawner.run();

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