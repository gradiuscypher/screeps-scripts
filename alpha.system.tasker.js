// manages what tasks each of the screeps should be working on

// TODO IDEA:
// Separate tasks into criticality levels: critical, high, medium, low, trivial
// Determine which tasks can be completed and which ones can wait until the next available creep
// Determine the number of creeps required per task, per level of criticality, and deploy based on those needs
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
        var spawnerEnergyPercent = (Game.spawns['Spawn1'].energy / Game.spawns['Spawn1'].energyCapacity) * 100;
        console.log(spawnerEnergyPercent);
        if(spawnerEnergyPercent <= 25) {
            // put half the creeps on spawner
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(availableWorkerCount/2)).map(_ => 'spawnerEnergy'));
        }
        else if(spawnerEnergyPercent <= 50) {
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(2)).map(_ => 'spawnerEnergy'));
        }
        else if(spawnerEnergyPercent <= 75) {
            Memory.tasklist = Memory.tasklist.concat(Array.apply(null, Array(2)).map(_ => 'spawnerEnergy'));
        }

        // keep the resources up (TODO)
        // does the energy stores need more energy

        // keeping infrastructure up (TODO)
        // do any structures (link, storage, towers, walls, roads) need repairs (less than a threshold)

        // housekeeping tasks: split the remaining count of creeps on these tasks
        // upgrade the room controller
        // pickup dropped energy

        for(var creep in Game.creeps) {
            // if the creep is a specialist, do your special job
            // heavy miner
            // transporter

            // otherwise, pick up a task off the list
            // console.log(Memory.tasklist.pop());
        }
        console.log(Memory.tasklist);
    }
}
module.exports = alphaSystemTasker;


function mineEnergy(creep) {
    console.log("I would have mined.");
}

function refillController(creep) {
    console.log("Refilling the controller.");
}

function refillSpawner(creep) {
    console.log("Refilling the Spawn.");
}