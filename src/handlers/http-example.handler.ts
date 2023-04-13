import {injectable} from "inversify";
import {makeHandler} from "../common/inversify/make-handler";
import {Context} from "@azure/functions";
import {BaseHandler} from "../common/handlers/base.handler";
import {Logger} from "../common/logger/logger";
import {FeatureAService} from "../modules/feature-a/feature-a.service";

@injectable()
export class HttpExampleHandler extends BaseHandler {
    constructor(private readonly logger: Logger, private readonly featureAService: FeatureAService) {
        super();

        this.logger.setClassContext(HttpExampleHandler.name)
    }

    async executeFunction(context: Context): Promise<void> {
        try {
            this.logger.info('Processing HTTP request!');

            const name = await this.featureAService.getName();

            context.res = {
                status: 201,
                headers: {
                    'content-type': 'application/json'
                },
                body: {
                    name,
                }
            }
        } catch (e) {
            this.logger.error(e);

            context.res = {
                status: 500,
            }
        }
    }
}

export const handler = makeHandler(HttpExampleHandler)
