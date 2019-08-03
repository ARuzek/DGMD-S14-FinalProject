function runSensorMouse() {
// Validate services UUID entered by user first.
//let optionalServices = document.querySelector('#optionalServices').value
//  .split(/, ?/).map(s => s.startsWith('0x') ? parseInt(s) : s)
//  .filter(s => s && BluetoothUUID.getService);

console.log('Requesting any Bluetooth Device...');
navigator.bluetooth.requestDevice({
 filters: [
   {name: 'AM1V310'}

   //{services: [0x0013, 0x12, '00000400-0001-11e1-ac36-0002a5d5c51b']}
 ],
 // filters: [...] <- Prefer filters to save energy & show relevant devices.
 //acceptAllDevices: true
 optionalServices: ['00000000-0001-11e1-9ab4-0002a5d5c51b']
})
.then(device => {
  console.log('Connecting to GATT Server...');
  return device.gatt.connect();
})

//TRY

.then(server => {
  var XYZ = '00000000-0001-11e1-9ab4-0002a5d5c51b'
  // Getting Battery Service...
  return server.getPrimaryService('00000000-0001-11e1-9ab4-0002a5d5c51b');
})
.then(service => {
  var magX = '00000002-0001-11e1-ac36-0002a5d5c51b'; //170?
  var ABC = '00000008-0001-11e1-ac36-0002a5d5c51b'; //152
  var ABC = '00000010-0001-11e1-ac36-0002a5d5c51b'; //223
  var ABC = '00000040-0001-11e1-ac36-0002a5d5c51b'; //DOM Exception
  var ABC = '00000100-0001-11e1-ac36-0002a5d5c51b'; //NOPE
  var ABC = '00000400-0001-11e1-ac36-0002a5d5c51b'; //3
  var ABC = '00140000-0001-11e1-ac36-0002a5d5c51b'; //209
  var ABC = '00e00000-0001-11e1-ac36-0002a5d5c51b';
  var ABC = '04000000-0001-11e1-ac36-0002a5d5c51b';
  var ABC = '08000000-0001-11e1-ac36-0002a5d5c51b';
  var ABC = '40000000-0001-11e1-ac36-0002a5d5c51b';

  // Getting Battery Level Characteristic...
  return service.getCharacteristic('00e00000-0001-11e1-ac36-0002a5d5c51b');
})
.then(characteristic => {
  // Reading Battery Level...
  return characteristic.readValue();
})
.then(value => {
  console.log('This value is ' + value.getUint8(0));
})
.catch(error => { console.log(error); });

/*
//ORIGINAL TUTORIAL//


.then(server => {
  // Note that we could also get all services that match a specific UUID by
  // passing it to getPrimaryServices().
  console.log('Getting Services...');
  return server.getPrimaryServices();
})
.then(services => {
  console.log('Getting Characteristics...');
  let queue = Promise.resolve();
  services.forEach(service => {
    queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
      console.log('> Service: ' + service.uuid);
      characteristics.forEach(characteristic => {
        console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
            getSupportedProperties(characteristic));

      });
    }));
  });
  return queue;
})
.catch(error => {
  console.log('Argh! ' + error);
});
}

/* Utils */
/*
function getSupportedProperties(characteristic) {
let supportedProperties = [];
for (const p in characteristic.properties) {
  if (characteristic.properties[p] === true) {
    supportedProperties.push(p.toUpperCase());
  }
}
return '[' + supportedProperties.join(', ') + ']';
}
*/
}
