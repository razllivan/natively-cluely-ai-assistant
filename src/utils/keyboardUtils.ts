import { getModifierSymbol } from './platformUtils';

/**
 * Converts an Electron Accelerator string to an array of display keys.
 * Platform-aware: returns "Ctrl" on Windows/Linux, "⌘" on Mac.
 * Example: "CommandOrControl+Shift+Space" -> ["Ctrl", "Shift", "Space"] (Windows)
 */
export function acceleratorToKeys(accelerator: string): string[] {
    if (!accelerator) return [];

    const parts = accelerator.split('+');
    return parts.map(part => {
        switch (part.toLowerCase()) {
            case 'commandorcontrol':
            case 'cmd':
            case 'command':
            case 'meta':
                return getModifierSymbol('commandorcontrol');
            case 'control':
            case 'ctrl':
                return getModifierSymbol('ctrl');
            case 'alt':
            case 'option':
                return getModifierSymbol('alt');
            case 'shift':
                return getModifierSymbol('shift');
            case 'up':
            case 'arrowup':
                return '↑';
            case 'down':
            case 'arrowdown':
                return '↓';
            case 'left':
            case 'arrowleft':
                return '←';
            case 'right':
            case 'arrowright':
                return '→';
            default:
                return part.length === 1 ? part.toUpperCase() : part;
        }
    });
}

/**
 * Converts an array of display keys to an Electron Accelerator string.
 * Accepts both Mac symbols (⌘) and text modifiers (Ctrl).
 * Example: ["Ctrl", "Shift", "Space"] -> "CommandOrControl+Shift+Space"
 */
export function keysToAccelerator(keys: string[]): string {
    const modifiers: string[] = [];
    let mainKey = '';

    keys.forEach(key => {
        switch (key.toLowerCase()) {
            case 'meta':
            case 'command':
            case 'cmd':
            case '⌘':
            case 'ctrl':
            case 'control':
            case '⌃':
                modifiers.push('CommandOrControl');
                break;
            case 'alt':
            case 'option':
            case '⌥':
                modifiers.push('Alt');
                break;
            case 'shift':
            case '⇧':
                modifiers.push('Shift');
                break;
            case 'arrowup':
            case 'up':
            case '↑':
                mainKey = 'Up';
                break;
            case 'arrowdown':
            case 'down':
            case '↓':
                mainKey = 'Down';
                break;
            case 'arrowleft':
            case 'left':
            case '←':
                mainKey = 'Left';
                break;
            case 'arrowright':
            case 'right':
            case '→':
                mainKey = 'Right';
                break;
            default:
                mainKey = key.toUpperCase();
        }
    });

    return [...modifiers, mainKey].filter(Boolean).join('+');
}
