/**
 * Local helper functions specifically for this tool. 
 */

export function attachToolHooks(controllerInstance) {
    // Setup local watchers or specialized DOM hooks
    console.log("Hooks attached for tool", controllerInstance);
}

export function formatSequence(seq) {
    return seq.trim().toUpperCase();
}
