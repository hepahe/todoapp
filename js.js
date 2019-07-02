let UIActions = (function() {
    let DOMStrings = {
        inputValue: '.add-task',
        inputButton: '.add-btn'
    }

    return {
        getInput: function() {
            return {
                value: document.querySelector(DOMStrings.inputValue).value
            }
        }, getDOMStrings: function(){
            return DOMStrings;
        }    
    }

// show unfinished task
//show finished task
//show 10 latest finished tasks 
})();

let dataChanges = (function() {

    let UnfininishedTask = function(id, value) {
        this.id = id;
        this.value = value;
    }

    let FininishedTask = function(id, value) {
        this.id = id;
        this.value = value;
    }

    let data = {
        allTasks: {
            unfinishedTask: [],
            finishedTask: [] 
        }
    }; 

    return {
        addTask: function(value) {
            var newTask, id;

            //create new id

            if (data.allTasks.unfinishedTask.length > 0) {
                id = data.allTasks.unfinishedTask[data.allTasks.unfinishedTask.length -1].id + 1; 
            } else {
                id = 0; 
            } 
            //create new task 
            newTask = new UnfininishedTask(id,value);
            //add new task to array
            data.allTasks.unfinishedTask.push(newTask);

            //return the new task
            return newTask;
        }, 
        testing: function() {
            console.log(data.allTasks);
        }
    }
    


    //copy input
//add task
})();

let events = (function(UIActs, dataChngs) {
    let setEventHandler = function() {
        let DOMString = UIActs.getDOMStrings();
        document.querySelector(DOMString.inputButton).addEventListener('click', addBtn);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which ===13) {
                addBtn();
            }
        })
    }

    // get input
    let addBtn = function () {
        let value = UIActs.getInput();
        dataChngs.addTask(value);
    }
    return {
        init: function() {
            setEventHandler();
            console.log('toimii!');
        }
    }

})(UIActions, dataChanges);

events.init();