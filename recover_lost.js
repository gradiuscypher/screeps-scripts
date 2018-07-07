var recoverLost = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name !== 'W5N8') {
            console.log(creep.name + ' is lost!');
            creep.memory.lost = true;
            var controller = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_CONTROLLER)[0];
            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else {
            creep.memory.lost = false;
        }
    }
}

module.exports = recoverLost;