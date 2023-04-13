import {ClassForFactoryService} from "./class-for-factory.service";

export interface ClassForFactoryServiceFactory {
    (someRuntimeParameter: string): Promise<ClassForFactoryService>;
}
