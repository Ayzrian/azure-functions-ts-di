import {appContainer} from "../inversify/container";
import {interfaces} from "inversify";
import ServiceIdentifier = interfaces.ServiceIdentifier;
import {ClassForFactoryServiceFactory} from "./types";
import Context = interfaces.Context;
import {Logger} from "../logger/logger";
import {CONFIG} from "../config/di";
import {ClassForFactoryService} from "./class-for-factory.service";
import {getExecutionContainer} from "../inversify/get-execution-context";


// You should use string of Symbol identifiers in case there is no class
// specified, and you only have an Interface. Always specify ServiceIdentifier as a type,
// so that when you call "get"/"getAsync" you get correct return type by TypeScript.
export const CLASS_FACTORY: ServiceIdentifier<ClassForFactoryServiceFactory> = Symbol.for('CLASS_FACTORY');

appContainer.bind<ClassForFactoryServiceFactory>(CLASS_FACTORY).toDynamicValue(async (context: Context) => {
    const executionContainer = getExecutionContainer(context);

    return async (someRuntimeParameter: string) => {
        const logger = await executionContainer.getAsync(Logger)
        const config = await executionContainer.getAsync(CONFIG);

        return new ClassForFactoryService(someRuntimeParameter, config, logger)
    }
});
