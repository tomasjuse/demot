import * as dotenv from 'dotenv';
import * as path from 'path';

export interface TestConfig {
    testEnv: string;
    loginUrl: string;
    tableUrl: string;
    username: string;
    password: string;
    invalidPassword: string;
    testTimeout: number;
    headless: boolean;
}

export class ConfigManager {
    private static instance: ConfigManager;
    private config!: TestConfig;

    private constructor() {
        this.loadConfig();
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    private loadConfig(): void {
        const env = process.env.TEST_ENV || 'dev';
        const configPath = path.join(__dirname, '..', `.env.${env}`);

        dotenv.config({ path: configPath, override: true });

        this.config = {
            testEnv: env,
            loginUrl: process.env.LOGIN_URL || '',
            tableUrl: process.env.TABLE_URL || '',
            username: process.env.USERNAME || '',
            password: process.env.PASSWORD || '',
            invalidPassword: process.env.INVALID_PASSWORD || '',
            testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
            headless: process.env.HEADLESS === 'true'
        };

        if (!this.config.loginUrl || !this.config.username) {
            throw new Error(`Missing required configuration for environment: ${env}`);
        }
    }

    public getConfig(): TestConfig {
        return this.config;
    }

    public getLoginUrl(): string {
        return this.config.loginUrl;
    }

    public getTableUrl(): string {
        return this.config.tableUrl;
    }

    public getCredentials(): { username: string; password: string; invalidPassword: string } {
        return {
            username: this.config.username,
            password: this.config.password,
            invalidPassword: this.config.invalidPassword
        };
    }
}