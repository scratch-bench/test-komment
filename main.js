import { phone } from "telephonics";
import { event_queue, state, Task } from "trust-me-globals";
import { heavy_lifting } from "somehwere-else";
import { sleep } from "util";

/**
 * @description This function ensures that the phone is configured and then queues a
 * task to be executed on the handset.
 */
function call_somewhere_else() {
    phone.ensure_configured();
    handset = phone.get_handset();
    event_queue.push_task(Task(handset));
}

/**
 * @description This function puts the execution of the program on hold for a given
 * amount of time by invoking the `sleep()` function with the given allowance as an
 * argument.
 * 
 * @param { number } allowance - The allowance parameter represents the number of
 * seconds to be slept or waited during the function "take a break".
 */
function take_a_break(allowance) {
    sleep(allowance);
}

/**
 * @description This function does nothing because it is currently empty.
 */
function finish_up() {
    // shh, this does nothing for now but we have big plans
}

/**
 * @description This function returns the value of the `result` property stored In
 * the state object. It first retrieves the state using `state.get("result")` and
 * then returns the returned value wrapped In a Thenable
 * 
 * @param { any } params - Nothing. The `params` parameter is not used within the
 * body of the function `fetch_global_result`.
 * 
 * @returns { Promise } Based on the code snippet provided fetch_global_result function
 * retrieves the value stored within "result" state variable. This function then
 * returns a promise that resolves to the value currently stored within result state
 * variable; consequently the output of the fetch_global_result() function is whichever
 * value had been set using state.set() previously. In other words this functions
 * output will be equal to globalResult stored inside the component
 */
function fetch_global_result(params) {
    return state.get("result").then((val) => { return val });
}

/**
 * @description This function does nothing because all its statements are calls to
 * other functions and the function returns without performing any operations.
 * 
 * @returns { any } There is no output returned by this function. The function doesn't
 * do anything useful - it simply calls other functions without any clear purpose or
 * result.
 */
function the_name_is_uninformative() {
    call_somewhere_else();
    heavy_lifting();
    take_a_break(brak_allowance());
    finish_up();

    return fetch_global_result();
}

/**
 * @description This anonymous self-executing function will immediately report back
 * with the result of calling the function `the_name_is_uninformative()`.
 */
export default function() {
    report_back_with(the_name_is_uninformative());
}
