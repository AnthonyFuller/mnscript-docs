import { getMNScriptData } from "../private/data/mnscript"

export default {
    async paths() {
        return (await getMNScriptData()).libraries
    }
}
