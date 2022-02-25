console.log('%cquests loaded','color:cyan')

class Quest {
    constructor(name,parent,checkReq,double,detail) {
        this.name = name;
        this.parentIndex = parent;
        this.checkReq = checkReq;
        this.completeCount = 0;
        this.completed = false;
        this.double = double;
        this.expanded = false;
        this.detail = detail;
    }
    init() {
        this.parent = this.parentIndex!=0?quests[this.parentIndex-1]:new Root();
        this.checkReq();
    }
    complete() {
        this.completeCount++;
        if (this.completeCount==1+(this.double)?1:0) {
            this.realComplete();
        }
    }
    realComplete() {
        this.completed = true;
        this.enabled = false;
        if (this.parentIndex<quests.length-1) {
            quests[this.parentIndex+1].enabled = true;
        }
        game.drawQuests();
    }
}

class Root {
    constructor() {}
}

const quests = [
    new Quest('The beginning',0,()=>{
        complete(0)
    },true,'This is the beginning of this.\nPress \'Check/submit\' to complete this quest!'),
    new Quest('first resource',1,()=>{
        if (Object.keys(player.inv).length>0) {
            complete(1);
        }
    },true,'You can walk around with WASD.\nMove aside to a piece of resource (yellow, brown, and grey).\nThen press the resource on the minimap (bottom-left).\nPress it enough time and it will break and you will get the resource!'),
    new Quest('first craft',2,()=>{
        for (item in player.inv) {
            if (recipes.hasOwnProperty(item) || game.furnace.enabled || game.filterEmpty) {
                complete(2);
                break;
            }
        }
    },true,'After getting enough materials, go to the leftmost side of the map.\nThen go even left, you will go to another room.\nCraft something by clicking one of the recipe boxes.')
]

function complete(i) {
    quests[i].complete();
}

quests.forEach(x=>x.init())
quests[0].enabled = true;

function questToggle(name) {
    quests.forEach(x=>{
        if (x.name == name) {
            x.expanded = (x.expanded)?false:true;
        }
    })
    game.drawQuests();
}