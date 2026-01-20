interface EnvConfig {
    baseURL: string;
    apiURL: string;
    frtBaseURL: string; // Nueva propiedad para la URL base de Free Range Testers
    // extraHTTPHeaders?: {
    //     [key: string]: string;
    // } 
}

export class Environment {

    private static config: Record<string, EnvConfig> = {

        DEV: {
            baseURL: "https://dev.example.dev.com",
            apiURL: "https://api.dev.example.com",
            frtBaseURL: "https://thefreerangetester.com"
            // extraHTTPHeaders: {
            //     Authorization: `Bearer dev-token`,
            // },
        },
        TEST: {
            baseURL: "https://dev.example.test.com",
            apiURL: "https://api.dev.example.com",
            frtBaseURL: "https://thefreerangetester.com"
            // extraHTTPHeaders: {
            //     Authorization: `Bearer test-token`,
            // },
        },
        PROD: {
            baseURL: "https://dev.example.prod.com",
            apiURL: "https://api.dev.example.com",
            frtBaseURL: "https://thefreerangetester.com"
            // extraHTTPHeaders: {
            //     Authorization: `Bearer prod-token`,
            // },
        },
        DEFAULT: {
            baseURL: "https://thefreerangetester.github.io/sandbox-automation-testing/",
            apiURL: "https://api.github.com",
            frtBaseURL: "https://thefreerangetester.com"
            // // extraHTTPHeaders: {
            //     Authorization: `Bearer default-token`,
            // },
        },
    };

    static getConfig(): EnvConfig {
        const env = process.env.ENVIRONMENT || "DEFAULT";
        // return this.config[env] || this.config["DEFAULT"];
        return Environment.config[env] || Environment.config["DEFAULT"];
    }
}