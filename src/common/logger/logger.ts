import {Logger as AzureLogger} from "@azure/functions";
import {injectable} from "inversify";

@injectable()
export class Logger {
    private classContext = 'Logger'
    constructor(private readonly azureLogger: AzureLogger, private readonly executionContext: object = {}) {
    }

    setClassContext(classContext: string) {
        this.classContext = classContext;
    }

    error(...args: any[]) {
        this.azureLogger.error(...this.makeMessageWithContext(args));
    }

    warn(...args: any[]) {
        this.azureLogger.warn(...this.makeMessageWithContext(args));
    }

    info(...args: any[]) {
        this.azureLogger.info(...this.makeMessageWithContext(args));
    }

    verbose(...args: any[]) {
        this.azureLogger.verbose(...this.makeMessageWithContext(args));
    }

    private makeMessageWithContext(args: any[]) {
        return [`[${this.classContext}]`, ...args, this.executionContext]
    }
}
