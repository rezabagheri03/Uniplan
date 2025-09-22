declare module 'hpp' {
    import { RequestHandler } from 'express'
    interface Options {
        checkBody?: boolean
        checkQuery?: boolean
        checkParams?: boolean
        parameterWhitelist?: string[]
    }
    function hpp(options?: Options): RequestHandler
    export = hpp
}
