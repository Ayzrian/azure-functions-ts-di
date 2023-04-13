import {AzureFunction, Context} from "@azure/functions";
import {appContainer} from "./container";
import {BaseHandler} from "../handlers/base.handler";
import {Logger} from "../logger/logger";
import {Container, interfaces} from "inversify";
import Abstract = interfaces.Abstract;

export const makeHandler = (handlerClass: Abstract<BaseHandler>): AzureFunction => {
    return async (context: Context, ...args) => {
        const executionContainer = createExecutionContainer();
        provideExecutionLogger(executionContainer, context);

        const contextLogger = getContextLogger(executionContainer)

        contextLogger.info(`Assembling handler.`)
        const startTime = process.hrtime();

        const handlerInstance: BaseHandler = await executionContainer.getAsync(handlerClass);

        const endTime = process.hrtime(startTime);
        contextLogger.info(`Assembled handled. assemblingTime=${getTimeInMilliseconds(endTime)}ms`)

        await handlerInstance.executeFunction(context, args);
    }
}

function createExecutionContainer() {
    return appContainer.createChild();
}

function provideExecutionLogger(executionContainer: Container, context: Context) {
    // The context.log function must be used to log everything in scope of single context execution
    // that means each execution we must provide a new logger to the application;
    executionContainer.bind(Logger)
        .toDynamicValue(() => new Logger(context.log, {
                correlationId: 'some-correlation-id'
            })
        )
        // We want to create a new logger instance for each class assembled during execution of a function
        // so that each class could have its own logger with own classContext and other potentials class-specific
        // settings, e.g. escaping logic to remove sensitive info from logs;
        .inTransientScope()
}

function getContextLogger(executionContainer: Container) {
    const contextLogger = executionContainer.get(Logger);
    contextLogger.setClassContext('makeHandler');

    return contextLogger;
}

function getTimeInMilliseconds(hrTime: [seconds: number, nanoseconds: number]) {
    return hrTime[0] * 1000 + hrTime[1] / 1000000
}
