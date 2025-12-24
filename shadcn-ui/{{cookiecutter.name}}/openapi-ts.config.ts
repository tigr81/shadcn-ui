import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
    client: "legacy/axios",
    input: "./openapi.json",
    output: "./src/api/client",
    // exportSchemas: true,
    plugins: [
        {
            name: "@hey-api/sdk",
            // NOTE: this doesn't allow tree-shaking
            asClass: true,
            operationId: true,
            methodNameBuilder: (operation) => {
                // @ts-expect-error: 'name' is not guaranteed to exist on 'operation'
                let name: string = operation.name
                // @ts-expect-error: 'service' is not guaranteed to exist on 'operation'
                const service: string = operation.service

                if (service && name.toLowerCase().startsWith(service.toLowerCase())) {
                    name = name.slice(service.length)
                }

                return name.charAt(0).toLowerCase() + name.slice(1)
            },
        },
    ],
})