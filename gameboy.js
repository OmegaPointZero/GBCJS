/* 
    Virtual CPU - Modified Z80 chipset

    Opcodes and instruction sets are documented at 
        >http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf
        >http://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html
        >http://imrannazar.com/Gameboy-Z80-Opcode-Map

    Processor object has registers, a clock, a series of functions that 
    modify the registers according to the operations described by the 
    resources above, an "exec" function that receives an instruction, looks
    it up and calls the function to emulate that register change.

    Opcodes functions are not written in order, I wrote them based off of
    the color coding @http://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html
    

*/

processor = {
    

    //  Single byte registers are a, b, c, d, e, h, l    
    //  Registers may also be used as 16-bit registers:
    //  AF, BC, DE, HL
    //  sp: stack pointer, pc: program counter
    //  t: time, m: machine time, f: flags
    //  i: interrupts flag, ime: interrupt master enable
    //  Flags:   Zero (Z), Subtract (N), Half-Carry(H),
    //           Carry (C)
    //           7 6 5 4 3 2 1 0
    //           Z N H C 0 0 0 0

    _reg: { a:0, f:0, b:0, c:0, d:0, e:0, h:0, l:0,
        sp:0, pc:0, t:0, m:0, f:0, i:0, ime:0},

    _halt: 0,
    _stop: 0,
    _clock: {m:0, t:0},

    exec: function(){
        //read the instruction in program counter
        ins = MM.read(processor._reg.pc);
        /*
            Here shall be a function to lookup the function
            by the OPCODe read and call it
        */
        processor._reg.pc++;
        processor._clock.m+=processor._reg.m;
        processor._clock.t+=processor._reg.t;
        /*
            Check for interrupts, do GPU stuff?
            Still need to work out how timing works
        */
    }

    _instr: {

        // SPECIAL INSTRUCTIONS
        
        // 0x00
        NOP: function(){
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x10
        STOP: function(){
            processor._reg.stop = 1;
            processor._reg.m = 2;
            processor._reg.t = 4
        },
        //0x76
        HALT: function(){
            processor._halt = 1;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0xF3 
        DI: function() { /* disable interrupts */
            processor._reg.i = 0;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0xFB 
        EI: function() { /* enable interrupts */
            processor._reg.i = 1;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        CB: function() {
        /* 
            here shall go a function to find 
            the CB-prefixed instructions
        */
        },

        // 8-bit Load/Move/Store instructions

        //0x7F
        LD_aa: function(){
            processor._reg.a = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x78 
        LD_ab: function() {
            processor._reg.a = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x79
        LD_ac: function() {
            processor._reg.a = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x7A
        LD_ad: function() {
            processor._reg.a = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x7B
        LD_ae: function() {
            processor._reg.a = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x7C
        LD_ah: function() {
            processor._reg.a = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x7D
        LD_al: function() {
            processor._reg.a = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        
        //0x47
        LD_ba: function(){
            processor._reg.b = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x40 
        LD_bb: function() {
            processor._reg.b = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x41
        LD_bc: function() {
            processor._reg.b = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x42
        LD_bd: function() {
            processor._reg.b = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x43
        LD_be: function() {
            processor._reg.b = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x44
        LD_bh: function() {
            processor._reg.b = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x45
        LD_bl: function() {
            processor._reg.b = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x4F
        LD_ca: function(){
            processor._reg.c = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x48
        LD_cb: function() {
            processor._reg.c = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x49
        LD_cc: function() {
            processor._reg.c = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x4A
        LD_cd: function() {
            processor._reg.c = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x4B
        LD_ce: function() {
            processor._reg.c = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x4C
        LD_ch: function() {
            processor._reg.c = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x4D
        LD_cl: function() {
            processor._reg.c = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x57
        LD_da: function(){
            processor._reg.d = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x50 
        LD_db: function() {
            processor._reg.d = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x51
        LD_dc: function() {
            processor._reg.d = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x52
        LD_dd: function() {
            processor._reg.d = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x53
        LD_de: function() {
            processor._reg.d = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x54
        LD_dh: function() {
            processor._reg.d = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x55
        LD_dl: function() {
            processor._reg.d = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x5F
        LD_ea: function(){
            processor._reg.e = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x58
        LD_eb: function() {
            processor._reg.e = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x59
        LD_ec: function() {
            processor._reg.e = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x5A
        LD_ed: function() {
            processor._reg.e = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x5B
        LD_ee: function() {
            processor._reg.e = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x5C
        LD_eh: function() {
            processor._reg.e = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x5D
        LD_el: function() {
            processor._reg.e = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x67
        LD_ha: function(){
            processor._reg.h = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x60 
        LD_hb: function() {
            processor._reg.h = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x61
        LD_hc: function() {
            processor._reg.h = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x62
        LD_hd: function() {
            processor._reg.h = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x63
        LD_he: function() {
            processor._reg.h = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x64
        LD_hh: function() {
            processor._reg.h = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x65
        LD_hl: function() {
            processor._reg.h = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x6F
        LD_la: function(){
            processor._reg.l = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x68
        LD_lb: function() {
            processor._reg.l = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x69
        LD_lc: function() {
            processor._reg.l = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x6A
        LD_ld: function() {
            processor._reg.l = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x6B
        LD_le: function() {
            processor._reg.l = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x6C
        LD_lh: function() {
            processor._reg.l = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        //0x6D
        LD_ll: function() {
            processor._reg.l = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //   Other 8-bit load/move/store instructions
        
        //0x02
        LD_aBC_a: function(){
            MM.write(l_addr(processor._reg.b,processor._reg.c),processor._reg.a);
            processor._reg.m=2;
            processor._reg.t=8;
        },
        
        //0x12
        LD_aDE_a: function(){
            MM.write(l_addr(processor._reg.d,processor._reg.e),processor._reg.a);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x22
        LD_aHLi_a: function(){
            var hl = l_addr(processor._reg.h,processor._reg.l);
            MM.write(hl,processor._reg.a);
            hl += 1;
            processor._reg.h=(hl&0xff00)>>8;
            processor._reg.l=(hl&0xff);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x32
        LD_aHLd_a: function(){
            var hl = l_addr(processor._reg.h,processor._reg.l);
            MM.write(hl,processor._reg.a);
            hl -= 1;
            processor._reg.h=(hl&0xff00)>>8;
            processor._reg.l=(hl&0xff);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x06
        LD_Bd8: function(){
            processor._reg.pc++
            processor._reg.b=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x16
        LD_Dd8: function(){
            processor._reg.pc++
            processor._reg.d=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x26
        LD_Hd8: function(){
            processor._reg.pc++
            processor._reg.b=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x36
        LD_aHLd8: function(){
            processor._reg.pc++
            var hl = l_addr(processor._reg.h,processor._reg.l);
            MM.write(hl, MM.read(processor._reg.pc));
            processor._reg.m=3;
            processor._reg.t=12;
        },

        //0x0a
        LD_AaBC: function(){
            processor._reg.a=MM.read(l_addr(processor._reg.b,processor._reg.c));
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x1a
        LD_AaDE: function(){
            processor._reg.a=MM.read(l_addr(processor._reg.d,processor._reg.e));
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x2a
        LD_AaHLi: function(){
            var hl = l_addr(processor._reg.h,processor._reg.l);
            processor._reg.a=MM.read(hl);
            hl += 1;
            processor._reg.h=hl&0xff00>>8;
            processor._reg.l=hl&0xff;
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x3a
        LD_AaHLd: function(){
            var hl = l_addr(processor._reg.h,processor._reg.l);
            processor._reg.a=MM.read(hl);
            hl += 1;
            processor._reg.h=hl&0xff00>>8;
            processor._reg.l=hl&0xff;            
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x0e
        LD_Cd8: function(){
            processor._reg.pc++;
            processor._reg.c=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x1e
        LD_Ed8: function(){
            processor._reg.pc++;
            processor._reg.e=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x2e
        LD_Ld8: function(){
            processor._reg.pc++;
            processor._reg.l=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0x3e
        LD_Ad8: function(){
            processor._reg.pc++;
            processor._reg.a=MM.read(processor._reg.pc);
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0xe0
        LD_ff00nA: function(){
            var ad = 0xff00;
            processor._reg.pc++;
            ad += read(processor._reg.pc);
            write(ad,processor._reg.a);
            processor._reg.m=3;
            processor._reg.t=12;
        },
           
        //0xf0
        LD_Aff00n: function(){
            var ad = 0xff00;
            processor._reg.pc++;
            ad += read(processor._reg.pc);
            write(processor._reg.a,MM.read(ad));
            processor._reg.m=3;
            processor._reg.t=12;
        },
    
        //0xe2
        LD_ff00cA: function(){
            var ac = 0xff00;
            processor._reg.pc++;
            ac += read(processor._reg.pc);
            write(ac,processor._reg.a);
            processor._reg.m=2;
            processor._reg.t=8;
        },
           
        //0xf2
        LD_Aff00c: function(){
            var ac = 0xff00;
            processor._reg.pc++;
            ac += read(processor._reg.pc);
            write(processor._reg.a,MM.read(ac));
            processor._reg.m=2;
            processor._reg.t=8;
        },

        //0xea
        LD_nnA: function(){
            processor._reg.pc++;
            adr = processor._reg.pc;
            adr = adr<<8;
            processor._reg.pc++;
            adr == processor._reg.pc;
            write(adr,processor._reg.a);
            processor._reg.m=4;
            processor._reg.t=16;
        },
           
        //0xfa
        LD_Ann: function(){
            processor._reg.pc++;
            adr = processor._reg.pc;
            adr = adr<<8;
            processor._reg.pc++;
            adr == processor._reg.pc;
            write(adr,processor._reg.a);
            processor._reg.m=4;
            processor._reg.t=16;
        },

        //  !!! END OF 8-BIT MOVE/LOAD/STORE INSTRUCTIONS !!!

        /*
            16-BIT MOVE/LOAD/STORE INSTRUCTIONS
        */

        //0x01
        LD_BCnn: function(){
            processor._reg.pc++;
            MM.write(processor._reg.c,MM.read(processor._reg.pc));
            processor._reg.pc++;
            MM.write(processor._reg.b,MM.read(processor._reg.pc));
            processor._reg.m=3;
            processor._reg.t=12;
        },
           
        //0x11
        LD_DEnn: function(){
            processor._reg.pc++;
            MM.write(processor._reg.e,MM.read(processor._reg.pc));
            processor._reg.pc++;
            MM.write(processor._reg.d,MM.read(processor._reg.pc));
            processor._reg.m=3;
            processor._reg.t=12;
        },

        //0x21
        LD_HLnn: function(){
            processor._reg.pc++;
            MM.write(processor._reg.h,MM.read(processor._reg.pc));
            processor._reg.pc++;
            MM.write(processor._reg.l,MM.read(processor._reg.pc));
            processor._reg.m=3;
            processor._reg.t=12;
        },
           
        //0x31
        LD_SPnn: function(){
            processor._reg.pc++;
            MM.write(processor._reg.c,MM.read(processor._reg.pc));
            processor._reg.pc++;
            MM.write(processor._reg.b,MM.read(processor._reg.pc));
            processor._reg.m=3;
            processor._reg.t=12;
        },

        //0xC1
        POP_BC: function(){
            processor._reg.c = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.b = M.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
        },

        //0xD1
        POP_DE: function(){
            processor._reg.e = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.d = M.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
        },

        //0xE1
        POP_HL: function(){
            processor._reg.l = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.h = M.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
        },

        //0xF1
        POP_AF: function(){
            processor._reg.f = MM.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.a = M.read(processor._reg.sp);
            processor._reg.sp++;
            processor._reg.m=3;
            processor._reg.t=12;            
        },

        //0xC5
        PUSH_BC: function(){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.b);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.c);
            processor._reg.m=4;
            processor._reg.t=16;            
        },

        //0xD5
        PUSH_DE: function(){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.d);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.e);
            processor._reg.m=4;
            processor._reg.t=16;            
        },

        //0xE5
        PUSH_HL: function(){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.h);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.l);
            processor._reg.m=4;
            processor._reg.t=16;            
        },

        //0xF5
        PUSH_AF: function(){
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.a);
            processor._reg.sp--;
            MM.write(processor._reg.sp,processor._reg.f);
            processor._reg.m=4;
            processor._reg.t=16;            
        },

        //0x08
        LD_nnSP: function(){
            processor._reg.pc++;
            var a = MM.read(processor._reg.pc);
            processor._reg.pc++;
            var b = MM.read(processor._reg.pc);
            var ba = b+a;                    
            MM.write(ba,processor._reg.sp);
            processor._reg.m=5;
            processor._reg.t=20;            
        },

        //0xF8
        LDHL_SPd8: function(){
            var s = processor._reg.sp  
            processor._reg.pc++;
            s += MM.read(processor._reg.pc++);
            s.write(
            processor._reg.m=3;
            processor._reg.t=12;            
        },

        //0xF9
        LD_SPHL: function(){


            processor._reg.m=2;
            processor._reg.t=8;            
        },


        /* 
            Reset and jump routines-- jump to address in memory and execute
        */

        //0xC7
        R_0: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x00;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },

        //0xD7
        R_10: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x10;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },

        //0xE7
        R_20: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x20;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },
        
        //0xF7
        R_30: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x30;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },

        //0xCF
        R_8: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x8;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },

        //0xDF
        R_18: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x18;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },

        //0xEF
        R_28: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x28;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },

        //0xFF
        R_38: function(){
            processor._reg.sp-=2;
            MM.write(processor._reg.sp,processor._reg.pc);
            processor._reg.pc=0x38;
            processor._reg.m=4;
            processor._reg.t=16;
            MM.reset();
        },

    },

    _instMap: [],
    _cbInstMap: [],

    _instMap = [
        // 0x00
        processor._instr.NOP,
        processor._instr.,
processor._instr.,
processor._instr.,
processor._instr.NOP,
processor._instr.NOP,
processor._instr.NOP,
processor._instr.NOP,
processor._instr.NOP,
processor._instr.NOP, 

        //0x0A
    ]
    
}


// Memory Mapper

MM = {
    /*
    _memory map:

    [0000-3FFF] Cartridge ROM, bank 0
        [0000-00FF] BIOS
        [0100-014F] Cartridge Header
    [4000-7FFF] Cartridge Rom, other banks
    [8000-9FFF] GPU RAM
        [8000-97FF] Tile RAM
        [9800-9BFF] BG Map Data 1
        [9C00-9FFF] BG Map Data 2
    [A000-BFFF] External RAM !!RAM MOUNTED HERE IS NON-VOLATILE, KEEPS GAME DATA, ETC
    [C000-DFFF] RAM
    [E000-FDFF] RAM shadow
    [FE00-FE9F] Sprite Information (OAM)
    [FF00-FF7F] MemMapped IO
    [FF80-FFFF] Zero-Page RAM
    */
    
    _booting: 1,
    _bootSeq: [],
    _cartridge: [],
    _memory: [],

    init: function(){
        for(i=0;i<0xffff;i++){
            MM._memory[i]=0
        }
    }

    reset: function(){
        MM.init();
        MM._booting = 1;
    }

    //long_addr: return value of 2 registers
    l_addr: function(first, second){
        var f = first & 0xff
        var s = second & 0xff
        return f<<8+s;
    },

    //read one byte at address
    read: function(addr){
        if(MM._booting != 1){
            return MM._memory[addr]
        } 

        else if(MM._booting==1){
            if(addr<0x100){
                return MM._bootSeq[addr]
            }
        }
    },

//    write value to address
    write: function(addr,value){
        var v = value.split('');
        for(var k=0;k<v.length;k++){
            MM._memory[addr+k]=v[k]
        }
    }
}





