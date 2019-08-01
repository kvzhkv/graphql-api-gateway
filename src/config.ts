interface ServiceInfo {
    url: string;
    name: string;
}
const scanEnv = (): ServiceInfo[] => {
    const urls = [];
    let n = 0;
    while (process.env[`SERVICE_URL_${n}`]) {
        const url = process.env[`SERVICE_URL_${n}`];
        const name = process.env[`SERVICE_NAME_${n}`] || `service-${n}`;
        if (url) {
            urls.push({ url, name });
        }
        n++;
    }
    if (urls.length === 0) {
        throw new Error("Provide at least one remote service.");
    }
    return urls;
};

export const serviceList = scanEnv();

export const serverConfig = {
    port: 5000,
};
