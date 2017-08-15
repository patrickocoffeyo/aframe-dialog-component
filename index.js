/**
 * @file index.js
 * Contains a simple A-Frame dialog component.
 */

/* globals AFRAME THREE */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('ui-modal', {
  schema: {
    triggerEvent: {
      default: 'click',
    },
    triggerElement: {
      default: 'a-scene',
    },
    z: {
      default: -4,
    },
  },
  init: function init() {
    const { triggerElement, triggerEvent } = this.data;

    // Add an event listener to the trigger element.
    document
      .querySelector(triggerElement)
      .addEventListener(triggerEvent, e => this.eventHandler(e));

    // Fetch camera object.
    this.cameraEl = document.querySelector('a-entity[camera]');
  },
  eventHandler: function eventHandler() {
    const { el, cameraEl, data: { z } } = this;

    // If this element is not visible, adjust it's position and rotation, and
    // set its visibility to true.
    if (el.getAttribute('visible') === false) {
      // Calculate the position this modal element should assume based on the
      // quaternion of the camera element.
      const vector = new THREE.Vector3(0, 0, z);
      vector.applyQuaternion(cameraEl.object3D.quaternion);
      el.object3D.position.copy(vector);

      // Adjust the modal so that it faces the camera.
      const worldVector = el.object3D.parent.worldToLocal(cameraEl.object3D.getWorldPosition());
      el.object3D.lookAt(worldVector);

      // Show the modal.
      el.setAttribute('visible', true);
    } else {
      // If the modal is visible, toggle it's visibility to false.
      el.setAttribute('visible', false);
    }
  },
});
