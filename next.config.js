module.exports = {
  env: {
    TABLE_NAME: "production_twali_core",
    WHITELIST_TABLE: "whitelist_table",
  },
  webpack: (config) => {
    if (!process.env.BUNDLE_AWS_SDK) {
      config.externals = config.externals || [];
      config.externals.push({ "aws-sdk": "aws-sdk" });
    } else {
      console.warn("Bundling aws-sdk. Only doing this in development mode");
    }
    return config;
  },
};
