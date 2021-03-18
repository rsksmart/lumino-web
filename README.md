# RIF Lumino node WEB

![Lumino Network](Lumino.png?raw=true "RIF Lumino Network")


## Pre requisites

1. RIF Lumino Node Running
2. Yarn (Latest Version)
3. NodeJS v12.20.2

## Recomended usage

The RIF Lumino Client comes with a production build of the Lumino node Web that shows up when the node starts. This repository includes the source code of that build and is intended to developers that want to make changes. 

If you don't plan to modify the source code, please use the production build.



## Build RIF Lumino WEB from code

1. Get the code by cloning this repo
2. Go to the path you downloaded or cloned Lumino's code (lets call this path `$RIF_LUMINO_WEB_PATH`)

3. Run ```yarn install```

## Start your RIF Lumino Node WEB

1. Go to `$RIF_LUMINO_WEB_PATH`
2. Setup the .env file there:
```dotenv
REACT_APP_NODE_ADDRESS=0x223c10155C348195F40e427FeD7e0FB7D1C4d025
REACT_APP_NODE_RNS_DOMAIN=domain.rsk
REACT_APP_RSK_RPC_ENDPOINT=http://localhost:4444
REACT_APP_LUMINO_ENDPOINT=http://localhost:5001
```
Where those values are:

**REACT_APP_NODE_ADDRESS**: the address the lumino node is using.
**REACT_APP_NODE_RNS_DOMAIN**: the rns domain associated to that address.
**REACT_APP_RSK_RPC_ENDPOINT**: the rsk node rpc endpoint.
**REACT_APP_LUMINO_ENDPOINT**: the lumino node endpoint.

2. Run the following command:

```
yarn start
```

**Note: You can start the web without specifying `REACT_APP_NODE_RNS_DOMAIN` if your Lumino node is not registered into RNS.** 


3.  After you run yarn command you will be presented with the following message:

```
yarn run $YOUR_YARN_VERSION
$ react-scripts start
Starting the development server...
Compiled successfully!

You can now view RIF-Lumino in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://$YOUR_PUBLIC_IP_MACHINE:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```


## Additional help

The following sections are created using an Ubuntu 18.04.2 LTS


### Install Yarn

Download it from: [https://yarnpkg.com/en/docs/install#debian-stable](https://yarnpkg.com/en/docs/install#debian-stable))

You will first need to configure the repository:

``` curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - ```
```
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Update your local APT repository:

```sudo apt-get update```

Install Yarn:

``````
sudo apt-get install --no-install-recommends yarn
``````

Test that Yarn is installed by running:

```
yarn --version
```

## Useful Links

* [RIF Lumino Network documentation](https://www.rifos.org/rif-lumino-network/)
* [http://explorer.lumino.rifos.org/](https://explorer.lumino.rifos.org/)
* [RIF Lumino Contracts](https://github.com/rsksmart/lumino-contracts) 
* [RIF Lumino Network](https://github.com/rsksmart/lumino) 
* [RIF Lumino Explorer](https://github.com/rsksmart/lumino-explorer) 
