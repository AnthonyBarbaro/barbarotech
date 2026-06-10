#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BarbaroTechPortalStack } from "../lib/barbarotech-portal-stack";

const app = new cdk.App();

new BarbaroTechPortalStack(app, "BarbaroTechPortalStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || "us-west-1",
  },
});
