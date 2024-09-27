// Importing required modules
const express = require('express');
const app = express();
let DiamSdk = require("diamnet-sdk");
// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!');
});

// Sample route
app.get('/api', (req, res) => {
  const pair = DiamSdk.Keypair.random();
    async function main() {
        try {
          const response = await fetch(
            `https://friendbot.diamcircle.io?addr=${encodeURIComponent(
              pair.publicKey()
            )}`
          );
          const responseJSON = await response.json();
            console.log(responseJSON);
        } catch (e) {
          console.error("ERROR!", e);
        }
        // After you've got your test lumens from friendbot, we can also use that account to create a new account on the ledger.
        try {
          const server = new DiamSdk.Aurora.Server(
            "https://diamtestnet.diamcircle.io/"
          );
          var parentAccount = await server.loadAccount(pair.publicKey()); //make sure the parent account exists on ledger
          var childAccount = DiamSdk.Keypair.random(); //generate a random account to create
          //create a transacion object.
          var createAccountTx = new DiamSdk.TransactionBuilder(parentAccount, {
            fee: DiamSdk.BASE_FEE,
            networkPassphrase: DiamSdk.Networks.TESTNET,
          });
          //add the create account operation to the createAccountTx transaction.
          createAccountTx = await createAccountTx
            .addOperation(
              DiamSdk.Operation.createAccount({
                destination: childAccount.publicKey(),
                startingBalance: "101",
              })
            )
            .setTimeout(180)
            .build();
          //sign the transaction with the account that was created from friendbot.
          await createAccountTx.sign(pair);
          //submit the transaction
          let txResponse = await server
            .submitTransaction(createAccountTx)
            // some simple error handling
            .catch(function (error) {
              console.log("there was an error");
              console.log(error.response);
              console.log(error.status);
              console.log(error.extras);
              return error;
            });
       
            res.json({txResponse, pair:pair.publicKey(),secret:pair.secret()});
        } catch (e) {
          console.log(e);
          res.status(500).send(e);
        }
      }
      main()
});

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;
app.get('/getaccount/:id', async(req, res) => {
    const server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io/");

// the JS SDK uses promises for most actions, such as retrieving an account
const account = await server.loadAccount(req.params.id);

account.balances.forEach(function (balance) {
  console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
});

res.json(account);
})


app.post("/transaction",async(req,res)=>{

  var server = new DiamSdk.Aurora.Server("https://diamtestnet.diamcircle.io")
  var sourceKeys = DiamSdk.Keypair.fromSecret(
    req.body.secret
  );
  var destinationId = req.body.recieverPublicKey;
  
  var transaction;
  
  
  server
    .loadAccount(destinationId)
    // If the account is not found, surface a nicer error message for logging.
    .catch(function (error) {
      if (error instanceof DiamSdk.NotFoundError) {
        res.status(400).json({"message":"The destination account does not exist!"});
        throw new Error("The destination account does not exist!");
      } else return error;
    })
    // If there was no error, load up-to-date information on your account.
    .then(function () {
      return server.loadAccount(sourceKeys.publicKey());
    })
    .then(function (sourceAccount) {
      // Start building the transaction.
      transaction = new DiamSdk.TransactionBuilder(sourceAccount, {
        fee: DiamSdk.BASE_FEE,
        networkPassphrase: DiamSdk.Networks.TESTNET,
      })
        .addOperation(
          DiamSdk.Operation.payment({
            destination: destinationId,
            asset: DiamSdk.Asset.native(),
            amount: req.body.amount,
          })
        )

        .addMemo(DiamSdk.Memo.text("Test Transaction"))
        .setTimeout(180)
        .build();
      transaction.sign(sourceKeys);
      return server.submitTransaction(transaction);
    })
    .then(function (result) {
      console.log("Success! Results:", result);
      res.json({
        message: "Transaction successful!",
        transaction: result,
      })
    })
    .catch(function (error) {
      console.error("Something went wrong!", error);
    
    });
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
