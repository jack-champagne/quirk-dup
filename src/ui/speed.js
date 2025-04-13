import {Config} from "../Config.js"

function handleSpeedChange(e) {
    const chosenExp = Number(e.target.value) / 2;
    const chosenSpeed = Math.pow(2, chosenExp) * 1000;
    Config.CYCLE_DURATION_MS = chosenSpeed;
}

/**
 * @param {!Revision} revision
 * @param {!Observable.<boolean>} obsIsAnyOverlayShowing
 */
function initSpeed(revision, obsIsAnyOverlayShowing) {
    const overlay_divs = [
        document.getElementById('gate-forge-div'),
        document.getElementById('export-div')
    ];

    const speedSlider = document.getElementById('time-speed-control');
    
    speedSlider.addEventListener('change', handleSpeedChange);
}

export {initSpeed}
