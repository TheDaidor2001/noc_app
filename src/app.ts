
import { envs } from "./config/plugins/envs.plugins";
import { Server } from "./presentation/server";



(() => {
    main();
})();



function main() {
    Server.start()
}
