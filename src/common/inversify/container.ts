import "reflect-metadata"
import {BindingScopeEnum, Container} from "inversify";

export const appContainer = new Container({
    // We don't want to do "appContainer.bind" for each and every class, it should be auto bind
    // as soon as we mark it as @injectable, though this is my personal preference.
    autoBindInjectable: true,

    // We want to optimise the assembling logic, the same class should be assembled only once
    // during the execution of a single function, unless different is specified at a class level.
    defaultScope: BindingScopeEnum.Request
})
