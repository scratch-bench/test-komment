import { phone } from "telephonics";
import { event_queue, state, Task } from "trust-me-globals";
import { heavy_lifting } from "somehwere-else";
import { sleep } from "util";

function call_somewhere_else() {
    phone.ensure_configured();
    handset = phone.get_handset();
    event_queue.push_task(Task(handset));
}

function take_a_break(allowance) {
    sleep(allowance);
}

function finish_up() {
    // shh, this does nothing for now but we have big plans
}

function fetch_global_result(params) {
    return state.get("result").then((val) => { return val });
}

function the_name_is_uninformative() {
    call_somewhere_else();
    heavy_lifting();
    take_a_break(brak_allowance());
    finish_up();

    return fetch_global_result();
}

export default function() {
    report_back_with(the_name_is_uninformative());
}

