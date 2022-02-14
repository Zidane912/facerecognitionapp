const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key d1f42b45d7f54f3c83fd9e5b1e26ca6d");

const Clarifai = require('clarifai');
console.log(Clarifai);

const handleApiCall = (req, res) => {
    stub.PostModelOutputs(
        {
            model_id: "d02b4508df58432fbb84e800597b8959",
            inputs: [{data: {image: {url: req.body.input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }

            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ": " + c.value);
            }
            res.json(response)
        }
    );
app.models
    .predict({id: "f76196b43bbd45c99b4f3cd8e8b40a8a", 
    version: "45fb9a671625463fa646c3523a3087d5"},
    "https://samples.clarifai.com/metro-north.jpg")
    .then(function (response) {
        console.log(response);
    },
    function(err) {
        console.log(err)
        }
    )
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.sendStatus(400).json('unable to get count for entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}
