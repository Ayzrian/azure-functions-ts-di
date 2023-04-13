import {appContainer} from "../inversify/container";
import {Config} from "./types";
import {interfaces} from "inversify";
import ServiceIdentifier = interfaces.ServiceIdentifier;

// You should use string of Symbol identifiers in case there is no class
// specified, and you only have an Interface. Always specify ServiceIdentifier as a type,
// so that when you call "get"/"getAsync" you get correct type returned from container
export const CONFIG: ServiceIdentifier<Config> = Symbol.for('CONFIG');

// The app config can be fetched from external services like App Config, Key Vault or assembled from process.env
// if you are using app settings
appContainer.bind<Config>(CONFIG)
    .toDynamicValue(async () => {
        return {
            appName: 'Test',
            runningEnv: 'local'
        }
    })
    .inSingletonScope();
