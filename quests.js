console.log('%cquests loaded','color:cyan')

class Quest {
    constructor(name,checkReq,detail) {
        this.name = name;
        this.index = 0;
        this.checkReq = checkReq;
        this.completeCount = 0;
        this.completed = false;
        this.expanded = false;
        this.detail = detail;
        this.enabled = false;
    }
    init() {
        quests.forEach((x,i)=>{
            if (x.name == this.name) {
                this.index = i;
            }
        })
    }
    complete() {
        this.completeCount++;
        if (this.completeCount==1) {
            this.realComplete();
        }
    }
    realComplete() {
        this.completed = true;
        this.enabled = false;
        if (this.index<quests.length-1) {
            quests[this.index+1].enabled = true;
        }
        game.drawQuests();
    }
}

class Root {
    constructor() {}
}

const quests = [
    new Quest('The beginning',()=>{
        complete('The beginning')
    },'This is the beginning of this.\nPress \'Check/submit\' to complete this quest!'),
    new Quest('first resource',()=>{
        if (Object.keys(player.inv).length>0) {
            complete('first resource');
        }
    },'You can walk around with WASD.\nMove aside to a piece of resource (yellow, brown, and grey).\nThen press the resource on the minimap (bottom-left).\nPress it enough time and it will break and you will get the resource!'),
    new Quest('first craft',()=>{
        for (item in player.inv) {
            if (recipes.hasOwnProperty(item) || game.furnace.enabled || game.filterEmpty) {
                complete('first craft');
                break;
            }
        }
    },'After getting enough materials, go to the leftmost side of the map.\nThen go even left, you will go to another room.\nCraft something by clicking one of the recipe boxes.')
]

function complete(name) {
    quests.forEach(x=>{
        if (x.name == name) {
            x.complete();
        }
    })
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

if (localStorage.getItem('$fc_questsState')!==null) {
    game.restoreQuests();
}