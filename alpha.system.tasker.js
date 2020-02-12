// manages what tasks each of the screeps should be working on
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder')

// TODO IDEA:
// Separate tasks into criticality levels: critical, high, medium, low, trivial
// Determine which tasks can be completed and which ones can wait until the next available creep
// Determine the number of creeps required per task, per level of criticality, and deploy based on those needs

// TODO:
// Spawn more creeps based on minimum number of creeps or need
// Include ability to raise criticality of tasks if they've been ignored too long, maybe measure need on a scale from 0 to 100

// Minimum number of ticks before creeps upgrade the controller
const MIN_CONTROLLER_TICKS = 15000;

var alphaSystemTasker = {
    run: function() {
        Memory.tasklist = new Array();
        // calculate the number of creeps that can do work
        var availableWorkerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker').length;

        // under attack (TODO):
        // send out defenders/attackers
        // repair what defense structures need to be repaired (towers, walls)
        // move worker creeps into safer zones
        
        // keep the base alive:
        // does the room controller need upgrading to not expire
        var tickCount = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].ticksToDowngrade;
        if(tickCount <= MIN_CONTROLLER_TICKS) {
            Memory.tasklist.push("controllerupgrade");
        }

        // does the spawner need more energy
        // TODO: Finish
        var room = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0].room;
        var spawnerEnergyPercent = (room.energyAvailable/room.energyCapacityAvailable) * 100;

        // test values
        // var spawnerEnergyPercent = 50;
        // var availableWorkerCount = 6;
        // console.log("spawnerEnergyPercent", spawnerEnergyPercent);
        if(spawnerEnergyPercent <= 25) {
            var spawnCount = Math.ceil(availableWorkerCount * .80);
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(spawnCount)).map(_ => 'spawnerEnergy'));
        }
        else if(spawnerEnergyPercent <= 50) {
            var spawnCount = Math.ceil(availableWorkerCount * .50);
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(spawnCount)).map(_ => 'spawnerEnergy'));
        }
        else if(spawnerEnergyPercent <= 75) {
            var spawnCount = Math.ceil(availableWorkerCount * .25);
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(spawnCount)).map(_ => 'spawnerEnergy'));
        }
        else if(spawnerEnergyPercent < 100) {
            var spawnCount = Math.ceil(availableWorkerCount * .10);
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(spawnCount)).map(_ => 'spawnerEnergy'));
        }

        // keep the resources up (TODO)
        // does the energy stores need more energy

        // keeping infrastructure up (TODO)
        // do any structures (link, storage, towers, walls, roads) need repairs (less than a threshold)

        // building unbuilt structures
        var site_count = room.find(FIND_CONSTRUCTION_SITES).length;
        if(site_count <= 0) {
            // 0% allocation
        }
        if(site_count <= 2) {
            // 25% allocation
            var spawnCount = Math.ceil(availableWorkerCount * .25);
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(spawnCount)).map(_ => 'build'));
        }
        if(site_count < 4) {
            // 50% allocation
            var spawnCount = Math.ceil(availableWorkerCount * .50);
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(spawnCount)).map(_ => 'build'));
        }
        if(site_count >= 4) {
            // 75% allocation
            var spawnCount = Math.ceil(availableWorkerCount * .75);
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(spawnCount)).map(_ => 'build'));
        }

        // housekeeping tasks: split the remaining count of creeps on these tasks
        var remainingCreepCount = availableWorkerCount - Memory.tasklist.length;
        if(remainingCreepCount > 0) {
            // upgrade the room controller
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(Math.ceil(remainingCreepCount/2))).map(_ => 'controllerUpgrade'));
            // pickup dropped energy
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(Math.ceil(remainingCreepCount/2))).map(_ => 'collectEnergy'));
        }

        if(Game.time % 2 == 0) {
            console.log(Memory.tasklist);
        }
        var workingCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        // console.log(workingCreeps)

        for(var name in workingCreeps) {
            // var creep = Game.creeps[name];
            var creep = workingCreeps[name]
            // if the creep is a specialist, do your special job
            // heavy miner
            // transporter

            // otherwise, pick up a task off the list
            var targetTask = Memory.tasklist.shift();
            // console.log("targetTask:", targetTask);
            switch (targetTask) {
                case 'spawnerEnergy':
                    roleHarvester.run(creep);
                    break;
                case 'build':
                    roleBuilder.run(creep);
                    break;
                case 'controllerUpgrade':
                    roleUpgrader.run(creep);
                    break;
                case 'collectEnergy':
                    roleUpgrader.run(creep);
                    break;
            }

        }
    }
}
module.exports = alphaSystemTasker;
