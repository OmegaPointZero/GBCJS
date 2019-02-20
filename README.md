# GBCJS
GameBoy Color JS, my first attempt at emulating a GBC, built on Javascript with JQuery for the UI. 

1. UI
No real work done, but at least a <canvas> has been drawn to give the future GPU something to interact with. I supposed I should actually draw the gameboy soon, as UI stuff is simple.

2. CPU Virtualization
-Special Instructions (like NOP,HALT, etc) implemented
-CB mapping NOT implemeneted yet (fns not written)
-8bit move/load/store implemented
-16bit move/load/store implemented
-MM: may need to re-handle writing multiple bytes (ie, to hl)
-8 and 16 bit arithmetic
-Flags support has been implemented; however, default is to overwrite flags register to 0x00 and then write; NEED TO PRESERVE REGISTER
-For conditional jumps, need to figure out how to run exec() without incrementing pc unnecessarily (jump to pc-1, so exec() runs pc++ to correct instruction?)

3. Memory Mapping minimal but working for first draft. Reading and Writing may need to be refactored to correctly handle multiple bytes properly.

4. GPU
-Not yet implemented, interrupts need to be further studied and timing needs to be implemented for the GPU.
-GPU does have a target to draw on (<canvas>)

5. Memory Bank Management
-Not implemented, beginning with 32k games, will deal with this later but hopefully a properly programmed processor I don't need to do much.

6. Sound
-No work yet done.

7. Input/Output
-Nothing done yet.
