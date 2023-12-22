import { Server } from "./server";
import dotenv from "dotenv";
import connect from "./config/database";

dotenv.config({
    path: ".env",
});

export class Application {
    server!: Server;

    async init() {
        await connect();
        this.initServer();
    }

    private initServer() {
        this.server = new Server();
    }

    start() {
        ((port = process.env.APP_PORT || 5000) => {
            this.server.app.listen(port, () =>
                console.log(`> Listening on port ${port}`)
            );
            this.server.app.use('/api', this.server.router);
        })();
    }
}
