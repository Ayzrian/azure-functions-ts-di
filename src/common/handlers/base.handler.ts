import {Context} from "@azure/functions";
import {injectable} from "inversify";

@injectable()
export abstract class BaseHandler {
    abstract executeFunction(context: Context, ...args: any[]): Promise<void>;
}
