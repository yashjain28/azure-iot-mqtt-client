/**
 * Type: Library
 * Description: A library that contains a function which, when called, returns an object with a public API.
 */

const buffer = require("buffer/").Buffer;
const createHmac = require("create-hmac");
var generateSasToken = function (
  resourceUri,
  signingKey,
  policyName,
  expiresInMins
) {
  resourceUri = encodeURIComponent(resourceUri);

  // Set expiration in seconds
  var expires = Date.now() / 1000 + expiresInMins * 60;
  expires = Math.ceil(expires);
  var toSign = resourceUri + "\n" + expires;

  // Use crypto
  var hmac = createHmac("sha256", buffer.from(signingKey, "base64"));
  hmac.update(toSign);
  var base64UriEncoded = encodeURIComponent(hmac.digest("base64"));

  // Construct authorization string
  var token =
    "SharedAccessSignature sr=" +
    resourceUri +
    "&sig=" +
    base64UriEncoded +
    "&se=" +
    expires;
  if (policyName) token += "&skn=" + policyName;
  return token;
};


global.generateSasToken = generateSasToken;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      generateSasToken: typeof generateSasToken;
    }
  }
}