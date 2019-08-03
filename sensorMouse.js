function runSensorMouse() {
// Validate services UUID entered by user first.
//let optionalServices = document.querySelector('#optionalServices').value
//  .split(/, ?/).map(s => s.startsWith('0x') ? parseInt(s) : s)
//  .filter(s => s && BluetoothUUID.getService);

console.log('Requesting any Bluetooth Device...');
navigator.bluetooth.requestDevice({
//  filters: [
  // {services: [0x0012, '00002902-0000-1000-8000-00805f9b34fb']}
 //]
 // filters: [...] <- Prefer filters to save energy & show relevant devices.
  //  acceptAllDevices: true})
.then(device => {
  console.log('Connecting to GATT Server...');
  return device.gatt.connect();
})
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

function getSupportedProperties(characteristic) {
let supportedProperties = [];
for (const p in characteristic.properties) {
  if (characteristic.properties[p] === true) {
    supportedProperties.push(p.toUpperCase());
  }
}
return '[' + supportedProperties.join(', ') + ']';
}
