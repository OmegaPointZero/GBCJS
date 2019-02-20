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
            /*
                To do: Implement Flags suppport? How does POP trigger the subtraction or carry flags??
            */
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

        //0x20
        JRNZn: function(){
            processor._reg.pc++;
            // if zero flag is not set
            if(processor._reg.f&(1<<7) != 0x80){
                var byte = MM.read(processor._reg.pc)
                if(byte&(1<<7)==0x80){
                    var o = byte&0x7f;
                    processor._reg.pc = processor._reg.pc + (-128+o);
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                } else if(byte&(1<<7)!=0x80){
                    processor._reg.pc = processor._reg.pc + byte
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                }
            } else {
                processor._reg.m = 2;
                processor._reg.m = 8;
            } 
        },

        //0x30
        JRNCn: function(){
            processor._reg.pc++;
            // if zero flag is not set
            if(processor._reg.f&(1<<4) != 0x10){
                var byte = MM.read(processor._reg.pc)
                if(byte&(1<<7)==0x80){
                    var o = byte&0x7f;
                    processor._reg.pc = processor._reg.pc + (-128+o);
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                } else if(byte&(1<<7)!=0x80){
                    processor._reg.pc = processor._reg.pc + byte
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                }
            } else {
                processor._reg.m = 2;
                processor._reg.m = 8;
            } 
        },

        //0x18
        JRn: function(){
            processor._reg.pc++;
            var byte = MM.read(processor._reg.pc)
            if(byte&(1<<7)==0x80){
                var o = byte&0x7f;
                processor._reg.pc = processor._reg.pc + (-128+o);
                processor._reg.m = 3;
                processor._reg.t = 12;
            } else if(byte&(1<<7)!=0x80){
                processor._reg.pc = processor._reg.pc + byte
                processor._reg.m = 3;
                processor._reg.t = 12;
            }
        },

        //0x28
        JRZn: function(){
            processor._reg.pc++;
            // if zero flag is not set
            if(processor._reg.f&(1<<7) == 0x80){
                var byte = MM.read(processor._reg.pc)
                if(byte&(1<<7)==0x80){
                    var o = byte&0x7f;
                    processor._reg.pc = processor._reg.pc + (-128+o);
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                } else if(byte&(1<<7)!=0x80){
                    processor._reg.pc = processor._reg.pc + byte
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                }
            } else {
                processor._reg.m = 2;
                processor._reg.m = 8;
            } 
        },

        //0x38
        JRCn: function(){
            processor._reg.pc++;
            // if zero flag is not set
            if(processor._reg.f&(1<<4) == 0x10){
                var byte = MM.read(processor._reg.pc)
                if(byte&(1<<7)==0x80){
                    var o = byte&0x7f;
                    processor._reg.pc = processor._reg.pc + (-128+o);
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                } else if(byte&(1<<7)!=0x80){
                    processor._reg.pc = processor._reg.pc + byte
                    processor._reg.m = 3;
                    processor._reg.t = 12;
                }
            } else {
                processor._reg.m = 2;
                processor._reg.m = 8;
            } 
        },

        /* 
            8-bit arithmetic sequences
        */

        //0x04
        INC_B: function(){
            processor._reg.f = 0; /* reset the flags*/
            processor._reg.b++;
            /*set half carry, not carry! */
            if((processor._reg.b&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            /*Register can only be 8 bits*/
            processor._reg.b&=255;
            /* if operation resulted in 0, set 0 flag */
            if(processor._reg.b==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x05
        DEC_B: function(){
            processor._reg.f = (1<<6); /* N-flag set */
            processor._reg.b--;
            processor._reg.b&=255;
            /* Set half carry if lower 4 bits went from 0000>1111
            Can be hardcoded because only decrementing by one
            */
            if((processor._reg.b&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.b==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x14
        INC_D: function(){
            processor._reg.f = 0;
            processor._reg.d++;
            if((processor._reg.d&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.d&=255;
            if(processor._reg.d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x15
        DEC_D: function(){
            processor._reg.d--;
            processor._reg.f = (1<<6)
            processor._reg.d&=255;
            if((processor._reg.d&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x24
        INC_H: function(){
            processor._reg.f = 0; 
            processor._reg.h++;
            if((processor._reg.h&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.h&=255;
            if(processor._reg.h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x25
        DEC_H: function(){
            processor._reg.h--;
            processor._reg.f = (1<<6)
            processor._reg.h&=255;
            if((processor._reg.h&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x34
        INC_aHL: function(){
            processor._reg.f = 0; 
            var hl = processor._reg.h<<8;
            hl += processor._reg.l;
            var h = MM.read(hl);
            h++;
            MM.write(hl,h);
            if((h&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            h &= 0xffff;
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x35
        DEC_aHL: function(){
            processor._reg.f = (1<<6); 
            var h = processor._reg.h<<8;
            h += processor._reg.l; 
            h--;
            if((h&0xf)==0xf){
                flag += (1<<5)
            }
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },


        //0x0C
        INC_C: function(){
            processor._reg.f = 0; 
            processor._reg.c++;
            if((processor._reg.c&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.c&=255;
            if(processor._reg.c==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x0D
        DEC_C: function(){
            processor._reg.c--;
            processor._reg.f = (1<<6);
            processor._reg.c&=255;
            if((processor._reg.c&0xf)==0xf){
                processor._reg.f += (1<<5);
            }
            if(processor._reg.c==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x1C
        INC_E: function(){
            processor._reg.f = 0; 
            processor._reg.e++;
            if((processor._reg.e&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.e&=255;
            if(processor._reg.e==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x1D
        DEC_E: function(){
            processor._reg.e--;
            processor._reg.f += (1<<6)
            processor._reg.e&=255;
            if((processor._reg.e&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.e==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },
        //0x2C
        INC_L: function(){
            processor._reg.f = 0; 
            processor._reg.l++;
            if((processor._reg.l&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.l&=255;
            if(processor._reg.l==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x2D
        DEC_L: function(){
            processor._reg.l--;
            processor._reg.f += (1<<6)
            processor._reg.l&=255;
            if((processor._reg.l&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.l==0){
                /* if operation resulted in 0, set 0 flag */
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x3C
        INC_A: function(){
            processor._reg.f = 0; 
            processor._reg.a++;
            if((processor._reg.a&0x10)==0x10){
                processor._reg.f+=(1<<5)
            }
            processor._reg.a&=255;
            if(processor._reg.a==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },

        //0x3D
        DEC_A: function(){
            processor._reg.a--;
            processor._reg.f = (1<<6);
            processor._reg.a&=255;
            if((processor._reg.a&0xf)==0xf){
                processor._reg.f += (1<<5)
            }
            if(processor._reg.a==0){
                /* if operation resulted in 0, set 0 flag */
                processor._reg.f += (1<<7);
            }
            processor._reg.m = 1;
        },


        /* 
            16-bit arithmetic instructions

        */

        //0x03
        INC_BC: function(){
            processor._reg.f = 0; 
            var b = processor._reg.b<<8;
            b += processor._reg.c;
            b++;
            if((b&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            b &= 0xffff;
            if(b==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.b = b>>8;
            processor._reg.c = b&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x0B
        DEC_BC: function(){
            processor._reg.f = (1<<6); 
            var d = processor._reg.d<<8;
            d += processor._reg.e; 
            h--;
            if((d&0xf)==0xf){
                flag += (1<<5)
            }
            if(d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.d = d>>8;
            processor._reg.e = d&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },


        //0x13
        INC_DE: function(){
            processor._reg.f = 0; 
            var d = processor._reg.d<<8;
            d += processor._reg.e;
            d++;
            if((d&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            d &= 0xffff;
            if(d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.d = d>>8;
            processor._reg.e = d&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x1B
        DEC_DE: function(){
            processor._reg.f = (1<<6); 
            var d = processor._reg.d<<8;
            d += processor._reg.e; 
            d--;
            if((d&0xf)==0xf){
                flag += (1<<5)
            }
            if(d==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.d = d>>8;
            processor._reg.e = d&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x23
        INC_HL: function(){
            processor._reg.f = 0; 
            var h = processor._reg.h<<8;
            h += processor._reg.l;
            h++;
            if((h&0x10)==0x10){
                processor._reg.f += (1<<5);
            }
            h &= 0xffff;
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.h = h>>8;
            processor._reg.l = h&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x2B
        DEC_HL: function(){
            processor._reg.f = (1<<6); 
            var h = processor._reg.h<<8;
            h += processor._reg.l; 
            h--;
            if((h&0xf)==0xf){
                flag += (1<<5)
            }
            if(h==0){
                processor._reg.f += (1<<7);
            }
            processor._reg.h = h>>8;
            processor._reg.l = h&0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },
        /* 
            algo to check for half-carry:
            var ob = processor._reg.b;
            var sum = (ob&0xf) + 1;
            if(sum&0x10==0x10){
                processor._reg.f += (1<<5);
            }
        */
        //0x09
        ADD_HLBC: function(){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            var bc = processor._reg.b<<8;
            bc+= processor._reg.c;
            /* check for half-carry */
            if(((processor._reg.c&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            /* Check for carry */
if((hl+bc)&0xff!=(hl+bc)){
                processor._reg.f += (1<<4)
            }
            hl+=bc;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
        },

        //0x19
        ADD_HLDE: function(){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            var de = processor._reg.d<<8;
            de+= processor._reg.e;
            if(((processor._reg.e&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            if((hl+de)&0xff!=(hl+de)){
                processor._reg.f += (1<<4)
            }
            hl+=de;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
        },

        //0x29
        ADD_HLHL: function(){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            if(((processor._reg.l&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            if((hl+hl)&0xff!=(hl+hl)){
                processor._reg.f += (1<<4)
            }
            hl+=hl;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
        },

        //0x39
        ADD_HLSP: function(){
            processor._reg.f = 0;
            var hl = processor._reg.h<<8;
            hl+= processor._reg.l;
            var sp=process._reg.sp;
            if(((sp&0xf)+(processor._reg.l&0xf))&0x10==0x10){
                processor._reg.f += (1<<5)
            }
            if((hl+sp)&0xff!=(hl+sp)){
                processor._reg.f += (1<<4)
            }
            hl+=sp;
            processor._reg.h = hl >> 8;
            processor._reg.l = hl & 0xff;
            processor._reg.m = 2;
            processor._reg.t = 8;
        },        

        //0xE8
        ADD_SPn: function(){
            processor._reg.f = 0;
            /* Zero and sub flags set to 0, H and C get set*/
            processor._reg.pc++;
            var n = MM.read(processor._reg.pc);
            var sp = processor._reg.sp;
            var p = sp & 0xff;
            if((n&0xf+p&0xf)&0x10==0x10){
                processor._reg.f += (1<<5);
            }
            if((n+p)&0xff!=(n+p)){
                processor._reg.f += (1<<4);   
            }
            sp+=n;
            processor._reg.sp = sp&0xffff;
            processor._reg.m = 4;
            processor._reg.t = 16;
        },

        //0x27
        DAA: function(){
            /* 
                Weird instruction, not very well documented. Corrects/prepares the A register for BCD instructions. 

                Exact process is apparently the following: take the least significant 4 bits of A. If the H flag is set or if the number is over 9, 0x6 is added to the register. The A register's 4 most significant bits get checked, If THIS digit is over 9 or the C flag is set, then 0x60 is added to the register. 

            */

            var h = (processor._reg.a>>4)&0xf;
            var l = processor._reg.a&0xf;
            var hf = processor._reg.f&(1<<5);
            var cf = processor._reg.f&(1<<4);
            if((l>9)||(hf==32){
                processor._reg.a+=0x6;
            }  
            if((h>0)||(cf==16){
                processor._reg.a+=0x60;
            }

            processor._reg.f=0;
            if(processor._reg.a==0){
                processor._reg.f+=(1<<7)
            }
            if((processor._reg.a&0xff) != processor._reg.a){
                processor._reg.f+=(1<<4)
            }
            processor.register.a &= 0xff;
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x37
        SCF: function() {
            /* Literally just sets the carry flag */ 
            processor._reg.f &= (1<<7);
            processor._reg.f += (1<<4);
            processor._reg.m = 1;
            processor._reg.t = 4;
        },

        //0x1F
        CPL: function(){
            processor._reg.f &= 144;
            processor._reg.f += 1<<6;
            processor._reg.f += 1<<5;
            processor._reg.m = 1;
            processor._reg.t = 4;        
        },

        //0x3F
        CCF: function(){
            processor._reg.f &= (1<<7);
            processor._reg.f += (1<<4);
            processor._reg.m = 1;
            processor._reg.t = 4;
        }
        
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

