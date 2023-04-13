import {Config} from "../config/types";
import {inject} from "inversify";
import {CONFIG} from "../config/di";

// This entity just emulates an expensive object, like connection that should be re-used
export class ExpensiveConnection {
    constructor(@inject(CONFIG) config: Config) {
    }

    async connect() {
        // some logic...
    }
}
