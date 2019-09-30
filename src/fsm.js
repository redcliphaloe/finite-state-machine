class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error;
        }
        this.initial = config.initial;
        this.activeState = this.initial;
        this.states = config.states;
        this.history = [];
        this.undoHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.states.hasOwnProperty(state)) {
            throw new Error;
        }        
        this.history.push(this.activeState);
        this.undoHistory = [];
        this.activeState = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.states[this.activeState].transitions.hasOwnProperty(event)) {
            throw new Error;            
        }
        this.history.push(this.activeState);
        this.undoHistory = [];
        this.activeState = this.states[this.activeState].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        if (!event) {
            for (const state in this.states) {
                result.push(state);
            } 
            return result;
        }
        for (const state in this.states) {
            if (this.states[state].transitions.hasOwnProperty(event)) {
                result.push(state);                
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this.history.length) {
            return false;            
        }
        this.undoHistory.push(this.activeState);
        this.activeState = this.history.pop();
        return true;        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (!this.undoHistory.length) {
            return false;            
        }     
        this.activeState = this.undoHistory.pop();   
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.undoHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
