$('document').ready(function(){

   const take_byte = (function(byte){
        b = ("0" + byte.toString(16))
        return b.slice(-2)
    })
  
    const readFile = (function(file){
        var myFiles = $('#ROMUpload').prop('files');
        var myFile = myFiles[0]
        console.log(myFile)
        const fr = new FileReader();
        fr.onload = function(){
            var fi = new Uint8Array(fr.result)
            var f = []
            for(var i=0;i<fi.length;i++){
                f.push(take_byte(fi[i]))
                if(i==fi.length-1){
                    initializeGB(f)
                }
            }
        }
        fr.readAsArrayBuffer(myFile)
        var infoStr = "<p>"
        infoStr += "Game Loaded: " + myFile.name
        infoStr += "</p><p>File Size: " + myFile.size +" bytes</p>"
        $('.debuggingInfo').html(infoStr)
        
      })  

      document.getElementById('ROMUpload').addEventListener('change', readFile, false);
    });
