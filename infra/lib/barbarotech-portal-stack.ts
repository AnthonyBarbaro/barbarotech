import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Duration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as authorizers from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class BarbaroTechPortalStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const allowedOrigin = this.node.tryGetContext("allowedOrigin") || "https://barbaro.tech";
    const extraAllowedOrigins = String(this.node.tryGetContext("extraAllowedOrigins") || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
    const allowedOrigins = Array.from(new Set([allowedOrigin, ...extraAllowedOrigins]));
    const databaseSecretName =
      this.node.tryGetContext("databaseSecretName") || "barbarotech/portal/database-url";
    const stripeSecretName =
      this.node.tryGetContext("stripeSecretName") || "barbarotech/portal/stripe";
    const cognitoDomainPrefix =
      this.node.tryGetContext("cognitoDomainPrefix") || "barbarotech-portal-dev";
    const adminEmail = this.node.tryGetContext("adminEmail") || "anthony@barbaro.tech";
    const adminCognitoSub = this.node.tryGetContext("adminCognitoSub") || "";
    const contactFrom = this.node.tryGetContext("contactFrom") || adminEmail;
    const contactTo = this.node.tryGetContext("contactTo") || adminEmail;
    const callTo = this.node.tryGetContext("callTo") || contactTo;
    const contactIntakeEnabled = this.node.tryGetContext("contactIntakeEnabled") || "true";
    const localCallbackUrl = this.node.tryGetContext("localCallbackUrl") as string | undefined;
    const localLogoutUrl = this.node.tryGetContext("localLogoutUrl") as string | undefined;

    const databaseSecret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "RailwayDatabaseUrlSecret",
      databaseSecretName
    );
    const stripeSecret = secretsmanager.Secret.fromSecretNameV2(this, "StripeSecret", stripeSecretName);

    const uploadBucket = new s3.Bucket(this, "RequestUploadBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: RemovalPolicy.RETAIN,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.POST],
          allowedOrigins,
          allowedHeaders: ["*"],
          exposedHeaders: ["ETag"],
          maxAge: 300,
        },
      ],
    });

    const userPool = new cognito.UserPool(this, "PortalUserPool", {
      selfSignUpEnabled: false,
      signInAliases: { email: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.RETAIN,
      standardAttributes: {
        email: { required: true, mutable: true },
      },
    });

    const userPoolClient = userPool.addClient("PortalUserPoolClient", {
      authFlows: {
        userSrp: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        callbackUrls: [
          `${allowedOrigin}/auth/callback/`,
          ...(localCallbackUrl ? [localCallbackUrl] : []),
        ],
        logoutUrls: [
          `${allowedOrigin}/`,
          ...(localLogoutUrl ? [localLogoutUrl] : []),
        ],
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
      },
      preventUserExistenceErrors: true,
    });

    userPool.addDomain("ManagedLoginDomain", {
      cognitoDomain: {
        domainPrefix: cognitoDomainPrefix,
      },
    });

    new cognito.CfnUserPoolGroup(this, "AdminGroup", {
      userPoolId: userPool.userPoolId,
      groupName: "admin",
    });

    new cognito.CfnUserPoolGroup(this, "ClientGroup", {
      userPoolId: userPool.userPoolId,
      groupName: "client",
    });

    const apiHandler = new nodejs.NodejsFunction(this, "PortalApiHandler", {
      entry: path.join(__dirname, "../../src/server/api/handler.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 512,
      timeout: Duration.seconds(20),
      environment: {
        COGNITO_USER_POOL_ID: userPool.userPoolId,
        DATABASE_SECRET_ID: databaseSecret.secretName,
        STRIPE_SECRET_ID: stripeSecret.secretName,
        REQUEST_UPLOAD_BUCKET: uploadBucket.bucketName,
        PORTAL_RETURN_URL: `${allowedOrigin}/portal/billing/`,
        STRIPE_CHECKOUT_SUCCESS_URL: `${allowedOrigin}/portal/billing/`,
        STRIPE_CHECKOUT_CANCEL_URL: `${allowedOrigin}/portal/billing/`,
        DATABASE_POOL_SIZE: "1",
        ADMIN_EMAIL: adminEmail,
        ADMIN_COGNITO_SUB: adminCognitoSub,
        SES_FROM_EMAIL: contactFrom,
        CONTACT_TO: contactTo,
        CALL_TO: callTo,
        CONTACT_INTAKE_ENABLED: contactIntakeEnabled,
      },
      bundling: {
        minify: true,
        sourceMap: true,
      },
    });

    databaseSecret.grantRead(apiHandler);
    stripeSecret.grantRead(apiHandler);
    uploadBucket.grantPut(apiHandler);

    apiHandler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          "cognito-idp:AdminCreateUser",
          "cognito-idp:AdminAddUserToGroup",
          "cognito-idp:AdminListGroupsForUser",
        ],
        resources: [userPool.userPoolArn],
      })
    );

    apiHandler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail"],
        resources: ["*"],
      })
    );

    const httpApi = new apigwv2.HttpApi(this, "PortalHttpApi", {
      corsPreflight: {
        allowHeaders: ["Authorization", "Content-Type", "Stripe-Signature"],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.POST,
          apigwv2.CorsHttpMethod.PATCH,
          apigwv2.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: allowedOrigins,
        maxAge: Duration.hours(1),
      },
    });

    const integration = new integrations.HttpLambdaIntegration("PortalApiIntegration", apiHandler);
    const authorizer = new authorizers.HttpJwtAuthorizer(
      "PortalJwtAuthorizer",
      `https://cognito-idp.${Stack.of(this).region}.amazonaws.com/${userPool.userPoolId}`,
      {
        jwtAudience: [userPoolClient.userPoolClientId],
      }
    );

    httpApi.addRoutes({
      path: "/stripe/webhook",
      methods: [apigwv2.HttpMethod.POST],
      integration,
    });

    for (const path of ["/contact", "/call-request"]) {
      httpApi.addRoutes({
        path,
        methods: [apigwv2.HttpMethod.POST],
        integration,
      });
    }

    const protectedRoutes: Array<{ path: string; methods: apigwv2.HttpMethod[] }> = [
      { path: "/me", methods: [apigwv2.HttpMethod.GET] },
      { path: "/portal/summary", methods: [apigwv2.HttpMethod.GET] },
      { path: "/portal/retainers", methods: [apigwv2.HttpMethod.GET] },
      { path: "/portal/billing/portal-session", methods: [apigwv2.HttpMethod.POST] },
      { path: "/portal/requests", methods: [apigwv2.HttpMethod.GET, apigwv2.HttpMethod.POST] },
      { path: "/portal/uploads/presign", methods: [apigwv2.HttpMethod.POST] },
      { path: "/admin/clients", methods: [apigwv2.HttpMethod.GET, apigwv2.HttpMethod.POST] },
      { path: "/admin/clients/{clientId}", methods: [apigwv2.HttpMethod.GET, apigwv2.HttpMethod.PATCH] },
      { path: "/admin/clients/{clientId}/invite", methods: [apigwv2.HttpMethod.POST] },
      { path: "/admin/clients/{clientId}/retainers", methods: [apigwv2.HttpMethod.POST] },
      { path: "/admin/retainers/{retainerId}/checkout", methods: [apigwv2.HttpMethod.POST] },
      { path: "/admin/requests", methods: [apigwv2.HttpMethod.GET] },
      { path: "/admin/requests/{requestId}", methods: [apigwv2.HttpMethod.PATCH] },
      { path: "/admin/billing", methods: [apigwv2.HttpMethod.GET] },
    ];

    for (const route of protectedRoutes) {
      httpApi.addRoutes({
        ...route,
        integration,
        authorizer,
      });
    }

    new cdk.CfnOutput(this, "PortalApiEndpoint", { value: httpApi.apiEndpoint });
    new cdk.CfnOutput(this, "PortalUserPoolId", { value: userPool.userPoolId });
    new cdk.CfnOutput(this, "PortalUserPoolClientId", { value: userPoolClient.userPoolClientId });
    new cdk.CfnOutput(this, "RequestUploadBucketName", { value: uploadBucket.bucketName });
  }
}
