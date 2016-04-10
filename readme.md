# Introduction

Verdandi is the goddess of the present who measure your fate. She shall guide your startup toward growth and success.

To use the demo version of her (Submitted to Watson Challenge), go to:

`https://verdandi.mybluemix.net/login`

Choose the channel, and she should be able to communicate with you and your team.

Below are for those who would like to folk Verdandi:

# Setup

Setup your service in `manifest.yml` to match your services on Bluemix

`node tools/trainnlc`

Setup your nlc classifier with trainnlc.js and change the nlcID in modules/ibm/nlc.js to the one you got.

`echo "" > key.json` or `cp sample-key.json key.json`

Create a `key.json` file at the root of this repository (Either command above does the job). Refer to `sample-key.json` for a sample of the key file.

`npm i`

Install dependencies.

`sudo npm i -g nodemon`

I like `nodemon` and `supervisor`.

# Run

`nodemon lab`
