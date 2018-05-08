var letter = require("./Letter");

var word = function (w) {
    this.wrd = [];
    this.addSet = function () {
        w.split("").forEach(e => {
            if (e !== " ") {
                this.wrd.push(new letter(e));
            } else {
                this.wrd.push(" ");
            }
        })
    };
    this.guess = function (l) {
        var str = [];
        this.wrd.forEach(e => {
            if (e !== " "){ 
                str.push(e.chck(l));
            } else {
                str.push("   ");
            }
        })
        return str.join("");
    }
}

module.exports = word;