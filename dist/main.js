var harvester = require('harvester');
var spawn = Game.spawns.Spawn1;
var creepType = {
    "harvester": 0,
    "builder": 0,
    "ferry": 0
};

var maxHarv = 15;

    var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });

for(var name in Game.creeps) {
	var creep = Game.creeps[name];
	creepType[creep.memory.role]++;
    // creep.say(creep.memory.role);
	if(creep.memory.role == 'harvester') {
	   // creep.moveTo(creep.room.controller);
 		harvester(creep);
	}

	if(creep.memory.role == 'builder') {
	creep.say(creep.memory.role);
		if(creep.carry.energy == 0) {
		    creep.moveTo(22,20);
		    if (spawn.energy > 210){
		        creep.moveTo(Game.spawns.Spawn1);
		    	Game.spawns.Spawn1.transferEnergy(creep);
		    }
		}
		else {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length) {
			    console.log('Found contruction');
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
			} else {
			    creep.moveTo(creep.room.controller);
                creep.upgradeController(creep.room.controller); 
			}
		}
	}
	
	if(creep.memory.role == 'ferry') {
	    creep.say(creep.memory.role);
        if(creep.carry.energy == 0 && spawn.energy > 50) {
			creep.moveTo(Game.spawns.Spawn1);
			Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
		    for(var item in extensions){
		        var extension = extensions[item];
		        if (extension.energy < 50){
                    creep.moveTo(extension);
		            creep.transferEnergy(extension);
		        }
		    }
		}
	}
}

if (spawn.energy > 200){
    var randomValue = Math.random();
    console.log('Auto Production | ', 'Harv#:' + creepType['harvester'], ' | Build#:' + creepType['builder'], ' | Ferry#:' + creepType['ferry']);
    if (creepType['harvester'] < maxHarv || !creepType['harvester']){
        var nodeValue = 0;
        console.log('randomValue', randomValue);
        if (randomValue > 0.5){
            nodeValue = 1;
        }
        console.log('nodeValue', nodeValue);
        Game.spawns.Spawn1.createCreep( [WORK, WORK, CARRY, MOVE], null, {role: 'harvester', random: randomValue, node: nodeValue} );
        console.log('Spawning Harvester for node ' + nodeValue);
    } else if (creepType['builder'] < 5 || !creepType['harvester']){
        Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], null, {role: 'builder', random: randomValue} );
        console.log('Spawning Builder');
    } else if (creepType['ferry'] < 1 || !creepType['ferry']){
        Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], null, {role: 'ferry', random: randomValue} );
        console.log('Spawning Ferry');
    }
} 