import {inject, injectable} from "inversify";
import {Logger} from "../../common/logger/logger";
import {ClassForFactoryServiceFactory} from "../../common/execution-context-aware-factory/types";
import {CLASS_FACTORY} from "../../common/execution-context-aware-factory/di";

@injectable()
export class FeatureAService {
    constructor(
        private readonly logger: Logger,
        @inject(CLASS_FACTORY) private readonly factory: ClassForFactoryServiceFactory
    ) {
        this.logger.setClassContext(FeatureAService.name);
    }

    async getName() {
        this.logger.info(`Resolving feature name!`)

        const factoryA = await this.factory('FactoryAClass');
        const factoryB = await this.factory('FactoryBClass');

        factoryA.doSomething();
        factoryB.doSomething();

        return 'Feature A'
    }
}
