var phraseDiv;
var startRecognizeOnceAsyncButton;
var filePicker, audioFile;

var subscriptionKey, serviceRegion;
var SpeechSDK;
var recognizer;

document.addEventListener("DOMContentLoaded", function () {
  startRecognizeOnceAsyncButton = document.getElementById("startRecognizeOnceAsyncButton");
  subscriptionKey = "a6bf0523dd554d9ea768ec19b7ab7d1c";
  serviceRegion = "eastus";
  phraseDiv = document.getElementById("phraseDiv");
  filePicker = document.getElementById("filePicker");
  filePicker.addEventListener("change", function () {
    audioFile = filePicker.files[0];
    startRecognizeOnceAsyncButton.disabled = false;
  });
  startRecognizeOnceAsyncButton.addEventListener("click", function () {
    startRecognizeOnceAsyncButton.disabled = true;
    phraseDiv.innerHTML = "";
    if (subscriptionKey === "" || subscriptionKey === "subscription") {
      alert("Consigue una clave de suscripcion ^w^!");
      return;
    }
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechRecognitionLanguage = "es-MX";
    var audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(audioFile);
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizeOnceAsync(
      function (result) {
        startRecognizeOnceAsyncButton.disabled = false;
        phraseDiv.innerHTML += result.text;
        window.console.log(result);
        recognizer.close();
        recognizer = undefined;
      },
      function (err) {
        startRecognizeOnceAsyncButton.disabled = false;
        phraseDiv.innerHTML += err;
        window.console.log(err);
        recognizer.close();
        recognizer = undefined;
      });
  });
  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
    startRecognizeOnceAsyncButton.disabled = false;
    document.getElementById('content').style.display = 'block';
    document.getElementById('warning').style.display = 'none';
  }
});