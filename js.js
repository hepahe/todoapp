let UIActions = (function() {
// show unfinished task
//show finished task
//show 10 latest finished tasks 
})();

let dataChanges = (function() {
//copy input
//add task
})();

let events = (function(UIActs, dataChngs) {

    let addBtn = function () {
    //add eventhandler
    //delete eventhandler
    //mark finished eventhandler 
    }

    document.querySelector('.add-btn').addEventListener('click', addBtn);
    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which ===13) {
            addBtn();
        }
    })

})(UIActions, dataChanges);