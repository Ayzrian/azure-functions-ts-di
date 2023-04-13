import {Config} from "../config/types";
import {Logger} from "../logger/logger";

export class ClassForFactoryService {
    // Sometimes you want to have a class that
    // a) is able to accept some parameters from the runtime
    // b) still can resolve some entities from the container as the dependency.
    constructor(private readonly someRuntimeParameters, private readonly config: Config, private readonly logger: Logger) {
        // setting this parameter just to show-case that this works in runtime.
        this.logger.setClassContext(someRuntimeParameters);
    }

    doSomething() {
        this.logger.info(`This class is a show-case for a fabric with DI!`);
    }
}
