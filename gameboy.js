/* Virtual CPU */
processor = {
    
    // Registers
    _reg: { a:0, f:0, b:0, c:0, d:0, e:0, h:0, l:0,
        sp:0, pc:0, t:0, m:0, f:0, i:0},

    _halt: 0,
    _stop: 0,
    _clock: {m:0, t:0},
    
    // Registers may also be used as 16-bit registers:
    // AF, BC, DE, HL
    // sp: stack pointer, pc: program counter
    // t: time, m: machine time, f: flags
    // i: interrupts
    // Flags:   Zero (Z), Subtract (N), Half-Carry(H),
    //          Carry (C)
    //          7 6 5 4 3 2 1 0
    //          Z N H C 0 0 0 0

    //  Instructions set
    /*  GB CPU LR35902 Instruction Set can be found at
        http://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html
    */
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
        }

        // 8-bit Load/Move/Store instructions

        //0x7F
        LD_aa: function(){
            processor._reg.a = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x78 
        LD_ab: function() {
            processor._reg.a = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x79
        LD_ac: function() {
            processor._reg.a = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x7A
        LD_ad: function() {
            processor._reg.a = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x7B
        LD_ae: function() {
            processor._reg.a = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x7C
        LD_ah: function() {
            processor._reg.a = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x7D
        LD_al: function() {
            processor._reg.a = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        
        //0x47
        LD_ba: function(){
            processor._reg.b = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x40 
        LD_bb: function() {
            processor._reg.b = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x41
        LD_bc: function() {
            processor._reg.b = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x42
        LD_bd: function() {
            processor._reg.b = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x43
        LD_be: function() {
            processor._reg.b = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
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
        }

        //0x4F
        LD_ca: function(){
            processor._reg.c = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x48
        LD_cb: function() {
            processor._reg.c = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x49
        LD_cc: function() {
            processor._reg.c = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x4A
        LD_cd: function() {
            processor._reg.c = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
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
        }
        //0x4D
        LD_cl: function() {
            processor._reg.c = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }

        //0x57
        LD_da: function(){
            processor._reg.d = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x50 
        LD_db: function() {
            processor._reg.d = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x51
        LD_dc: function() {
            processor._reg.d = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x52
        LD_dd: function() {
            processor._reg.d = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x53
        LD_de: function() {
            processor._reg.d = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x54
        LD_dh: function() {
            processor._reg.d = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x55
        LD_dl: function() {
            processor._reg.d = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }

        //0x5F
        LD_ea: function(){
            processor._reg.e = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x58
        LD_eb: function() {
            processor._reg.e = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x59
        LD_ec: function() {
            processor._reg.e = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x5A
        LD_ed: function() {
            processor._reg.e = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x5B
        LD_ee: function() {
            processor._reg.e = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x5C
        LD_eh: function() {
            processor._reg.e = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x5D
        LD_el: function() {
            processor._reg.e = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }

        //0x67
        LD_ha: function(){
            processor._reg.h = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x60 
        LD_hb: function() {
            processor._reg.h = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x61
        LD_hc: function() {
            processor._reg.h = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x62
        LD_hd: function() {
            processor._reg.h = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x63
        LD_he: function() {
            processor._reg.h = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x64
        LD_hh: function() {
            processor._reg.h = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x65
        LD_hl: function() {
            processor._reg.h = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }

        //0x6F
        LD_la: function(){
            processor._reg.l = processor._reg.a;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x68
        LD_lb: function() {
            processor._reg.l = processor._reg.b;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x69
        LD_lc: function() {
            processor._reg.l = processor._reg.c;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x6A
        LD_ld: function() {
            processor._reg.l = processor._reg.d;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x6B
        LD_le: function() {
            processor._reg.l = processor._reg.e;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x6C
        LD_lh: function() {
            processor._reg.l = processor._reg.h;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        //0x6D
        LD_ll: function() {
            processor._reg.l = processor._reg.l;
            processor._reg.m = 1;
            processor._reg.t = 4;
        }



        
    }
    
}


// Memory Map

MM = {
    /*
    [0000-3FFF] Cartridge ROM, bank 0
        [0000-00FF] BIOS
        [0100-014F] Cartridge Header
    [4000-7FFF] Cartridge Rom, other banks
    [8000-9FFF] GPU RAM
        [8000-97FF] Tile RAM
        [9800-9BFF] BG Map Data 1
        [9C00-9FFF] BG Map Data 2
    [A000-BFFF] External RAM
    [C000-DFFF] RAM
    [E000-FDFF] RAM shadow
    [FE00-FE9F] Sprite Information (OAM)
    [FF00-FF7F] MemMapped IO
    [FF80-FFFF] Zero-Page RAM
    */
    
    _running_bios: 1,
    
    _bios: [],
    _rom: [],
    _GRAM: [],
    _RAM: [],
    _eRAM: [],
    _zRAM: [],

    _intF: 0, //interrupt flags

    read_b: function(addy){
        
    }
}





