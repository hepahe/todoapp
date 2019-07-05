let UIActions = (function() {
    let DOMStrings = {
        inputValue: '.add-task',
        inputButton: '.add-btn',
        unfinishedTasksList: '.unfinished-task-list',
        finishedTasksList: '.finished-task-list',
        container: '.unfinished-tasks'
    }

    return {
        getInput: function() {
            return {
                value: document.querySelector(DOMStrings.inputValue).value
            }
        }, getDOMStrings: function(){
            return DOMStrings;
        }, getListTask: function(obj) {
            let html, newHtml, element;
            //html with placeholders
            html = '<div class="task clearfix" id="unfinished-%id%"><div class="task value">%value%</div><div class="task-finish-btn"><button class="task-finish-btn">v</button></div></div>'
            element = DOMStrings.unfinishedTasksList;
            //replace placeholders with data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%value%', obj.value);
            let test = obj.value;
            //insert html into DOM

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        }, 
        deleteTaskItem: function (id) {
            let el = document.getElementById(id);
            el.parentNode.removeChild(el);
            
        }, emptyInputField: function() {
            let field, fieldArr;  
            DOMStrings.inputValue.value = "";
            field = document.querySelectorAll(DOMStrings.inputValue);
            fieldArr = Array.prototype.slice.call(field);
            fieldArr.forEach(function(current,i,arr){
                current.value = "";
            });
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
        }, deleteTask: function(id) {
            let ids = data.allTasks.unfinishedTask.map(function(current){
                return current.id;
            });

            let i = ids.indexOf(id);
            if (i !== -1) {
                data.allTasks.unfinishedTask.splice(i,1);
            }
        },
        testing: function() {
            console.log(data.allTasks.unfinishedTask);
        }
    }
    


    //copy input
//add task
})();

let events = (function(UIActs, dataChngs) {
    let setEventHandler = function() {
        let DOMString = UIActs.getDOMStrings();
        document.querySelector(DOMString.inputValue).focus();
        document.querySelector(DOMString.inputButton).addEventListener('click', addBtn);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which ===13) {
                addBtn();
            }
        })

        document.querySelector(DOMString.container).addEventListener('click', deleteTask);
    }

    let addBtn = function () {

        //get input 
        let value = UIActs.getInput().value;

        if (value !== "") {
            // add task
            let newTask = dataChngs.addTask(value);
            let gettask = UIActs.getListTask(newTask);

            //empty input field 
            UIActs.emptyInputField();
        }
    };
    let markTaskAsFinished = function(event) {
        
    }

    let deleteTask = function (event) {

        let itemID = event.target.parentNode.parentNode.id;
            if (itemID) {
                let splitID = itemID.split('-');
                let targetID = parseInt(splitID[1]);
                
                //delete task from data structure 
                dataChngs.deleteTask(targetID);

                //delete task from UI

                UIActs.deleteTaskItem(itemID);
        }
    }
    return {
        init: function() {
            setEventHandler();
            console.log('toimii!');
        }
    }

})(UIActions, dataChanges);

events.init();