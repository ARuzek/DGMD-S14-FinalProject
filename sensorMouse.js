function runSensorMouse() {

console.log('Requesting any Bluetooth Device...');
navigator.bluetooth.requestDevice({
 filters: [
   {name: 'AM1V310'}
 ],
 optionalServices: ['00000000-0001-11e1-9ab4-0002a5d5c51b']
})
.then(device => {
  console.log('Connecting to GATT Server...');
  return device.gatt.connect();
})

// NOTIFICATIONS
.then(server => {
    console.log('Getting Service...');
    return server.getPrimaryService('00000000-0001-11e1-9ab4-0002a5d5c51b');
  })
  .then(service => {
    console.log('Getting Characteristic...');
    return service.getCharacteristic('00e00000-0001-11e1-ac36-0002a5d5c51b');
    //00000002-0001-11e1-ac36-0002a5d5c51b is Gesture Recognition
    //00000008-0001-11e1-ac36-0002a5d5c51b is Carry Position
    //00000010-0001-11e1-ac36-0002a5d5c51b is Activity Recognition
    //00000040-0001-11e1-ac36-0002a5d5c51b is Compass (easy to use)
    //00000100-0001-11e1-ac36-0002a5d5c51b is Quater ???
    //00e00000-0001-11e1-ac36-0002a5d5c51b is Acc Gyr Mag
    //00000400-0001-11e1-ac36-0002a5d5c51b is Acc Event (Can't get it to pass data like the others though)
    //00140000-0001-11e1-ac36-0002a5d5c51b is Pressure and Temperature
    //04000000-0001-11e1-ac36-0002a5d5c51b is the Sound / Audio
    //08000000-0001-11e1-ac36-0002a5d5c51b is also Sound / Audio
    //40000000-0001-11e1-ac36-0002a5d5c51b is BV ADPCM Sync???
    //00000001-000e-11e1-ac36-0002a5d5c51b is empty?
    //00000002-000e-11e1-ac36-0002a5d5c51b is not empty, but not named
    //00000002-000f-11e1-ac36-0002a5d5c51b is calibration
    //00002a05-0000-1000-8000-00805f9b34fb is an error message something
    //00002a01-0000-1000-8000-00805f9b34fb is an error message something
    //00002a00-0000-1000-8000-00805f9b34fb is an error message something
    //00002a04-0000-1000-8000-00805f9b34fb is an error message something
  })
  .then(characteristic => {
    myCharacteristic = characteristic;
    return myCharacteristic.startNotifications().then(_ => {
      console.log('> Notifications started');
      myCharacteristic.addEventListener('characteristicvaluechanged',
          handleNotifications);
    });
  })
  .catch(error => {
    console.log('Argh! ' + error);
  })

  var imgPosition = 100;
  function handleNotifications(event) {
    var value = event.target.value;
    var mySensorData = [];
      for (var i = 0; i < value.byteLength; i++) {
        mySensorData.push(('00' + value.getUint8(i).toString(16)).slice(-2));
      }

      //Convert AccelerationX
      formattedAccXData = mySensorData[3]+mySensorData[2];
      formattedAccXData = parseInt(formattedAccXData, 16);
      if (formattedAccXData > 32767) {
        formattedAccXData = formattedAccXData - 65536;
      }

      //Convert AccelerationY
      formattedAccYData = mySensorData[5]+mySensorData[4];
      formattedAccYData = parseInt(formattedAccYData, 16);
      if (formattedAccYData > 32767) {
        formattedAccYData = formattedAccYData - 65536;
      }

      //Convert Acceleration Z
      formattedAccZData = mySensorData[7]+mySensorData[6];
      formattedAccZData = parseInt(formattedAccZData, 16);
      if (formattedAccZData > 32767) {
        formattedAccZData = formattedAccZData - 65536;
      }

      //Convert Gyro X
      formattedGyrXData = mySensorData[9]+mySensorData[8];
      formattedGyrXData = parseInt(formattedGyrXData, 16);
      if (formattedGyrXData > 32767) {
        formattedGyrXData = formattedGyrXData - 65536;
      }

      //Convert Gyro Y
      formattedGyrYData = mySensorData[11]+mySensorData[10];
      formattedGyrYData = parseInt(formattedGyrYData, 16);
      if (formattedGyrYData > 32767) {
        formattedGyrYData = formattedGyrYData - 65536;
      }

      //Convert Gyro Z
      formattedGyrZData = mySensorData[13]+mySensorData[12];
      formattedGyrZData = parseInt(formattedGyrZData, 16);
      if (formattedGyrZData > 32767) {
        formattedGyrZData = formattedGyrZData - 65536;
      }

      //Convert Mag X
      formattedMagXData = mySensorData[9]+mySensorData[8];
      formattedMagXData = parseInt(formattedMagXData, 16);
      if (formattedMagXData > 32767) {
        formattedMagXData = formattedMagXData - 65536;
      }

      //Convert Mag Y
      formattedMagYData = mySensorData[11]+mySensorData[10];
      formattedMagYData = parseInt(formattedMagYData, 16);
      if (formattedMagYData > 32767) {
        formattedMagYData = formattedMagYData - 65536;
      }

      //Convert Mag Z
      formattedMagZData = mySensorData[13]+mySensorData[12];
      formattedMagZData = parseInt(formattedMagZData, 16);
      if (formattedMagZData > 32767) {
        formattedMagZData = formattedMagZData - 65536;
      }

      console.log('> ' + 'Acceleration X:' + formattedAccXData + ' AccelerationY:' + formattedAccYData);
      if (formattedAccXData > 0){
        imgPosition = imgPosition+1;
      document.getElementById('circle').style.left = imgPosition + 'px';
    } else if (formattedAccXData < 0){
      imgPosition = imgPosition-1;
      document.getElementById('circle').style.left = imgPosition + 'px';
      } else {
      document.getElementById('circle').style.left = imgPosition + 'px';
      }


    }

}
