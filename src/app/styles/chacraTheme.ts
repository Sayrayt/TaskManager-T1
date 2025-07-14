import {
    createSystem,
    defaultConfig,
    defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        breakpoints: {
            sm: "320px",
            m: "375px",
            md: "768px",
            lg: "960px",
            xl: "1200px",
        },
        tokens: {
            colors: {},
        },
    },
})

const system = createSystem(defaultConfig, config)
export default system;