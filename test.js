
const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("./app");

test("GET / returns expected message", async () => {
    const server = app.listen(0);

    try {
        const port = server.address().port;
        const response = await fetch(
            `http://127.0.0.1:${port}/`
        );

        assert.equal(response.status, 200);

        const body = await response.text();
        assert.match(body, /Jenkins CI\/CD/);
    } finally {
        await new Promise((resolve, reject) => {
            server.close(err => err ? reject(err) : resolve());
        });
    }
});

test("GET /health returns OK", async () => {
    const server = app.listen(0);

    try {
        const port = server.address().port;
        const response = await fetch(
            `http://127.0.0.1:${port}/health`
        );

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), {
            status: "OK"
        });
    } finally {
        await new Promise((resolve, reject) => {
            server.close(err => err ? reject(err) : resolve());
        });
    }
});
