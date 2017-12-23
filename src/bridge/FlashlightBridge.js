/**
 * @name Flashlight Bridge
 * @description
 * Dore Flashlight Bridge to on off Flashlight
 *
 * @example
 *
 * DoreClient.onFlashlight('')
 * DoreClient.offFlashlight('')
 *
 */
let FlashlightBridge = (payload, Flashlight) => {
  if (payload.type === 'ON') {
    Flashlight.switchState(true)
  } else if (payload.type === 'OFF') {
    Flashlight.switchState(false)
  }
};

export default FlashlightBridge
