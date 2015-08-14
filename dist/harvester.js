module.exports = function(creep) {
    var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
	if(creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		if (creep.memory.node){
		    creep.moveTo(sources[creep.memory.node]);
		    creep.harvest(sources[creep.memory.node]); 
		} else {
		    creep.moveTo(sources[0]);
	    	creep.harvest(sources[0]);
		}
	}
	else {
	    
	    if (creep.memory.node == 0){
            if (creep.memory.random > 0.5){
                creep.moveTo(24,24);
            } else {
                creep.moveTo(25,25);
            }
	    } else {
	        if (creep.memory.random > 0.5){
                creep.moveTo(25,26);
            } else {
               	creep.moveTo(23,26);
            }
	    }
		    
		    creep.transferEnergy(Game.spawns.Spawn1);
	}
}