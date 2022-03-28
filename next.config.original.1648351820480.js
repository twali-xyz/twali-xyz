module.exports = {
  env: {
    TABLE_NAME: "dev_staging_user_profile_test",
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