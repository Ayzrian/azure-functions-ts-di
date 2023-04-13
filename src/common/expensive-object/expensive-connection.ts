import {Config} from "../config/types";

// This entity just emulates an expensive object, like connection that should be re-used
export class ExpensiveConnection {
    constructor(config: Config) {
    }

    async connect() {
        // some logic...
    }
}
