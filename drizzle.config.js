/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://moc%20interviewer_owner:gMXr1KHofz8F@ep-shiny-base-a5ijjzdc.us-east-2.aws.neon.tech/moc%20interviewer?sslmode=require",
  },
};
