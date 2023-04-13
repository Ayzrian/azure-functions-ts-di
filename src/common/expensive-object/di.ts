import {appContainer} from "../inversify/container";
import {ExpensiveConnection} from "./expensive-connection";
import {CONFIG} from "../config/di";
import {getExecutionContainer} from "../inversify/get-execution-context";

// An example of handling the expensive object. You can then inject this class
// into any other classes that have more specific use-case, e.g. classes that operate with
// different entities in your database.
appContainer.bind(ExpensiveConnection)
    .toDynamicValue(async (context) => {
        const executionContainer = getExecutionContainer(context);

        // An example of resolving something
        const config = await executionContainer.getAsync(CONFIG);

        const expensiveConnection = new ExpensiveConnection(config);

        await expensiveConnection.connect();

        return expensiveConnection;
    })
    // This plays key role in re-using the expensive object, in singleton scope means that
    // only one entity of such object is persistent across invocations to execution container.
    .inSingletonScope()
