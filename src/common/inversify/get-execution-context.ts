import {interfaces} from "inversify";
import Context = interfaces.Context;

/**
 * @description returns a container that is related to this specific function execution;
 */
export function getExecutionContainer(context: Context) {
    return context.container;
}
