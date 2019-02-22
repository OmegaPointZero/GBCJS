# GBCJS
GameBoy Color JS, my first attempt at emulating a GBC, built on Javascript with JQuery for the UI. 

1. UI: Gameboy basic structure drawn

2. CPU Virtualization: CPU running, begins executing the first instruction (LD SP, 0xfffe) to initialize the stack. The first 0x80 instructions have been written. Instruction number 2 to be executed is not yet written. CPU execution can be tracked in the browser console!

3. Memory Mapping improved a bit, appears to work but as the CPU currently crashes running the first instruction (but at least has loaded the ROM and read the instruction, as well as the function that instruction represents!), it's hard to tell!

4. GPU
-Not yet implemented, interrupts need to be further studied and timing needs to be implemented for the GPU.
-GPU does have a target to draw on (<canvas>)

5. Memory Bank Management
-Not implemented, beginning with 32k games, will deal with this later but hopefully a properly programmed processor I don't need to do much.

6. Sound
-No work yet done.

7. Input/Output
-Nothing done yet.
