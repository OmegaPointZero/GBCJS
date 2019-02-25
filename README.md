# GBCJS
GameBoy Color JS, my first attempt at emulating a GBC, built on Javascript with JQuery for the UI. 

1. UI: Gameboy basic structure drawn

2. CPU Virtualization: This appears completely functional. Previous issues fixed. 

3. Memory Mapping appears functional. It ain't broke, don't fix it.

4. GPU
-Not yet implemented, interrupts need to be further studied and timing needs to be implemented for the GPU.
-GPU does have a target to draw on (<canvas>)

5. Memory Bank Management
-Not implemented, beginning with 32k games, will deal with this later but hopefully a properly programmed processor I don't need to do much.

6. Sound
-No work yet done.

7. Input/Output
-Nothing done yet.

8. Acknowledgements
This project would not be possible without the hard work, dedication and contributions the following people have made:

Rednex Gameboy Development System - https://rednex.github.io/rgbds/gbz80.7.html
pastraiser - http://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html
Imran Nazar - http://imrannazar.com/Gameboy-Z80-Opcode-Map (https://github.com/Two9A/jsGB)
serginho89 - https://realboyemulator.wordpress.com/2013/01/03/a-look-at-the-game-boy-bootstrap-let-the-fun-begin/
Gameboy Development Wiki - http://gbdev.gg8.se/wiki/articles/Main_Page
Official Gameboy Programming Manual - https://www.romhacking.net/documents/544/

# State of Development
The first version of an instruction set for the emulated Z80/8080 hybrid processor (DMG/GBC custom) has been completed. A virtual processor holds registers that are manipulated by the instructions. Instructions map to specific functions that emulate the processor's manipulation of the register or data. I need a way to stop execution. I'm considering adding to the processor object something to say, "if this is set, stop executing", and have the debugger set that. I also need to be able to trim the dumps to the last 100 or so entries into processor._debugTrace. I need to get _debugTrace to dump ONCE.

The main issue now is that the CPU is working, but doesn't stop executing instructions for the CPU when it crashes. This results in the console lagging with 4,000,000+ copies of the _debugTrace before my machine becomes completely unresponsive. Therefore, the current objective is to be able to STOP execution, and manage the size of _debugTrace's dump to the console. When this is managed, we can verify if the bootloader is executed properly. Perhaps a hard-coded breakpoint when the PC register is at the end of the boot sequence? Also, I'm unsure if I even have a way to pass execution from the bootloader to the cartridge. I know I load _cartridge when the gamedata is read. 

Current development objectives are as follows:

1. Achieve a way of stopping execution in the loop. (Timing and interrupts may help with this, at least how to implement it).

2. Further debugging the bootloader. Currently it *correctly* executes and loops through the GPU VRAM to clear it, and continues execution (although once I fixed opcode 0x77, I ran into the problem of it not stopping execution, even after crashing). I want the bootloader to be able to execute fully as far as the CPU is concerned.

3. Learn about timing, interrupts, and how to implement GPU stuff.
