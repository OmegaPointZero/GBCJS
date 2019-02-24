# GBCJS
GameBoy Color JS, my first attempt at emulating a GBC, built on Javascript with JQuery for the UI. 

1. UI: Gameboy basic structure drawn

2. CPU Virtualization: Implemented callbacks with CPU instructions to make them synchronize and execute instructions in the proper order (ie, instructions that read sequential bytes and manipulate them would begin, and due to the asynchronous nature of javascript it would get to the callback and loop over the exec() function before the called instruction is able to read bytes from the pc and increment it properly, resulting in the CPU attempting to execute data instead of instructions). Existing CPU architecture needs to be examined and audited to be sure that 8-bit values are being parsed properly as either signed or unsigned. I also located a better guide to how/when to set flags in the opcode descriptions at https://rednex.github.io/rgbds/gbz80.7.html. Also to-do, in addition to finishing the instruction set, make sure all instances where we write a value to the PC register are written as (value-1) because of check() incrementing the PC.

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
