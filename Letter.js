var letter = function (l){
    this.lettr = l;
    this.guessed = false;    
    this.reslt = function () {
        if (this.guessed) {
            var retl = this.lettr;
        } else {
            var retl = " _ ";
        }
        return retl
    };
    this.chck = function (gl) {
        if (!this.guessed && gl === this.lettr) {
            this.guessed = true;            
        } 
        return this.reslt()
    }
}

module.exports = letter;