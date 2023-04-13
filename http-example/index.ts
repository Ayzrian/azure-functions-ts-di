import {AzureFunction} from "@azure/functions"
import {makeHandler} from "../src/common/inversify/make-handler";
import {HttpExampleHandler} from "../src/handlers/http-example.handler";

const httpTrigger: AzureFunction = makeHandler(HttpExampleHandler)
export default httpTrigger;
