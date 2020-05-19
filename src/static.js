export const isWebDeploy = process.env.MODE === 'spa' || process.env.MODE === 'pwa'
export const isMobileDeploy = process.env.MODE === 'cordova' || process.env.MODE === 'capitor'
